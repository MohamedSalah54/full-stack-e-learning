import { Module } from "@nestjs/common";
import { CompletedLessonService } from "./completedLesson.service";
import { CompletedLessonRepo } from "src/db/completedLesson/completedLesson.repo";
import { CompletedLessonController } from "./completedLesson.controller";
import { CompletedLessonModel } from "src/db/completedLesson/completedLesson.model";

@Module({
    imports:[CompletedLessonModel ],
    providers:[CompletedLessonService, CompletedLessonRepo],
    controllers:[CompletedLessonController]

})
export class CompletedLessonModule{}