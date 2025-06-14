import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSubmissionDto } from './dto';
import { Types } from 'mongoose';
import { AssignmentSubmissionRepo } from 'src/db/assignmentSubmission/assignmentSubmission.repo';

@Injectable()
export class AssignmentSubmissionService {
    constructor(private readonly submissionRepo: AssignmentSubmissionRepo) { }

    private isValidObjectId(id: string): boolean {
        return Types.ObjectId.isValid(id);
    }
    async create(dto: CreateSubmissionDto) {
        try {
            if (!this.isValidObjectId(dto.assignmentId)) {
                throw new BadRequestException('Invalid assignmentId');
            }

            if (!this.isValidObjectId(dto.studentId)) {
                throw new BadRequestException('Invalid studentId');
            }

            const submission = await this.submissionRepo.create({
                ...dto,
                assignmentId: new Types.ObjectId(dto.assignmentId),
                studentId: new Types.ObjectId(dto.studentId),
                submittedAt: new Date(),
            });

            return submission;
        } catch (error) {
            if (error instanceof BadRequestException) throw error;
            throw new InternalServerErrorException('Failed to create submission');
        }
    }

    async findAll() {
        try {
            const submissions = await this.submissionRepo.find();
            return submissions;
        } catch (error) {
            throw new InternalServerErrorException('Failed to retrieve submissions');
        }
    }



    async findByStudent(studentId: string) {
        try {
            if (!this.isValidObjectId(studentId)) {
                throw new BadRequestException('Invalid studentId');
            }

            const submissions = await this.submissionRepo.find({
                filter: { studentId: new Types.ObjectId(studentId) },
            });

            return submissions;
        } catch (error) {
            if (error instanceof BadRequestException) throw error;
            throw new InternalServerErrorException('Failed to retrieve student submissions');
        }
    }


    //   async findOne(id: string) {
    //     const submission = await this.submissionRepo.findOne({
    //       filter: { _id: new Types.ObjectId(id) },
    //     });
    //     if (!submission) {
    //       throw new NotFoundException('Submission not found');
    //     }
    //     return submission;
    //   }



    //   async findByAssignment(assignmentId: string) {
    //     return this.submissionRepo.find({
    //       filter: { assignmentId: new Types.ObjectId(assignmentId) },
    //     });
    //   }


}
