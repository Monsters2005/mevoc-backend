import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entity/User';
import { UsersModule } from './users/users.module';
import { ListModule } from './list/list.module';
import { WordModule } from './word/word.module';
import { ListController } from './list/list.controller';
import { ListService } from './list/list.service';
import { AuthModule } from './auth/auth.module';
import { TokenService } from './token/token.service';
import { TokenModule } from './token/token.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User],
      migrations: ['dist/migration/*.js'],
      cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
      },
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
    TokenModule,
    WordModule,
    ListModule,
  ],
  controllers: [AppController, ListController],
  providers: [AppService, ListService, TokenService],

})
export class AppModule {}
