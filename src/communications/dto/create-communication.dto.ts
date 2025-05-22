// src/communications/dto/create-communication.dto.ts
import { IsNotEmpty, IsOptional, IsUUID, IsString } from 'class-validator';

export class CreateCommunicationDto {
  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  communicationType: string;

  @IsOptional()
  @IsString()
  emailId?: string;

  @IsNotEmpty()
  @IsUUID()
  contractorId: string;

  @IsOptional()
  @IsUUID()
  projectId?: string;

  @IsOptional()
  @IsUUID()
  bidId?: string;
}