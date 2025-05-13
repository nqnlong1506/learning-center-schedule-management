import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization, Session_id',
    credentials: true,
  });
  // app.use(
  //   multer().any(), // Accept all type for Content-type: form-data
  // );

  app.use((req, res, next) => {
    const originalJson = res.json.bind(res);

    // Override res.json
    res.json = (data: any) => {
      if (req.newAccessToken) {
        data = { ...data, newAccessToken: req.newAccessToken };
      }
      return originalJson(data);
    };

    next();
  });

  // app.use(cookieParser());
  app.setGlobalPrefix('api');

  // logTransaction();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
