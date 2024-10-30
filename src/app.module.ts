import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { validationSchema } from './config/validationSchema';
import { ConfigurationModule } from './config/configuration.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    ConfigurationModule,
    PrismaModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
