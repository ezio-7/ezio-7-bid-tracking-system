// src/contractors/entities/contractor.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Bid } from '../../bids/entities/bid.entity';
import { Communication } from '../../communications/entities/communication.entity';

@Entity()
export class Contractor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  contactPerson: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  specialization: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Bid, bid => bid.contractor)
  bids: Bid[];

  @OneToMany(() => Communication, communication => communication.contractor)
  communications: Communication[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}