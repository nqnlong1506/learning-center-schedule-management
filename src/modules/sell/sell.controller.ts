import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { SellService } from './sell.service';
import { SellEntity } from './entities/sell.entity';
import { Request, Response } from 'express';
import { APIResponse } from 'src/config/api';
import { CurrentCustomer } from 'src/decorators/current-customer.decorator';
import { CreateSellDTO } from './dto/create-sell.dto';
import { UpdateStateSellDTO } from './dto/update-state-sell.dto';

@Controller('sell')
export class SellController {
  constructor(private readonly sellService: SellService) {}

  @Get('list')
  async listGet(
    @Query() query: Record<string, any>,
    @CurrentCustomer() customer: any,
    @Res() res: Response,
  ) {
    try {
      const {
        orderBy = 'id',
        orderDirection = 'DESC',
        page = 1,
        // pageSize = 3,
        ...whereCondition
      } = query;
      const pageSize = 3;
      const buy = await this.sellService.gets({
        whereCondition,
        orderBy,
        orderDirection: orderDirection.toUpperCase(),
        page,
        pageSize,
        customer,
      });
      return res.status(HttpStatus.OK).json({ success: true, ...buy });
    } catch (error) {
      if (!res.headersSent) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: error.message,
          success: false,
        });
      }
    }
  }

  @Get('view/:id')
  async get(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;
    if (!id || !Number(id)) {
      const response: APIResponse = {
        success: false,
        data: undefined,
        message: `[sell-view] invalid id param.`,
      };
      return res.json(response);
    }
    const sell = await this.sellService.getById(Number(id));
    if (sell instanceof Error) {
      const response: APIResponse = {
        success: false,
        data: undefined,
        message: `[sell-view] ${sell.message}.`,
      };
      return res.json(response);
    }
    const reponse: APIResponse = {
      success: true,
      data: sell,
      message: '[sell-view] api.',
    };
    return res.json(reponse);
  }

  @Post('create')
  async post(
    @Body() body: CreateSellDTO,
    @CurrentCustomer() customer: any,
    @Res() res: Response,
  ) {
    console.log('bodysell', body);
    const post = await this.sellService.post(body, customer);
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
      data: post,
      message: '[sell - post] api.',
    };
    return res.json(response);
  }

  @Put('update-status')
  async updateState(@Body() body: UpdateStateSellDTO, @Res() res: Response) {
    try {
      await this.sellService.updateState(body);
      return res.status(HttpStatus.OK).json({ success: true });
    } catch (error) {
      if (!res.headersSent) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: error.message,
          success: false,
        });
      }
    }
  }

  @Post('update/:id')
  async update(
    @Body() body: SellEntity,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { id } = req.params;
    if (!id || !Number(id)) {
      const response: APIResponse = {
        success: false,
        data: undefined,
        message: `[sell - update] invalid id params.`,
      };
      return res.json(response);
    }
    const update = await this.sellService.update(Number(id), body);
    if (update instanceof Error) {
      const response: APIResponse = {
        success: false,
        data: undefined,
        message: `[sell - update] ${update.message}.`,
      };
      return res.json(response);
    }
    const response: APIResponse = {
      success: true,
      data: body,
      message: '[sell - update] api.',
    };
    return res.json(response);
  }
}
