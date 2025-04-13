import { SetMetadata } from '@nestjs/common';

export const LogPath = (path: string) => SetMetadata('logPath', path);
