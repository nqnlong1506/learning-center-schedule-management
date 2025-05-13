import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { APIResponse } from 'src/config/api';
import { JwtService } from '@nestjs/jwt';
import { CustomerEntity } from '../customer/entities/customer.entity';
import { CustomerService } from '../customer/customer.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly customerService: CustomerService,
    private jwtService: JwtService,
  ) {}

  private readonly ACCESS_TIME = 86400000; // 1 day
  private readonly REFRESH_TIME = 518400000; // 6 days

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const { id, password } = req.body;
    if (!id || !password) {
      const response: APIResponse = {
        success: false,
        data: undefined,
        message: '[auth - login] id & password needed.',
      };
      return res.json(response);
    }

    const login = await this.authService.login(
      id.toString(),
      password.toString(),
    );
    if (login instanceof Error) {
      const response: APIResponse = {
        success: false,
        data: undefined,
        message: `[auth - login] ${login.message}.`,
      };
      return res.json(response);
    }

    const now = Date.now();
    const customer = {
      no: login.no,
      id: login.id,
      stage: login.stage,
      name: login.name,
      mobilephone: login.mobilephone,
      isDel: login.isDel,
    };
    const payload = {
      customer,
      expiry: now + this.ACCESS_TIME,
    };
    const token = await this.jwtService.signAsync(payload);

    const refreshPayload = {
      customer,
      expiry: now + this.REFRESH_TIME,
    };
    const refreshToken = await this.jwtService.signAsync(refreshPayload);

    const response: APIResponse = {
      success: true,
      data: {
        customer,
        token,
        refreshToken,
      },
      message: '[auth - login] api.',
    };
    return res.json(response);
  }

  @Post('register')
  async register(@Body() body: CustomerEntity, @Res() res: Response) {
    const create = await this.customerService.post(body);
    if (create instanceof Error) {
      const response: APIResponse = {
        success: false,
        data: undefined,
        message: `[customer-post] ${create.message}.`,
      };
      return res.json(response);
    }
    const reponse: APIResponse = {
      success: true,
      data: undefined,
      message: '[customer-post] api.',
    };
    return res.json(reponse);
  }
}
