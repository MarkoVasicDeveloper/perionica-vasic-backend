/* eslint-disable prettier/prettier */
import * as validator from 'class-validator';

export default class AddPhotoDto{

    @validator.IsNotEmpty()
    @validator.IsString()
    photoPath: string

    @validator.IsNotEmpty()
    @validator.IsNotEmpty()
    userId: number
}