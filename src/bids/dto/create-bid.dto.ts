import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsUUID,
  IsDateString,
  IsObject,
  IsString,
} from 'class-validator';

export class CreateBidDto {
  @IsNotEmpty()
  @IsUUID()
  projectId: string;

  @IsNotEmpty()
  @IsUUID()
  contractorId: string;

  @IsOptional()
  @IsUUID()
  estimatorId?: string;

  @IsOptional()
  @IsNumber()
  bidAmount?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDateString()
  submissionDate?: string;

  @IsOptional()
  @IsObject()
  details?: any;

  @IsOptional()
  @IsString()
  notes?: string;
}
