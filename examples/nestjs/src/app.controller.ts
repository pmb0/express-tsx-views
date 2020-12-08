import { Controller, Get, Render } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  @Render('Index')
  getHello(): any {
    return { title: 'Hello from NestJS', lang: 'de' };
  }
}
