/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Communication } from './entities/communication.entity';
import { CreateCommunicationDto } from './dto/create-communication.dto';
import { ContractorsService } from '../contractors/contractors.service';
import { ProjectsService } from '../projects/projects.service';
import { BidsService } from '../bids/bids.service';

@Injectable()
export class CommunicationsService {
  constructor(
    @InjectRepository(Communication)
    private communicationsRepository: Repository<Communication>,
    private contractorsService: ContractorsService,
    private projectsService: ProjectsService,
    private bidsService: BidsService,
  ) {}

  async create(createCommunicationDto: CreateCommunicationDto) {
    const communication = new Communication();

    communication.subject = createCommunicationDto.subject;
    communication.content = createCommunicationDto.content;
    communication.communicationType = createCommunicationDto.communicationType;
    communication.emailId = createCommunicationDto.emailId || '';

    if (createCommunicationDto.contractorId) {
      communication.contractor = await this.contractorsService.findOne(
        createCommunicationDto.contractorId,
      );
    }

    if (createCommunicationDto.projectId) {
      communication.project = await this.projectsService.findOne(
        createCommunicationDto.projectId,
      );
    }

    if (createCommunicationDto.bidId) {
      communication.bid = await this.bidsService.findOne(
        createCommunicationDto.bidId,
      );
    }

    return this.communicationsRepository.save(communication);
  }

  findAll(query) {
    const queryBuilder = this.communicationsRepository
      .createQueryBuilder('communication')
      .leftJoinAndSelect('communication.contractor', 'contractor')
      .leftJoinAndSelect('communication.project', 'project')
      .leftJoinAndSelect('communication.bid', 'bid');

    if (query.communicationType) {
      queryBuilder.andWhere(
        'communication.communicationType = :communicationType',
        { communicationType: query.communicationType },
      );
    }

    if (query.startDate && query.endDate) {
      queryBuilder.andWhere(
        'communication.createdAt BETWEEN :startDate AND :endDate',
        {
          startDate: new Date(query.startDate),
          endDate: new Date(query.endDate),
        },
      );
    }

    return queryBuilder.orderBy('communication.createdAt', 'DESC').getMany();
  }

  async findOne(id: string) {
    const communication = await this.communicationsRepository.findOne({
      where: { id },
      relations: ['contractor', 'project', 'bid'],
    });

    if (!communication) {
      throw new NotFoundException(`Communication with ID ${id} not found`);
    }

    return communication;
  }

  async remove(id: string) {
    const communication = await this.findOne(id);
    return this.communicationsRepository.remove(communication);
  }

  async findByContractor(contractorId: string) {
    return this.communicationsRepository.find({
      where: { contractor: { id: contractorId } },
      relations: ['project', 'bid'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByProject(projectId: string) {
    return this.communicationsRepository.find({
      where: { project: { id: projectId } },
      relations: ['contractor', 'bid'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByBid(bidId: string) {
    return this.communicationsRepository.find({
      where: { bid: { id: bidId } },
      relations: ['contractor', 'project'],
      order: { createdAt: 'DESC' },
    });
  }
}
