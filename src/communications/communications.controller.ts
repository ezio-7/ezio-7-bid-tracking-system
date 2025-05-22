// src/communications/communications.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { CommunicationsService } from './communications.service';
import { CreateCommunicationDto } from './dto/create-communication.dto';

@Controller('communications')
export class CommunicationsController {
  constructor(private readonly communicationsService: CommunicationsService) {}

  @Post()
  create(@Body() createCommunicationDto: CreateCommunicationDto) {
    return this.communicationsService.create(createCommunicationDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.communicationsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.communicationsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.communicationsService.remove(id);
  }

  @Get('contractor/:contractorId')
  findByContractor(@Param('contractorId') contractorId: string) {
    return this.communicationsService.findByContractor(contractorId);
  }

  @Get('project/:projectId')
  findByProject(@Param('projectId') projectId: string) {
    return this.communicationsService.findByProject(projectId);
  }

  @Get('bid/:bidId')
  findByBid(@Param('bidId') bidId: string) {
    return this.communicationsService.findByBid(bidId);
  }
}