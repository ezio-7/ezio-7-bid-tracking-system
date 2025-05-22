// src/bids/entities/bid.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { Contractor } from '../../contractors/entities/contractor.entity';
import { Vendor } from '../../vendors/entities/vendor.entity';
import { Estimator } from '../../estimators/entities/estimator.entity';

@Entity()
export class Bid {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  bidAmount: number;

  @Column({ default: 'submitted' })
  status: string;

  @Column({ nullable: true })
  submissionDate: Date;

  @ManyToOne(() => Project, project => project.bids)
  project: Project;

  @ManyToOne(() => Contractor, contractor => contractor.bids)
  contractor: Contractor;

  @ManyToOne(() => Estimator, estimator => estimator.assignedBids, { nullable: true })
  estimator: Estimator;

  @ManyToMany(() => Vendor, vendor => vendor.bids)
  @JoinTable()
  vendors: Vendor[];

  @Column({ type: 'json', nullable: true })
  details: any;

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}