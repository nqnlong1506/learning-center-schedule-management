import { SetMetadata } from '@nestjs/common';

export const ImgPath = (path: string) => SetMetadata('imgPath', path);
