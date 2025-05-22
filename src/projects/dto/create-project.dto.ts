// src/projects/dto/create-project.dto.ts
import { IsNotEmpty, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  location?: string;

  @IsOptional()
  @IsNumber()
  budget?: number;

  @IsOptional()
  status?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}