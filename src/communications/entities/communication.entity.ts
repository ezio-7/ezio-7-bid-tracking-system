// src/communications/entities/communication.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Contractor } from '../../contractors/entities/contractor.entity';
import { Project } from '../../projects/entities/project.entity';
import { Bid } from '../../bids/entities/bid.entity';

@Entity()
export class Communication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subject: string;

  @Column({ type: 'text' })
  content: string;

  @Column()
  communicationType: string; // email, phone, meeting, etc.

  @Column({ nullable: true })
  emailId: string; // Reference to the original email if applicable

  @ManyToOne(() => Contractor, contractor => contractor.communications)
  contractor: Contractor;

  @ManyToOne(() => Project, { nullable: true })
  project: Project;

  @ManyToOne(() => Bid, { nullable: true })
  bid: Bid;

  @CreateDateColumn()
  createdAt: Date;
}