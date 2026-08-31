import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import {
  json,
  urlencoded,
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import { HttpExceptionFilter } from './commons/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  const frontendUrl = process.env.FRONTEND_URL;

  app.use((request: Request, response: Response, next: NextFunction) => {
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('X-Frame-Options', 'DENY');
    response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.setHeader(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=()',
    );
    next();
  });
  app.use(json({ limit: '8mb' }));
  app.use(urlencoded({ extended: false, limit: '100kb' }));
  app.use(cookieParser());
  app.use((request: Request, response: Response, next: NextFunction) => {
    const unsafeMethod = !['GET', 'HEAD', 'OPTIONS'].includes(request.method);
    const accessToken = request.cookies?.access_token;
    const origin = request.headers.origin;

    if (unsafeMethod && accessToken && origin !== frontendUrl) {
      response.status(403).json({ message: 'Request origin is not allowed' });
      return;
    }

    next();
  });
  app.enableCors({
    origin: [frontendUrl],
    credentials: true,
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
