/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import AddAdministratorDto from "dto/administrator/add.administrator.dto";
import { Administrator } from "entities/Administrator";
import ApiResponse from "misc/api.response";
import { Repository } from "typeorm";
import LoginAdministratorDto from "dto/administrator/login.administrator.dto";
import PasswordHash from "misc/password.hash";

@Injectable()

export default class AdministratorService {
    constructor(@InjectRepository(Administrator) private readonly administratorService: Repository<Administrator>) { }

    async addAdministrator(data: AddAdministratorDto):Promise <Administrator | ApiResponse> {

        try {
            const administrator = new Administrator();
            administrator.username = data.username;
            administrator.passwordHash = PasswordHash(data.password);

            const savedAdministrator = await this.administratorService.save(administrator);

            return savedAdministrator;
            
        } catch (error) {
            new ApiResponse('error', -4001, 'Username is busy')
        }
    }

    async administratorLogin (data: LoginAdministratorDto):Promise<ApiResponse> {
        const admin = await this.administratorService.findOne({
            where: {
                username: data.username,
                passwordHash: PasswordHash(data.password)
            }
        })

        if(!admin) return new ApiResponse('error', -4002, 'User is not find');

        return new ApiResponse('ok', 0);
    }
}