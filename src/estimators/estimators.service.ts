// src/estimators/estimators.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estimator } from './entities/estimator.entity';
import { CreateEstimatorDto } from './dto/create-estimator.dto';
import { UpdateEstimatorDto } from './dto/update-estimator.dto';

@Injectable()
export class EstimatorsService {
  constructor(
    @InjectRepository(Estimator)
    private estimatorsRepository: Repository<Estimator>,
  ) {}

  create(createEstimatorDto: CreateEstimatorDto) {
    const estimator = this.estimatorsRepository.create(createEstimatorDto);
    return this.estimatorsRepository.save(estimator);
  }

  findAll(query) {
    const queryBuilder = this.estimatorsRepository.createQueryBuilder('estimator');
    
    if (query.isActive !== undefined) {
      queryBuilder.andWhere('estimator.isActive = :isActive', { isActive: query.isActive === 'true' });
    }
    
    if (query.specialization) {
      queryBuilder.andWhere('estimator.specialization = :specialization', { specialization: query.specialization });
    }
    
    return queryBuilder.getMany();
  }

  async findOne(id: string) {
    const estimator = await this.estimatorsRepository.findOne({ where: { id } });
    if (!estimator) {
      throw new NotFoundException(`Estimator with ID ${id} not found`);
    }
    return estimator;
  }

  async update(id: string, updateEstimatorDto: UpdateEstimatorDto) {
    const estimator = await this.findOne(id);
    Object.assign(estimator, updateEstimatorDto);
    return this.estimatorsRepository.save(estimator);
  }

  async remove(id: string) {
    const estimator = await this.findOne(id);
    return this.estimatorsRepository.remove(estimator);
  }

  async findAssignedBids(id: string) {
    const estimator = await this.estimatorsRepository.findOne({
      where: { id },
      relations: ['assignedBids', 'assignedBids.project', 'assignedBids.contractor'],
    });
    
    if (!estimator) {
      throw new NotFoundException(`Estimator with ID ${id} not found`);
    }
    
    return estimator.assignedBids;
  }
}