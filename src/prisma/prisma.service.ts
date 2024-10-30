import { Injectable } from '@nestjs/common';
import { ConfigurationService } from '../config/configuration.service';
import { PrismaClient } from '@prisma/client';
// import { PrismaClient } from '../prisma/generated/clientPg'

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(configService: ConfigurationService) {
    super({
      datasources: {
        db: {
          url: configService.getDatabaseURL(),
        },
      },
    });
  }

  cleanDb() {
    return this.$transaction([
      this.message.deleteMany(),
      this.user.deleteMany()
    ]);
  }
}
