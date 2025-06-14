import { Module } from "@nestjs/common";
import { ReviewController } from "./review.controller";
import { ReviewService } from "./review.service";
import { RevieweModel } from "src/db/review/review.model";
import { ReviewRepo } from "src/db/review/review.repo";

@Module({
    imports:[RevieweModel],
    controllers:[ReviewController],
    providers:[ReviewService,ReviewRepo]
})

export class ReviewModule {}

