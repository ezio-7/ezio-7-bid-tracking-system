/* eslint-disable no-useless-escape */
import {
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsString,
  Matches,
} from 'class-validator';

export class CreateContractorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  contactPerson?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9\-\+$$$$\s]+$/, {
    message: 'Phone must be a valid phone number format',
  })
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  specialization?: string;

  @IsOptional()
  isActive?: boolean;
}
