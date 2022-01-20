/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from "@nestjs/common";
import AddAdministratorDto from "dto/administrator/add.administrator.dto";
import LoginAdministratorDto from "dto/administrator/login.administrator.dto";
import { Administrator } from "entities/Administrator";
import ApiResponse from "misc/api.response";
import AdministratorService from "src/service/administrator/administrator.service";

@Controller('api')

export default class AdministratorController {
    constructor(private readonly administratorService: AdministratorService) { }

    @Post('addAdministrator')
    async addAdministrator (@Body() data: AddAdministratorDto):Promise <Administrator | ApiResponse> {
        return await this.administratorService.addAdministrator(data);
    }

    @Post('loginAdministrator')
    async loginAdministrator(@Body() data: LoginAdministratorDto):Promise <ApiResponse> {
        return this.administratorService.administratorLogin(data);
    }
}