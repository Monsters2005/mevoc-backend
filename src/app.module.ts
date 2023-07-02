import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entity/User';
import { UsersModule } from './users/users.module';

import { WordpackModule } from './wordpack/wordpack.module';
import { ListModule } from './list/list.module';
import { WordModule } from './word/word.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { Wordpack } from './entity/Wordpack';
import { Word } from './entity/Word';
import { List } from './entity/List';

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
      entities: [User, Wordpack, Word, List],
      migrations: ['dist/migration/*.js'],
      cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
      },
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    WordpackModule,
    AuthModule,
    TokenModule,
    WordModule,
    ListModule,
  ],
  controllers: [AppController],
  providers: [AppService, User],
})
export class AppModule {}
