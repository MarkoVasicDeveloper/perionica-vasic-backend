/* eslint-disable prettier/prettier */
import * as validator from 'class-validator';

export default class LoginAdministratorDto{
    @validator.IsNotEmpty()
    @validator.IsString()
    @validator.Length(3, 50)
    username: string

    @validator.IsNotEmpty()
    @validator.IsString()
    @validator.Length(3, 50)
    password: string
}