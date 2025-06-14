import { Module } from "@nestjs/common";
import { EnrollmentModel } from "src/db/enrollment/enrollment.model";
import { EnrollmentController } from "./enrollment.controller";
import { EnrollmentService } from "./enrollment.service";
import { EnrollmentRepo } from "src/db/enrollment/enrollment.repo";
import { CompletedLessonRepo } from "src/db/completedLesson/completedLesson.repo";
import { CompletedLessonModel } from "src/db/completedLesson/completedLesson.model";
import { SectionRepo } from "src/db/section/section.repo";
import { SectionModel } from "src/db/section/section.model";
import { LessonRepo } from "src/db/lesson/lesson.repo";
import { LessonModel } from "src/db/lesson/lesson.model";

@Module({
    imports: [EnrollmentModel, CompletedLessonModel, SectionModel,LessonModel],
  controllers: [EnrollmentController],
  providers: [EnrollmentService, EnrollmentRepo, CompletedLessonRepo, SectionRepo,LessonRepo],

})
export class EnrollmentModule{}