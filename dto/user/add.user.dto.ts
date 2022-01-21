/* eslint-disable prettier/prettier */
import * as validator from 'class-validator';

export default class AddUserDto {

    @validator.IsNotEmpty()
    @validator.IsString()
    @validator.Length(3, 50)
    name: string

    @validator.IsNotEmpty()
    @validator.IsString()
    @validator.Length(3, 50)
    surname: string

    @validator.IsNotEmpty()
    @validator.IsString()
    @validator.Length(3, 50)
    email: string
    message?: string
}