// src/bids/bids.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bid } from './entities/bid.entity';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import { ContractorsService } from '../contractors/contractors.service';
import { ProjectsService } from '../projects/projects.service';
import { EstimatorsService } from '../estimators/estimators.service';
import { VendorsService } from '../vendors/vendors.service';

@Injectable()
export class BidsService {
  constructor(
    @InjectRepository(Bid)
    private bidsRepository: Repository<Bid>,
    private contractorsService: ContractorsService,
    private projectsService: ProjectsService,
    private estimatorsService: EstimatorsService,
    private vendorsService: VendorsService,
  ) {}

  async create(createBidDto: CreateBidDto) {
    const bid = new Bid();
    
    if (createBidDto.projectId) {
      bid.project = await this.projectsService.findOne(createBidDto.projectId);
    }
    
    if (createBidDto.contractorId) {
      bid.contractor = await this.contractorsService.findOne(createBidDto.contractorId);
    }
    
    if (createBidDto.estimatorId) {
      bid.estimator = await this.estimatorsService.findOne(createBidDto.estimatorId);
    }
    
    bid.bidAmount = createBidDto.bidAmount || 0;
    bid.status = createBidDto.status || 'submitted';
    bid.submissionDate = createBidDto.submissionDate ? new Date(createBidDto.submissionDate) : new Date();
    bid.details = createBidDto.details;
    bid.notes = createBidDto.notes || '';
    
    return this.bidsRepository.save(bid);
  }

  findAll(query) {
    const queryBuilder = this.bidsRepository.createQueryBuilder('bid')
      .leftJoinAndSelect('bid.project', 'project')
      .leftJoinAndSelect('bid.contractor', 'contractor')
      .leftJoinAndSelect('bid.estimator', 'estimator')
      .leftJoinAndSelect('bid.vendors', 'vendors');
    
    if (query.projectId) {
      queryBuilder.andWhere('project.id = :projectId', { projectId: query.projectId });
    }
    
    if (query.contractorId) {
      queryBuilder.andWhere('contractor.id = :contractorId', { contractorId: query.contractorId });
    }
    
    if (query.status) {
      queryBuilder.andWhere('bid.status = :status', { status: query.status });
    }
    
    return queryBuilder.getMany();
  }

  async findOne(id: string) {
    const bid = await this.bidsRepository.findOne({
      where: { id },
      relations: ['project', 'contractor', 'estimator', 'vendors'],
    });
    
    if (!bid) {
      throw new NotFoundException(`Bid with ID ${id} not found`);
    }
    
    return bid;
  }

  async update(id: string, updateBidDto: UpdateBidDto) {
    const bid = await this.findOne(id);
    
    if (updateBidDto.projectId) {
      bid.project = await this.projectsService.findOne(updateBidDto.projectId);
    }
    
    if (updateBidDto.contractorId) {
      bid.contractor = await this.contractorsService.findOne(updateBidDto.contractorId);
    }
    
    if (updateBidDto.estimatorId) {
      bid.estimator = await this.estimatorsService.findOne(updateBidDto.estimatorId);
    }
    
    if (updateBidDto.bidAmount !== undefined) {
      bid.bidAmount = updateBidDto.bidAmount;
    }
    
    if (updateBidDto.status) {
      bid.status = updateBidDto.status;
    }
    
    if (updateBidDto.submissionDate) {
      bid.submissionDate = new Date(updateBidDto.submissionDate);
    }
    
    if (updateBidDto.details) {
      bid.details = updateBidDto.details;
    }
    
    if (updateBidDto.notes !== undefined) {
      bid.notes = updateBidDto.notes;
    }
    
    return this.bidsRepository.save(bid);
  }

  async remove(id: string) {
    const bid = await this.findOne(id);
    return this.bidsRepository.remove(bid);
  }

  async assignEstimator(bidId: string, estimatorId: string) {
    const bid = await this.findOne(bidId);
    const estimator = await this.estimatorsService.findOne(estimatorId);
    
    bid.estimator = estimator;
    return this.bidsRepository.save(bid);
  }

  async addVendor(bidId: string, vendorId: string, role?: string) {
    const bid = await this.findOne(bidId);
    const vendor = await this.vendorsService.findOne(vendorId);
    
    if (role) {
      vendor.role = role;
      await this.vendorsService.update(vendorId, { role });
    }
    
    if (!bid.vendors) {
      bid.vendors = [];
    }
    
    // Check if vendor is already associated with the bid
    const vendorExists = bid.vendors.some(v => v.id === vendor.id);
    if (!vendorExists) {
      bid.vendors.push(vendor);
    }
    
    return this.bidsRepository.save(bid);
  }

  async removeVendor(bidId: string, vendorId: string) {
    const bid = await this.findOne(bidId);
    
    if (!bid.vendors) {
      throw new NotFoundException('No vendors associated with this bid');
    }
    
    bid.vendors = bid.vendors.filter(vendor => vendor.id !== vendorId);
    return this.bidsRepository.save(bid);
  }

  async compareBidsForProject(projectId: string) {
    const bids = await this.bidsRepository.find({
      where: { project: { id: projectId } },
      relations: ['contractor', 'estimator', 'vendors'],
    });
    
    if (!bids.length) {
      throw new NotFoundException(`No bids found for project with ID ${projectId}`);
    }
    
    return {
      projectId,
      bidsCount: bids.length,
      bids: bids.map(bid => ({
        id: bid.id,
        amount: bid.bidAmount,
        status: bid.status,
        submissionDate: bid.submissionDate,
        contractor: bid.contractor ? {
          id: bid.contractor.id,
          name: bid.contractor.name,
          contactPerson: bid.contractor.contactPerson,
        } : null,
        estimator: bid.estimator ? {
          id: bid.estimator.id,
          name: bid.estimator.name,
        } : null,
        vendorsCount: bid.vendors ? bid.vendors.length : 0,
        vendors: bid.vendors ? bid.vendors.map(v => ({
          id: v.id,
          name: v.name,
          role: v.role,
        })) : [],
        details: bid.details,
      })),
    };
  }
}