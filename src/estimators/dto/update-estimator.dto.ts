// src/estimators/dto/update-estimator.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateEstimatorDto } from './create-estimator.dto';

export class UpdateEstimatorDto extends PartialType(CreateEstimatorDto) {}