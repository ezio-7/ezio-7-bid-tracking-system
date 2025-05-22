import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estimator } from './entities/estimator.entity';
import { EstimatorsController } from './estimators.controller';
import { EstimatorsService } from './estimators.service';

@Module({
  imports: [TypeOrmModule.forFeature([Estimator])],
  controllers: [EstimatorsController],
  providers: [EstimatorsService],
  exports: [EstimatorsService],
})
export class EstimatorsModule {}
