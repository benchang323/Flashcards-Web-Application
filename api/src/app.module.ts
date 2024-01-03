// Path: src/app.module.ts
// Some components are refactored or modified from classworkimport { Module } from '@nestjs/common';

import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { validate } from "./env.validation";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth/auth.service";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./auth/local.strategy";
import { User } from "./user/user.entity";
import { UserService } from "./user/user.service";
import { UserController } from "./user/user.controller";
import { JwtModule } from "@nestjs/jwt";
import { AppController } from "./app.controller";
import { DecksModule } from "./decks/decks.module";
import { JwtStrategy } from "./auth/jwt.strategy";
import { Module } from "@nestjs/common";
import { CardsModule } from "./cards/cards.module";

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USER"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_NAME"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: configService.get<string>("NODE_ENV") !== "production",
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: configService.get<string>("JWT_EXPIRATION"),
        },
      }),
      inject: [ConfigService],
    }),
    DecksModule,
    CardsModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, AuthService, LocalStrategy, JwtStrategy, UserService],
})
export class AppModule {}