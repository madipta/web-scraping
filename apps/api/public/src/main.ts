import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.API_PUBLIC_PORT;
  await app.listen(port, () => {
    Logger.log("Listening at http://localhost:" + port + "/");
  });
}

bootstrap();
