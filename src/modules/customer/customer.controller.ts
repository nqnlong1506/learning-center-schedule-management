import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Request, Response } from 'express';
import { APIResponse } from 'src/config/api';
import { CustomerEntity } from './entities/customer.entity';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('view/:no')
  async view(@Req() req: Request, @Res() res: Response) {
    const { no } = req.params;
    if (!no || !Number(no)) {
      const response: APIResponse = {
        success: false,
        data: undefined,
        message: `[customer-view] invalid no param.`,
      };
      return res.json(response);
    }
    const customer = await this.customerService.viewByNo(Number(no));
    if (customer instanceof Error) {
      const response: APIResponse = {
        success: false,
        data: undefined,
        message: `[customer-view] ${customer.message}.`,
      };
      return res.json(response);
    }
    const reponse: APIResponse = {
      success: true,
      data: customer,
      message: '[customer-view] api.',
    };
    return res.json(reponse);
  }

  @Post()
  async post(@Body() body: CustomerEntity, @Res() res: Response) {
    console.log(body);
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
