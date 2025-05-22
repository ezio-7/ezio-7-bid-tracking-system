// src/bids/dto/assign-estimator.dto.ts
import { IsNotEmpty, IsUUID } from 'class-validator';

export class AssignEstimatorDto {
  @IsNotEmpty()
  @IsUUID()
  estimatorId: string;
}