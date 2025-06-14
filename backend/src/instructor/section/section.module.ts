import { Module } from '@nestjs/common';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';
import { SectionRepo } from 'src/db/section/section.repo';
import {  SectionModel } from 'src/db/section/section.model';

@Module({
  imports: [SectionModel  ],
  providers: [SectionRepo, SectionService],
  controllers: [SectionController],
})
export class SectionModule {}
