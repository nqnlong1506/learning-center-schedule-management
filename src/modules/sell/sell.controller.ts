import { Body, Controller, Post, Res } from '@nestjs/common';
import { SellService } from './sell.service';
import { SellEntity } from './entities/sell.entitiy';
import { Response } from 'express';
import { APIResponse } from 'src/config/api';

@Controller('sell')
export class SellController {
  constructor(private readonly sellService: SellService) {}

  @Post()
  async post(@Body() body: SellEntity, @Res() res: Response) {
    const post = await this.sellService.post(body);
    if (post instanceof Error) {
      const response: APIResponse = {
        success: false,
        data: undefined,
        message: `[sell - post] ${post.message}.`,
      };
      return res.json(response);
    }

    const response: APIResponse = {
      success: true,
      data: body,
      message: '[sell - post] api.',
    };
    return res.json(response);
  }
}
