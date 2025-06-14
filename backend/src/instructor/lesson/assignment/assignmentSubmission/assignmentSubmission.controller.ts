import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CreateSubmissionDto } from './dto';
import { AssignmentSubmissionService } from './assignmentSubmission.service';

@Controller('/assignment-submission')
export class AssignmentSubmissionController {
  constructor(private readonly submissionService: AssignmentSubmissionService) {}

  @Post()
  async create(@Body() dto: CreateSubmissionDto) {
    const submission = await this.submissionService.create(dto);
    return {
      message: 'Submission created successfully',
      statusCode: 201,
      data: submission,
    };
  }

  @Get()
  async findAll() {
    const submissions = await this.submissionService.findAll();
    return {
      message: 'Submissions fetched successfully',
      statusCode: 200,
      data: submissions,
    };
  }

    @Get('/student/:studentId')
  async findByStudent(@Param('studentId') studentId: string) {
    const submissions = await this.submissionService.findByStudent(studentId);
    return {
      message: 'Submissions fetched successfully',
      statusCode: 200,
      data: submissions,
    };
  }

//   @Get(':id')
//   async findOne(@Param('id') id: string) {
//     const submission = await this.submissionService.findOne(id);
//     if (!submission) {
//       throw new NotFoundException('Submission not found');
//     }
//     return {
//       message: 'Submission fetched successfully',
//       statusCode: 200,
//       data: submission,
//     };
//   }



//   @Get('/assignment/:assignmentId')
//   async findByAssignment(@Param('assignmentId') assignmentId: string) {
//     const submissions = await this.submissionService.findByAssignment(assignmentId);
//     return {
//       message: 'Submissions fetched successfully',
//       statusCode: 200,
//       data: submissions,
//     };
//   }


}
