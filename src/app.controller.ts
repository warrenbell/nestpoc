import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getWelcome(): { message: string } {
    return this.appService.getWelcome();
  }

  @Get('health')
  getHealth(): { status: string } {
    return this.appService.getHealth();
  }
}
