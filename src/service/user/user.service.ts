/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AddUserDto from 'dto/user/add.user.dto';
import { Message } from 'entities/Message';
import { User } from 'entities/User';
import ApiResponse from 'misc/api.response';
import { Repository } from 'typeorm';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User) private readonly userService: Repository<User>,
    @InjectRepository(Message)
    private readonly messageService: Repository<Message>,
  ) {}

  async addUser(
    data: AddUserDto,
  ): Promise<User | ApiResponse | [User, number]> {
    try {
      //Check if user exist
      const userExist = await this.userService.findOne({
        email: data.email,
        name: data.name,
        surname: data.surname,
      });

      if (userExist) {
        if (data.message) {
          const newMessage = new Message();
          newMessage.message = data.message;
          newMessage.userId = userExist.userId;

          const savedNewMessage = await this.messageService.save(newMessage);

          return [userExist, savedNewMessage.messageId];
        }
      }

      // Creating a new instance of class User and saving new user
      const user = new User();
      user.name = data.name;
      user.surname = data.surname;
      user.email = data.email;

      const savedUser = await this.userService.save(user);

      if (!savedUser) return new ApiResponse('error', -1001, 'Recording error');

      if (data.message) {
        const newMessage = new Message();
        newMessage.userId = savedUser.userId;
        newMessage.message = data.message;

        const savedMessage = await this.messageService.save(newMessage);
        return [user, savedMessage.messageId];
      }

      return savedUser;
    } catch (error) {
      // If a user with that email exists
      const user = await this.userService.findOne({
        email: data.email,
      });

      if (data.message) {
        const newMessage = new Message();
        newMessage.userId = user.userId;
        newMessage.message = data.message;

        const savedMessage = await this.messageService.save(newMessage);

        return [user, savedMessage.messageId];
      }

      return user;
    }
  }

  async getAllUser(): Promise<User[]> {
    return await this.userService.find();
  }

  async getUserWithMessage(userId: number): Promise<User> {
    return await this.userService.findOne({
      where: {
        userId: userId,
      },
      relations: ['messages'],
    });
  }
}
