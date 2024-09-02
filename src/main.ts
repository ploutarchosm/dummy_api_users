import { NestFactory } from '@nestjs/core';
import { json } from 'body-parser';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

(async () => {
  const application = await NestFactory.create<NestExpressApplication>(
    AppModule,
    {
      cors: true,
      bodyParser: true,
    },
  );

  application.disable('x-powered-by');
  application.setGlobalPrefix('api/v1');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API developed For Users')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(application, swaggerConfig);
  SwaggerModule.setup('swagger', application, document);

  application.use(
    json({
      limit: '250mb',
    }),
  );

  application.enableCors();

  await application.listen(3000, () => {
    console.log('Application is listening at port: 3000');
  });
})();
