import { Module } from "@nestjs/common";
import { AssignmentModel } from "src/db/assignment/assignment.model";
import { AssignmentRepo } from "src/db/assignment/assignment.repo";
import { AssignmentService } from "./assignment.service";
import { AssignmentController } from "./assignment.controller";
import { AssignmentSubmissionModule } from "./assignmentSubmission/assignmentSubmission.module";

@Module({
    imports: [  AssignmentModel , AssignmentSubmissionModule ],
    providers: [AssignmentRepo, AssignmentService],
    controllers: [AssignmentController]
})
export class AssignmentModule {}