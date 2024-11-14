import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  // Creates or updates a user based on the existence check
  async getUser(userId: number) {
    try {
      console.log(userId)
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      return user

    } catch (error) {
      throw new Error('Failed to create or update user: ' + error.message);
    }
  }

  // Updates an existing user
  async editUser(dto: EditUserDto) {
    try {
      return this.prisma.user.update({
        where: { id: dto.id },
        data: {
          id: dto.id,
          userName: dto.name,
        },
      });

    } catch (error) {
      throw new Error('Failed to edit user: ' + error.message);
    }
  }
}