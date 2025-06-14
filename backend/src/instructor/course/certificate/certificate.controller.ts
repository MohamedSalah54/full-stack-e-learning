import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { CreateBulkCertificateDto, CreateCertificateDto, UpdateCertificateDto } from './dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { UserRoles } from 'src/common/enum';

@Controller('certificates')
export class CertificateController {
  constructor(private readonly service: CertificateService) { }

  @Auth(UserRoles.INSTRUCTOR)
  @Post()
  async create(@Body() dto: CreateCertificateDto) {
    const certificate = await this.service.create(dto);
    return {
      message: 'Certificate created successfully',
      statusCode: 201,
      data: certificate,
    };
  }

  @Post('bulk')
  async createBulk(@Body() dto: CreateBulkCertificateDto) {
    const certificates = await this.service.createBulkCertificates(dto);

    return {
      message: 'Certificates created successfully',
      statusCode: 201,
      data: certificates,
    };
  }

  @Auth(UserRoles.INSTRUCTOR)
  @Get('course/:courseId')
  async findAllByCourse(@Param('courseId') courseId: string) {
    const certificates = await this.service.findAll(courseId);
    return {
      message: 'Certificates retrieved successfully',
      statusCode: 200,
      data: certificates,
    };
  }

  @Auth(UserRoles.INSTRUCTOR)
  @Get('course/:courseId/user/:userId')
  async findByCourseAndUser(
    @Param('courseId') courseId: string,
    @Param('userId') userId: string,
  ) {
    const certificate = await this.service.findByCourseAndUser(courseId, userId);
    return {
      message: 'Certificate retrieved successfully',
      statusCode: 200,
      data: certificate,
    };
  }


  @Auth(UserRoles.STUDENT)
  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
    const certificates = await this.service.findByUser(userId);
    return {
      message: 'User certificates retrieved successfully',
      statusCode: 200,
      data: certificates,
    };
  }

  @Auth(UserRoles.INSTRUCTOR)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCertificateDto) {
    const updatedCertificate = await this.service.update(id, dto);
    return {
      message: 'Certificate updated successfully',
      statusCode: 200,
      data: updatedCertificate,
    };
  }

  @Auth(UserRoles.INSTRUCTOR)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.service.delete(id);
    return {
      message: 'Certificate deleted successfully',
      statusCode: 200,
      data: null,
    };
  }

  @Delete('bulk/:courseId')
  async deleteBulkByCourse(@Param('courseId') courseId: string) {
    const result = await this.service.deleteBulkCertificatesByCourse(courseId);

    return {
      message: `Certificates for course ${courseId} deleted successfully`,
      statusCode: 200,
      data: result,
    };
  }


}
