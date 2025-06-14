import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { AssignmentService } from "./assignment.service";
import { CreateAssignmentDto, UpdateAssignmentDto } from "./dto";
import { Types } from "mongoose";

@Controller('/assignment')
export class AssignmentController {
    constructor(private readonly assignmentService: AssignmentService) { }


    @Post()
    async create(@Body() dto: CreateAssignmentDto) {
        const assignment = await this.assignmentService.create(dto);
        return {
            message: 'Assignment created successfully',
            statusCode: 201,
            data: assignment,
        };
    }

    @Get()
    async findAll() {
        const assignments = await this.assignmentService.findAll();
        return {
            message: 'Assignments fetched successfully',
            statusCode: 200,
            data: assignments,
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const assignment = await this.assignmentService.findOne(id);
        if (!assignment) {
            throw new NotFoundException('Assignment not found');
        }
        return {
            message: 'Assignment fetched successfully',
            statusCode: 200,
            data: assignment,
        };
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateAssignmentDto) {
        const assignment = await this.assignmentService.update(id, dto);
        if (!assignment) {
            throw new NotFoundException('Assignment not found');
        }
        return {
            message: 'Assignment updated successfully',
            statusCode: 200,
            data: assignment,
        };
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const deleted = await this.assignmentService.delete(id);
        if (!deleted) {
            throw new NotFoundException('Assignment not found');
        }
        return {
            message: 'Assignment deleted successfully',
            statusCode: 200,
        };
    }

}