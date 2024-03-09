import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { WsAdapter } from '@nestjs/platform-ws';
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));
  app.enableCors();
  const port = process.env.API_ADMIN_PORT;
  await app.listen(port, () => {
    Logger.log("Listening at http://localhost:" + port + "/");
  });
}

bootstrap();
