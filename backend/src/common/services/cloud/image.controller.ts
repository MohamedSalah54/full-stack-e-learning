// image.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/multer.utils';
import { CloudService } from './cloudinary';

@Controller('upload')
export class ImageController {
  constructor(private readonly cloudService: CloudService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file', multerOptions(['image/jpeg', 'image/png'])))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const { public_id, secure_url } = await this.cloudService.uploadFile({
      path: file.path,
      folder: 'courses',
    });
    return { public_id, secure_url };
  }
}
