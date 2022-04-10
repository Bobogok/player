/* eslint-disable @typescript-eslint/no-empty-function */
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';
import * as mongoose from 'mongoose';

// В контроллерах мы работаем с запросами и ответами
@Controller('/tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  create(@Body() dto: CreateTrackDto) {
    return this.trackService.create(dto);
  }

  @Get()
  getAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  getSingle(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.trackService.getSingle(id);
  }

  @Delete(':id')
  delete(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.trackService.delete(id);
  }
}
