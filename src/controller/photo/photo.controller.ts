/* eslint-disable prettier/prettier */
import { Controller, HttpException, HttpStatus, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
// import {fileTypeFromFile} from 'file-type';
import { FileInterceptor } from "@nestjs/platform-express";
import { photoConfig } from "config/photo.config";
import { diskStorage } from 'multer';
import { Photo } from "entities/Photo";
import * as sharp from 'sharp';
import PhotoService from "src/service/photo/photo.service";
import ApiResponse from "misc/api.response";
import * as fs from 'fs';

@Controller('api')

export default class PhotoController{
    constructor(private readonly photoService: PhotoService) { }
    @Post('uploadPhoto/:id')
    @UseInterceptors(
        FileInterceptor('photo', {
            storage: diskStorage({
                destination: photoConfig.destination,
                filename: (req, file, callback) => {
                    const originName = file.originalname;

                    const normalizeName = originName.replace(/ /g, '-');

                    const randomNumber = new Array(10).fill(0).map(() => (
                        (Math.random() * 10).toFixed(0)
                    )).join('');

                    let time = '';
                    const date = new Date();
                    time += date.getDate();
                    time += '-';
                    time += date.getMonth() + 1;
                    time += '-';
                    time += date.getFullYear();

                    const savedNameFile = time + '-' + randomNumber + '-' + normalizeName;

                    callback(null, savedNameFile);
                    
                }
            }),
            fileFilter: (req, file, callback) => {
                if(!file.originalname.match(/\.(jpg|png)$/)) {
                    callback(new HttpException('Bad extencion',HttpStatus.UNAUTHORIZED), false)
                }
                
                callback(null, true);
            },
            limits: {
                files: 1
            }
        })
        )
        async uploadThoto(@Param('id') userId: number, @UploadedFile() photo): Promise<Photo | ApiResponse> {
        try {
            if(!photo) {
                return new ApiResponse('error', -3001, 'Photo is not saved')
            }
    
            // const mimetype = await fileTypeFromFile(photo.path);
    
            // if(!(mimetype.mime.includes('jpeg') || mimetype.mime.includes('png'))) {
            //     fs.unlinkSync(photo.path)
            //     return 'Must be png or jpeg';
            // }
    
            const newPhoto = new Photo();
            newPhoto.photoPath = photo.filename;
            newPhoto.userId = userId;
    
            const savedPhoto = await this.photoService.addPhoto(newPhoto);
    
            const path = photo.path;
    
            await this.sharpResize(path, 'small/', photo.filename, 300, 400);
            await this.sharpResize(path, 'medium/', photo.filename, 500, 700);

            fs.unlinkSync(path)
    
            return savedPhoto;
        } catch (error) {
            return error;
        }
    }

    private async sharpResize (path: string, folder: string, photoOriginalName: string, width: number, height: number) {
        await sharp(path).resize({
            width: width,
            height: height,
            fit: 'fill'
        }).toFile(photoConfig.destination + folder + photoOriginalName )
    }
}