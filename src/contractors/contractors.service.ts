/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contractor } from './entities/contractor.entity';
import { CreateContractorDto } from './dto/create-contractor.dto';
import { UpdateContractorDto } from './dto/update-contractor.dto';

@Injectable()
export class ContractorsService {
  constructor(
    @InjectRepository(Contractor)
    private contractorsRepository: Repository<Contractor>,
  ) {}

  create(createContractorDto: CreateContractorDto) {
    const contractor = this.contractorsRepository.create(createContractorDto);
    return this.contractorsRepository.save(contractor);
  }

  findAll(query) {
    const queryBuilder =
      this.contractorsRepository.createQueryBuilder('contractor');

    if (query.isActive !== undefined) {
      queryBuilder.andWhere('contractor.isActive = :isActive', {
        isActive: query.isActive === 'true',
      });
    }

    if (query.specialization) {
      queryBuilder.andWhere('contractor.specialization = :specialization', {
        specialization: query.specialization,
      });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: string) {
    const contractor = await this.contractorsRepository.findOne({
      where: { id },
    });
    if (!contractor) {
      throw new NotFoundException(`Contractor with ID ${id} not found`);
    }
    return contractor;
  }

  async update(id: string, updateContractorDto: UpdateContractorDto) {
    const contractor = await this.findOne(id);
    Object.assign(contractor, updateContractorDto);
    return this.contractorsRepository.save(contractor);
  }

  async remove(id: string) {
    const contractor = await this.findOne(id);
    return this.contractorsRepository.remove(contractor);
  }

  async findContractorBids(id: string) {
    const contractor = await this.contractorsRepository.findOne({
      where: { id },
      relations: ['bids', 'bids.project', 'bids.estimator'],
    });

    if (!contractor) {
      throw new NotFoundException(`Contractor with ID ${id} not found`);
    }

    return contractor.bids;
  }

  async findContractorCommunications(id: string) {
    const contractor = await this.contractorsRepository.findOne({
      where: { id },
      relations: [
        'communications',
        'communications.project',
        'communications.bid',
      ],
    });

    if (!contractor) {
      throw new NotFoundException(`Contractor with ID ${id} not found`);
    }

    return contractor.communications;
  }
}
