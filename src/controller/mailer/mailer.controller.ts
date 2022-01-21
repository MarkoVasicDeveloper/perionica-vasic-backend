/* eslint-disable prettier/prettier */
import { Controller, Post } from "@nestjs/common";
import MailerService from "src/service/mailer/mailer.service";

@Controller('api')

export default class MailerController {
    constructor(private readonly mailerService: MailerService) { }

    @Post('sendMail')
    async sendMailToUser(email: string, body: string) {
        return await this.mailerService.sendEmail(email, body)
    }
}