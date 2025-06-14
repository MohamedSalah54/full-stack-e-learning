import { Module } from "@nestjs/common";
import {  QuizModel } from "src/db/quiz/quiz.model";
import { QuizService } from "./quiz.service";
import { QuizRepo } from "src/db/quiz/quiz.repo";
import { QuizController } from "./quiz.controller";
import { QuestionModule } from "./question/question.module";
import { QuizSubmissionModule } from "./quizSubmission/quizSubmission.module";

@Module({
    imports:[ QuizModel , QuestionModule, QuizSubmissionModule],
    providers:[QuizService,QuizRepo],
    controllers:[QuizController]
})
export class QuizModule{}