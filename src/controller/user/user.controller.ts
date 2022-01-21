/* eslint-disable prettier/prettier */

import { Body, Controller, Post } from "@nestjs/common";
import AddUserDto from "dto/user/add.user.dto";
import { User } from "entities/User";
import ApiResponse from "misc/api.response";
import { MailerConfig } from "misc/mailer.dto";
import MailerService from "src/service/mailer/mailer.service";
import UserService from "src/service/user/user.service";

@Controller('api')
export default class UserController {
    constructor(private readonly userService: UserService,
        private readonly mailerService: MailerService) { }
        
    @Post('addUser')
    async addUser(@Body() data: AddUserDto): Promise <User | ApiResponse> {
        await this.mailerService.sendEmail(data.email, MailerConfig.text)
        return await this.userService.addUser(data);
    }
}