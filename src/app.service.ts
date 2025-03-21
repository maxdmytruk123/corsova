import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService) {}

  getHello(): string {
    return 'Hello World!';
  }

  // Збереження інформації коли користувач зареєструвався
  async save(dto: any) {
    console.log(dto)
    return this.databaseService.post.create({
      data: {
        data: dto,
      },
    });
  }

  // Перевірка при воході чи є цей користувач в базі диних
  async checkName(name: string): Promise<boolean> {
    const post = await this.databaseService.post.findFirst({
      where: {
        data: {
          path: '$.name',
          equals: name,
        },
      },
    });

    return post !== null;
  }

  // отримання інформації про користувача
  async getUserInfo(name: string): Promise<any> {
    const user = await this.databaseService.post.findFirst({
      where: {
        data: {
          path: '$.name',
          equals: name,
        },
      },
    });


    return user?.data ?? null;
  }

}
