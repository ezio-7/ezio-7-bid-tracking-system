import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EstimatorsService } from './estimators.service';
import { CreateEstimatorDto } from './dto/create-estimator.dto';
import { UpdateEstimatorDto } from './dto/update-estimator.dto';

@Controller('estimators')
export class EstimatorsController {
  constructor(private readonly estimatorsService: EstimatorsService) {}

  @Post()
  create(@Body() createEstimatorDto: CreateEstimatorDto) {
    return this.estimatorsService.create(createEstimatorDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.estimatorsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estimatorsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstimatorDto: UpdateEstimatorDto,
  ) {
    return this.estimatorsService.update(id, updateEstimatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estimatorsService.remove(id);
  }

  @Get(':id/assigned-bids')
  findAssignedBids(@Param('id') id: string) {
    return this.estimatorsService.findAssignedBids(id);
  }
}
