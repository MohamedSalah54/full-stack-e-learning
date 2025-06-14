import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Types } from "mongoose";
import { AssignmentRepo } from "src/db/assignment/assignment.repo";
import { CreateAssignmentDto, UpdateAssignmentDto } from "./dto";

@Injectable()
export class AssignmentService {
  constructor(private readonly assignmentRepo: AssignmentRepo) {}

  async create(dto: CreateAssignmentDto) {
    try {
      const assignmentData = {
        ...dto,
        lessonId: new Types.ObjectId(dto.lessonId),
        deadline: new Date(dto.deadline),
      };
      return await this.assignmentRepo.create(assignmentData);
    } catch (error) {
      throw new InternalServerErrorException("Failed to create assignment");
    }
  }

  async findAll() {
    try {
      return await this.assignmentRepo.find({
        populate: [{ path: 'lessonId' }],
      });
    } catch (error) {
      throw new InternalServerErrorException("Failed to fetch assignments");
    }
  }

  async findOne(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) return null;
      return await this.assignmentRepo.findOne({
        filter: { _id: id },
        populate: [{ path: 'lessonId' }],
      });
    } catch (error) {
      throw new InternalServerErrorException("Failed to fetch assignment");
    }
  }

  async update(id: string, dto: UpdateAssignmentDto) {
    try {
      if (!Types.ObjectId.isValid(id)) return null;
      return await this.assignmentRepo.updateOne({
        filter: { _id: id },
        update: dto,
      });
    } catch (error) {
      throw new InternalServerErrorException("Failed to update assignment");
    }
  }

  async delete(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) return null;
      const result = await this.assignmentRepo.deleteOne({ _id: id });
      return result.deletedCount > 0;
    } catch (error) {
      throw new InternalServerErrorException("Failed to delete assignment");
    }
  }

  
}
