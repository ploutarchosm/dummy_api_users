import { NestFactory } from '@nestjs/core';
import { json } from 'body-parser';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './http-exception-filter';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


(async () => {
  const application = await NestFactory.create<NestExpressApplication>(
    AppModule,
    {
      cors: true,
      bodyParser: true,
    },
  );


    const httpExceptionFilter = application.get(HttpExceptionFilter);
    application.disable('x-powered-by');
    application.setGlobalPrefix('api/v1');

    const swaggerConfig = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API developed For Users')
    .setVersion('1.0')
    .build();

    const document = SwaggerModule.createDocument(application, swaggerConfig);
    SwaggerModule.setup('swagger', application, document);

    application.useGlobalFilters(httpExceptionFilter);

    useContainer(application.select(AppModule), {
      fallback: true,
      fallbackOnErrors: true,
    });

    application.use(
      json({
        limit: '250mb',
      }),
    );

    application.enableCors();

    await application.listen(7000, () => {
      console.log('Application is listening at port: 7000');
    });
})();
