//Collect Telemetry
import * as appInsights from 'applicationinsights';

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;
  appInsights.setup(configService.get('APPINSIGHTS_INSTRUMENTATIONKEY'));
  await app.listen(port);
  appInsights.start();
  console.log(`app listening on port ${port}`);
}
bootstrap();
