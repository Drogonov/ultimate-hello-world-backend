import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthUserDto, EditUserDto, CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  // Creates or updates a user based on the existence check
  async createUser(dto: CreateUserDto) {
    // try {
    //   const existingUser = await this.prisma.user.findUnique({
    //     where: { userName: dto.userName },
    //   });

    //   if (existingUser) {
    //     return this.prisma.user.update({
    //       where: { userName: dto.userName },
    //       data: {
    //         telegramId: dto.telegramId,
    //         firstName: dto.firstName,
    //       },
    //     });
    //   }

    //   return this.prisma.user.create({
    //     data: dto,
    //   });

    // } catch (error) {
    //   throw new Error('Failed to create or update user: ' + error.message);
    // }
  }

  // Updates an existing user
  async editUser(dto: EditUserDto) {
    // try {
    //   return this.prisma.user.update({
    //     where: { userName: dto.userName },
    //     data: {
    //       telegramId: dto.telegramId,
    //       firstName: dto.firstName,
    //     },
    //   });

    // } catch (error) {
    //   throw new Error('Failed to edit user: ' + error.message);
    // }
  }

  // Deletes a user by Telegram ID
  async deleteUser(telegramId: number) {
    // try {
    //   await this.prisma.user.delete({
    //     where: { telegramId },
    //   });

    // } catch (error) {
    //   throw new Error('Failed to delete user: ' + error.message);
    // }
  }
}