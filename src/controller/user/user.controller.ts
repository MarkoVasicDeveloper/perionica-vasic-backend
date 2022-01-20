/* eslint-disable prettier/prettier */

import { Body, Controller, Post } from "@nestjs/common";
import AddUserDto from "dto/user/add.user.dto";
import { User } from "entities/User";
import ApiResponse from "misc/api.response";
import UserService from "src/service/user/user.service";

@Controller('api')
export default class UserController {
    constructor(private readonly userService: UserService) { }
    @Post('addUser')
    async addUser(@Body() data: AddUserDto): Promise <User | ApiResponse> {
        return this.userService.addUser(data);
    }
}