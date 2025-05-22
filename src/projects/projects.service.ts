/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    const project = this.projectsRepository.create(createProjectDto);
    return this.projectsRepository.save(project);
  }

  findAll(query) {
    const queryBuilder = this.projectsRepository.createQueryBuilder('project');

    if (query.status) {
      queryBuilder.andWhere('project.status = :status', {
        status: query.status,
      });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: string) {
    const project = await this.projectsRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.findOne(id);
    Object.assign(project, updateProjectDto);
    return this.projectsRepository.save(project);
  }

  async remove(id: string) {
    const project = await this.findOne(id);
    return this.projectsRepository.remove(project);
  }

  async findProjectBids(id: string) {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: ['bids', 'bids.contractor', 'bids.estimator'],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project.bids;
  }
}
