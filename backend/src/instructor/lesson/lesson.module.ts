import { Module } from "@nestjs/common";
import { LessonRepo } from "src/db/lesson/lesson.repo";
import { LessonService } from "./lesson.service";
import { LessonController } from "./lesson.controller";
import {  LessonModel } from "src/db/lesson/lesson.model";
import { CompletedLessonModule } from "./completedLesson/completedLesson.module";
import { QuizModule } from "./quiz/quiz.module";
import { AssignmentModule } from "./assignment/assignment.module";
import { SectionModel } from "src/db/section/section.model";

@Module({
    imports:[
    LessonModel,
    CompletedLessonModule,
    QuizModule,
    AssignmentModule,
    SectionModel
    ],
    
    providers:[LessonRepo, LessonService],
    controllers:[LessonController]
})
export class LessonModule {}