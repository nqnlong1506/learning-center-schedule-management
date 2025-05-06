import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { APIResponse } from 'src/config/api';
import { KakaoService } from './kakao.service';

@Controller()
export class KakaoController {
  constructor(private readonly kakaoService: KakaoService) {}

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const { code } = req.body;
    console.log('auth code', code);
    const login = await this.kakaoService.login(code);
    const response: APIResponse = {
      success: true,
      data: login,
      message: '[kakao - login] api.',
    };
    return res.json(response);
  }
}
