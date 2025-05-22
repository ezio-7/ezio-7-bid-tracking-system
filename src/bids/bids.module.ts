import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bid } from './entities/bid.entity';
import { BidsController } from './bids.controller';
import { BidsService } from './bids.service';
import { ContractorsModule } from '../contractors/contractors.module';
import { ProjectsModule } from '../projects/projects.module';
import { EstimatorsModule } from '../estimators/estimators.module';
import { VendorsModule } from '../vendors/vendors.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bid]),
    ContractorsModule,
    ProjectsModule,
    EstimatorsModule,
    VendorsModule,
  ],
  controllers: [BidsController],
  providers: [BidsService],
  exports: [BidsService],
})
export class BidsModule {}
