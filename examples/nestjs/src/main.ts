import { NestFactory } from "@nestjs/core";
import { setupReactViews } from "express-tsx-views";
import { resolve } from "path";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupReactViews(app.getHttpAdapter().getInstance(), {
    viewsDirectory: resolve(__dirname, '../src/views'),
  });

  await app.listen(3000);
}
bootstrap();
