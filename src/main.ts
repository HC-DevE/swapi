import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
import { SentryInterceptor } from './sentry.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const enableCors = configService.get<boolean>('ENABLE_CORS');
  const port = configService.get<number>('DATABASE_PORT');

  //add sentry
  Sentry.init({
    dsn: configService.get<string>('SENTRY_DSN'),
  });

  app.useGlobalInterceptors(new SentryInterceptor());

  // // The request handler must be the first middleware on the app
  // app.use(Sentry.Handlers.requestHandler());

  if (enableCors) {
    app.enableCors();
  }

  // Initialize Sentry by passing the DNS included in the .env
  Sentry.init({
    dsn: process.env.SENTRY_DNS,
  });

  // Import the filter globally, capturing all exceptions on all routes
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new SentryFilter(httpAdapter));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //If set to true validator will strip validated object of any properties that do not have any decorators.
      transform: true, //The ValidationPipe can automatically transform payloads to be objects typed according to their DTO classes. To enable auto-transformation, set transform to true.
      forbidNonWhitelisted: true, //If set to true, instead of stripping non-whitelisted properties validator will throw an error
      transformOptions: {
        enableImplicitConversion: true, //If set to true class-transformer will attempt conversion based on TS reflected type
      },
    }),
  );

  const config = new DocumentBuilder() //SWAGGER
    .setTitle('API')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'refresh-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); //localhost:3000/docs | localhost:8080/docs to get info of the API

  // app.use(Sentry.Handlers.errorHandler());

  await app.listen(port || 3000);
}
bootstrap();
