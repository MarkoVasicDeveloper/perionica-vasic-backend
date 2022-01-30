/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AddPhotoDto from 'dto/photo/add.photo.dto';
import { Photo } from 'entities/Photo';
import ApiResponse from 'misc/api.response';
import { Repository } from 'typeorm';

@Injectable()
export default class PhotoService {
  constructor(
    @InjectRepository(Photo) private readonly photoService: Repository<Photo>,
  ) {}
  async addPhoto(data: AddPhotoDto): Promise<Photo | ApiResponse> {
    // New photo class instance
    const photo = new Photo();
    photo.photoPath = data.photoPath;
    photo.userId = data.userId;
    photo.messageId = data.messageId;

    const savedPhoto = await this.photoService.save(photo);

    if (!savedPhoto)
      return new ApiResponse('error', -2001, 'Photo is not saved');

    return photo;
  }

  async getAllPhotoForUser(userId: number): Promise<Photo[]> {
    return await this.photoService.find({
      where: {
        userId: userId,
      },
      order: {
        createAt: 'ASC',
      },
    });
  }
}
