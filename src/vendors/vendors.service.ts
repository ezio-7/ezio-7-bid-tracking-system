/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from './entities/vendor.entity';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor)
    private vendorsRepository: Repository<Vendor>,
  ) {}

  create(createVendorDto: CreateVendorDto) {
    const vendor = this.vendorsRepository.create(createVendorDto);
    return this.vendorsRepository.save(vendor);
  }

  findAll(query) {
    const queryBuilder = this.vendorsRepository.createQueryBuilder('vendor');

    if (query.isActive !== undefined) {
      queryBuilder.andWhere('vendor.isActive = :isActive', {
        isActive: query.isActive === 'true',
      });
    }

    if (query.serviceType) {
      queryBuilder.andWhere('vendor.serviceType = :serviceType', {
        serviceType: query.serviceType,
      });
    }

    if (query.role) {
      queryBuilder.andWhere('vendor.role = :role', { role: query.role });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: string) {
    const vendor = await this.vendorsRepository.findOne({ where: { id } });
    if (!vendor) {
      throw new NotFoundException(`Vendor with ID ${id} not found`);
    }
    return vendor;
  }

  async update(id: string, updateVendorDto: UpdateVendorDto) {
    const vendor = await this.findOne(id);
    Object.assign(vendor, updateVendorDto);
    return this.vendorsRepository.save(vendor);
  }

  async remove(id: string) {
    const vendor = await this.findOne(id);
    return this.vendorsRepository.remove(vendor);
  }

  async findVendorBids(id: string) {
    const vendor = await this.vendorsRepository.findOne({
      where: { id },
      relations: ['bids', 'bids.project', 'bids.contractor'],
    });

    if (!vendor) {
      throw new NotFoundException(`Vendor with ID ${id} not found`);
    }

    return vendor.bids;
  }
}
