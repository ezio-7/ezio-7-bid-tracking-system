import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Communication } from './entities/communication.entity';
import { CommunicationsController } from './communications.controller';
import { CommunicationsService } from './communications.service';
import { ContractorsModule } from '../contractors/contractors.module';
import { ProjectsModule } from '../projects/projects.module';
import { BidsModule } from '../bids/bids.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Communication]),
    ContractorsModule,
    ProjectsModule,
    BidsModule,
  ],
  controllers: [CommunicationsController],
  providers: [CommunicationsService],
  exports: [CommunicationsService],
})
export class CommunicationsModule {}
