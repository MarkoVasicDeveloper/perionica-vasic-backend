/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { photoConfig } from 'config/photo.config';
import { diskStorage } from 'multer';
import { Photo } from 'entities/Photo';
import * as sharp from 'sharp';
import PhotoService from 'src/service/photo/photo.service';
import ApiResponse from 'misc/api.response';
import * as fs from 'fs';

@Controller('api')
export default class PhotoController {
  constructor(private readonly photoService: PhotoService) {}
  @Post('uploadPhoto/:id/:messageId')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        //photo destination
        destination: photoConfig.destination,
        filename: (req, file, callback) => {
          // Setting the file name: remove space, add random number and time of creating
          const originName = file.originalname;

          const normalizeName = originName.replace(/ /g, '-');

          const randomNumber = new Array(10)
            .fill(0)
            .map(() => (Math.random() * 10).toFixed(0))
            .join('');

          let time = '';
          const date = new Date();
          time += date.getDate();
          time += '-';
          time += date.getMonth() + 1;
          time += '-';
          time += date.getFullYear();

          const savedNameFile = time + '-' + randomNumber + '-' + normalizeName;

          callback(null, savedNameFile);
        },
      }),
      fileFilter: (req, file, callback) => {
        //Check extencion
        if (!file.originalname.match(/\.(jpg|png)$/)) {
          callback(
            new HttpException('Bad extencion', HttpStatus.UNAUTHORIZED),
            false,
          );
          return;
        }

        callback(null, true);
      },
      //Limits number of files
      limits: {
        files: 1,
      },
    }),
  )
  async uploadThoto(
    @Param('id') userId: number,
    @Param('messageId') messageId: number,
    @UploadedFile() photo,
  ): Promise<Photo | ApiResponse> {
    try {
      // if the image doesn't exist
      if (!photo) return new ApiResponse('error', -3001, 'Photo is not saved');

      // A new instance of the class photo
      const newPhoto = new Photo();
      newPhoto.photoPath = photo.filename;
      newPhoto.userId = userId;
      newPhoto.messageId = messageId;

      const savedPhoto = await this.photoService.addPhoto(newPhoto);

      const path = photo.path;

      // Resize photo in two formats
      await this.sharpResize(path, 'small/', photo.filename, 300, 400);
      await this.sharpResize(path, 'medium/', photo.filename, 500, 700);

      // Delete original photo
      fs.unlinkSync(path);

      return savedPhoto;
    } catch (error) {
      return error;
    }
  }

  private async sharpResize(
    path: string,
    folder: string,
    photoOriginalName: string,
    width: number,
    height: number,
  ) {
    await sharp(path)
      .resize({
        width: width,
        height: height,
        fit: 'fill',
      })
      .toFile(photoConfig.destination + folder + photoOriginalName);
  }

  @Get('allPhotoForUser/:userId')
  async allPhotoForUser(@Param('userId') userId: number): Promise<Photo[]> {
    return await this.photoService.getAllPhotoForUser(userId);
  }
}
