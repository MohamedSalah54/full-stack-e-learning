import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssignmentSubmission, assignmentSubmissionSchema } from 'src/db/assignmentSubmission/assignmentSubmission.model';
import { AssignmentSubmissionController } from './assignmentSubmission.controller';
import { AssignmentSubmissionRepo } from 'src/db/assignmentSubmission/assignmentSubmission.repo';
import { AssignmentSubmissionService } from './assignmentSubmission.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AssignmentSubmission.name, schema: assignmentSubmissionSchema },
    ]),
  ],
  controllers: [AssignmentSubmissionController],
  providers: [AssignmentSubmissionRepo, AssignmentSubmissionService],
  exports: [AssignmentSubmissionRepo],
})
export class AssignmentSubmissionModule {}
