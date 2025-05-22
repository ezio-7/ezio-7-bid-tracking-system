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
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import { AssignEstimatorDto } from './dto/assign-estimator.dto';
import { AddVendorDto } from './dto/add-vendor.dto';

@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @Post()
  create(@Body() createBidDto: CreateBidDto) {
    return this.bidsService.create(createBidDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.bidsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bidsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBidDto: UpdateBidDto) {
    return this.bidsService.update(id, updateBidDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bidsService.remove(id);
  }

  @Post(':id/assign-estimator')
  assignEstimator(
    @Param('id') id: string,
    @Body() assignEstimatorDto: AssignEstimatorDto,
  ) {
    return this.bidsService.assignEstimator(id, assignEstimatorDto.estimatorId);
  }

  @Post(':id/add-vendor')
  addVendor(@Param('id') id: string, @Body() addVendorDto: AddVendorDto) {
    return this.bidsService.addVendor(
      id,
      addVendorDto.vendorId,
      addVendorDto.role,
    );
  }

  @Delete(':bidId/vendors/:vendorId')
  removeVendor(
    @Param('bidId') bidId: string,
    @Param('vendorId') vendorId: string,
  ) {
    return this.bidsService.removeVendor(bidId, vendorId);
  }

  @Get('compare/project/:projectId')
  compareBidsForProject(@Param('projectId') projectId: string) {
    return this.bidsService.compareBidsForProject(projectId);
  }
}
