/* eslint-disable no-useless-escape */
import {
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsBoolean,
  IsString,
  Matches,
} from 'class-validator';

export class CreateEstimatorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

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
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  specialization?: string;
}
