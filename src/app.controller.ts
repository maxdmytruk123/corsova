import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Отримання інформації користувача
  @Get('user-info/:name')
  async getUserInfo(@Param('name') name: string) {
    const exists = await this.appService.getUserInfo(name);
    return { exists }
  }

  // Перевірка чи існує користувач
  @Get('cheack-name/:name')
  async cheackName(@Param('name') name: string) {
    console.log('Checking name:', name);
    const exists = await this.appService.checkName(name);
    return { exists }
  }

  // Створення інформації користувача
  @Post('create')
  async create(@Body() data:any) {
   return this.appService.save(data)
  }
}
