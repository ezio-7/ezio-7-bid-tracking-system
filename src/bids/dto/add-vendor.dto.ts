import { IsNotEmpty, IsUUID, IsOptional, IsString } from 'class-validator';

export class AddVendorDto {
  @IsNotEmpty()
  @IsUUID()
  vendorId: string;

  @IsOptional()
  @IsString()
  role?: string;
}
