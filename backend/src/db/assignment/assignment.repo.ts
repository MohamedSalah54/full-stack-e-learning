import { InjectModel } from "@nestjs/mongoose";
import { BaseRepo } from "../base.repo";
import { Assignment, TAssignment } from "./assignment.model";
import { Model } from "mongoose";


export class AssignmentRepo extends BaseRepo<TAssignment>{
    constructor(
        @InjectModel(Assignment.name) private readonly assignmentModel: Model<TAssignment> 
    ){
        super(assignmentModel);

    }
}