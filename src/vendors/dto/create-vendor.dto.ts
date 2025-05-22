/* eslint-disable no-useless-escape */
import {
  IsNotEmpty,
  IsOptional,
  IsEmail,
  Matches,
  IsBoolean,
  IsString,
} from 'class-validator';

export class CreateVendorDto {
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
  serviceType?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  role?: string;
}
