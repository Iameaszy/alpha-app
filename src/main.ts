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

  const closeApp = async () => {
    try {
      await app.close();
      process.exit(0);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };

  // PM2 Graceful Exits
  process.on('SIGINT', async () => {
    console.info('SIGINT signal received.');
    await closeApp();
  });

  process.on('message', async (msg) => {
    if (msg == 'shutdown') {
      await closeApp();
    }
  });
}
bootstrap();
