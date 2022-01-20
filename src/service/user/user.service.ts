/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import AddUserDto from "dto/user/add.user.dto";
import { User } from "entities/User";
import ApiResponse from "misc/api.response";
import { Repository } from "typeorm";

@Injectable()

export default class UserService {
    constructor(@InjectRepository(User) private readonly userService: Repository<User>) { }

    async addUser(data: AddUserDto): Promise<User | ApiResponse> {
        try {
            const user = new User();
            user.name = data.name;
            user.surname = data.surname;
            user.email = data.email;

            if(data.message) {
                user.message = data.message;
            }

            const savedUser = await this.userService.save(user);

            if(!savedUser) {
                return new ApiResponse('error', -1001, 'Recording error')
            }

            return savedUser;
        } catch (error) {
            return new ApiResponse('error', -1002, 'Email is busy')
        }
    }
}