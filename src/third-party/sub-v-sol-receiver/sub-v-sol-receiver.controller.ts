import { Body, Controller, Post, Res } from '@nestjs/common';
import { CustomerDTO } from './dto/customer';
import { Response } from 'express';
import { SubVSolReceiverService } from './sub-v-sol-receiver.service';
import { ThirdAPIResponse } from 'src/config/api';
import { SellDTO } from './dto/sell';
import {
  AuctionContractStatusEnum,
  ContractStatusMapping,
} from 'src/modules/auction-contract/config';

@Controller('sub-v-sol-receiver')
export class SubVSolReceiverController {
  constructor(private readonly rcvService: SubVSolReceiverService) {}

  @Post('hp_cust_001')
  async HP_CUST_001(@Body() body: CustomerDTO, @Res() res: Response) {
    const cust001 = await this.rcvService.HP_CUST_001(body);
    if (cust001 instanceof Error) {
      const response: ThirdAPIResponse = {
        IF_RST_CD: '99',
        IF_RST_MSG: 'FAILED',
      };
      return res.json(response);
    }
    const response: ThirdAPIResponse = {
      IF_RST_CD: '00',
      IF_RST_MSG: 'SUCCESS',
      CUST_NO: cust001.no,
    };
    return res.json(response);
  }

  @Post('hp_ct_004')
  async HP_CT_004(@Body() body: SellDTO, @Res() res: Response) {
    const ct004 = await this.rcvService.HP_CT_004(body);
    if (ct004 instanceof Error) {
      const response: ThirdAPIResponse = {
        IF_RST_CD: '99',
        IF_RST_MSG: 'FAILED',
        message: ct004.message,
      };
      return res.json(response);
    }
    const response: ThirdAPIResponse = {
      IF_RST_CD: '00',
      IF_RST_MSG: 'SUCCESS',
      CONT_NO: ct004.contractNo,
    };
    return res.json(response);
  }

  @Post('hp_bo_001')
  async HP_BO_001(@Body() body: any, @Res() res: Response) {
    const bo001 = await this.rcvService.HP_BO_001(body);
    if (bo001 instanceof Error) {
      const response: ThirdAPIResponse = {
        IF_RST_CD: '99',
        IF_RST_MSG: 'FAILED',
        message: bo001.message,
      };
      return res.json(response);
    }
    const response: ThirdAPIResponse = {
      IF_RST_CD: '00',
      IF_RST_MSG: 'SUCCESS',
    };
    return res.json(response);
  }

  @Post('hp_bo_002')
  async HP_BO_002(@Body() body: any, @Res() res: Response) {
    const bo002 = await this.rcvService.HP_BO_002(body);
    if (bo002 instanceof Error) {
      const response: ThirdAPIResponse = {
        IF_RST_CD: '99',
        IF_RST_MSG: 'FAILED',
        message: bo002.message,
      };
      return res.json(response);
    }
    const response: ThirdAPIResponse = {
      IF_RST_CD: '00',
      IF_RST_MSG: 'SUCCESS',
    };
    return res.json(response);
  }

  @Post('hp_bo_003')
  async HP_BO_003(@Body() body: any, @Res() res: Response) {
    const bo003 = await this.rcvService.HP_BO_003(body);
    if (bo003 instanceof Error) {
      const response: ThirdAPIResponse = {
        IF_RST_CD: '99',
        IF_RST_MSG: 'FAILED',
        message: bo003.message,
      };
      return res.json(response);
    }
    const response: ThirdAPIResponse = {
      IF_RST_CD: '00',
      IF_RST_MSG: 'SUCCESS',
    };
    return res.json(response);
  }

  @Post('hp_bo_004')
  async HP_BO_004(@Body() body: any, @Res() res: Response) {
    const bo004 = await this.rcvService.HP_BO_004(body);
    if (bo004 instanceof Error) {
      const response: ThirdAPIResponse = {
        IF_RST_CD: '99',
        IF_RST_MSG: 'FAILED',
        message: bo004.message,
      };
      return res.json(response);
    }
    const response: ThirdAPIResponse = {
      IF_RST_CD: '00',
      IF_RST_MSG: 'SUCCESS',
    };
    return res.json(response);
  }

  @Post('ex_exp_002')
  async EX_EXP_002(@Body() body: any, @Res() res: Response) {
    const exp002 = await this.rcvService.EX_EXP_002(body);
    if (exp002 instanceof Error) {
      const response: ThirdAPIResponse = {
        IF_RST_CD: '99',
        IF_RST_MSG: 'FAILED',
        message: exp002.message,
      };
      return res.json(response);
    }
    const response: ThirdAPIResponse = {
      IF_RST_CD: '00',
      IF_RST_MSG: 'SUCCESS',
    };
    return res.json(response);
  }

  @Post('au_auct_002')
  async AU_AUCT_002(@Body() body: any, @Res() res: Response) {
    const exp002 = await this.rcvService.AU_AUCT_002(body);
    if (exp002 instanceof Error) {
      const response: ThirdAPIResponse = {
        IF_RST_CD: '99',
        IF_RST_MSG: 'FAILED',
        message: exp002.message,
      };
      return res.json(response);
    }
    const response: ThirdAPIResponse = {
      IF_RST_CD: '00',
      IF_RST_MSG: 'SUCCESS',
    };
    return res.json(response);
  }

  @Post('au_ex_ct_001')
  async AU_EX_ST_001(@Body() body: any, @Res() res: Response) {
    const { vin, id, price, saleCode } = body;
    if (!id || id === '') {
      const response: ThirdAPIResponse = {
        IF_RST_CD: '99',
        IF_RST_MSG: 'FAILED',
      };
      return res.json(response);
    }
    if (!Number(price)) {
      const response: ThirdAPIResponse = {
        IF_RST_CD: '99',
        IF_RST_MSG: 'FAILED',
      };
      return res.json(response);
    }
    if (!vin || vin === '') {
      const response: ThirdAPIResponse = {
        IF_RST_CD: '99',
        IF_RST_MSG: 'FAILED',
      };
      return res.json(response);
    }
    const st001 = await this.rcvService.AU_EX_CT_001(
      vin,
      id,
      Number(price),
      saleCode,
    );
    if (st001 instanceof Error) {
      const response: ThirdAPIResponse = {
        IF_RST_CD: '99',
        IF_RST_MSG: 'FAILED',
        message: st001.message,
      };
      return res.json(response);
    }
    console.log('success');
    const response: ThirdAPIResponse = {
      IF_RST_CD: '00',
      IF_RST_MSG: 'SUCCESS',
    };
    return res.json(response);
  }

  @Post('au_ex_ct_002')
  async AU_EX_ST_002(@Body() body: any, @Res() res: Response) {
    const { saleCode, state } = body;
    if (!saleCode || saleCode === '') {
      const response: ThirdAPIResponse = {
        IF_RST_CD: '99',
        IF_RST_MSG: 'FAILED',
      };
      return res.json(response);
    }
    const st001 = await this.rcvService.AU_EX_CT_002(
      saleCode,
      ContractStatusMapping[state] || AuctionContractStatusEnum.IN_PROGRESS,
    );
    if (st001 instanceof Error) {
      const response: ThirdAPIResponse = {
        IF_RST_CD: '99',
        IF_RST_MSG: 'FAILED',
        message: st001.message,
      };
      return res.json(response);
    }
    console.log('success');
    const response: ThirdAPIResponse = {
      IF_RST_CD: '00',
      IF_RST_MSG: 'SUCCESS',
    };
    return res.json(response);
  }
}
