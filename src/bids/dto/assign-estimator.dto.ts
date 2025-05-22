import { IsNotEmpty, IsUUID } from 'class-validator';

export class AssignEstimatorDto {
  @IsNotEmpty()
  @IsUUID()
  estimatorId: string;
}
