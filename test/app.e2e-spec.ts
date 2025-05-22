/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../src/projects/entities/project.entity';
import { Contractor } from '../src/contractors/entities/contractor.entity';
import { Vendor } from '../src/vendors/entities/vendor.entity';
import { Estimator } from '../src/estimators/entities/estimator.entity';
import { Bid } from '../src/bids/entities/bid.entity';
import { Communication } from '../src/communications/entities/communication.entity';

describe('BidTrackingSystem (e2e)', () => {
  let app: INestApplication;
  let projectRepository: Repository<Project>;
  let contractorRepository: Repository<Contractor>;
  let vendorRepository: Repository<Vendor>;
  let estimatorRepository: Repository<Estimator>;
  let bidRepository: Repository<Bid>;
  let communicationRepository: Repository<Communication>;

  let projectId: string;
  let contractorId: string;
  let vendorId: string;
  let estimatorId: string;
  let bidId: string;
  let communicationId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    projectRepository = moduleFixture.get<Repository<Project>>(
      getRepositoryToken(Project),
    );
    contractorRepository = moduleFixture.get<Repository<Contractor>>(
      getRepositoryToken(Contractor),
    );
    vendorRepository = moduleFixture.get<Repository<Vendor>>(
      getRepositoryToken(Vendor),
    );
    estimatorRepository = moduleFixture.get<Repository<Estimator>>(
      getRepositoryToken(Estimator),
    );
    bidRepository = moduleFixture.get<Repository<Bid>>(getRepositoryToken(Bid));
    communicationRepository = moduleFixture.get<Repository<Communication>>(
      getRepositoryToken(Communication),
    );

    await communicationRepository.clear();
    await bidRepository.clear();
    await estimatorRepository.clear();
    await vendorRepository.clear();
    await contractorRepository.clear();
    await projectRepository.clear();

    await app.init();
  });

  afterAll(async () => {
    await communicationRepository.clear();
    await bidRepository.clear();
    await estimatorRepository.clear();
    await vendorRepository.clear();
    await contractorRepository.clear();
    await projectRepository.clear();

    await app.close();
  });

  describe('Projects', () => {
    it('should create a new project', async () => {
      const projectData = {
        name: 'Office Building Renovation',
        description: 'Complete renovation of a 3-story office building',
        location: '123 Main St, City',
        budget: 1500000,
        startDate: '2023-06-01',
        endDate: '2023-12-31',
      };

      const response = await request(app.getHttpServer())
        .post('/api/projects')
        .send(projectData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(projectData.name);
      projectId = response.body.id;
    });

    it('should get all projects', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/projects')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should get a project by ID', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/projects/${projectId}`)
        .expect(200);

      expect(response.body.id).toBe(projectId);
    });

    it('should update a project', async () => {
      const updateData = {
        budget: 1650000,
        status: 'in-progress',
      };

      const response = await request(app.getHttpServer())
        .patch(`/api/projects/${projectId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.budget).toBe(updateData.budget);
      expect(response.body.status).toBe(updateData.status);
    });
  });

  describe('Contractors', () => {
    it('should create a new contractor', async () => {
      const contractorData = {
        name: 'ABC Construction',
        contactPerson: 'John Smith',
        email: 'john@abcconstruction.com',
        phone: '+1-555-123-4567',
        address: '456 Builder Ave, City',
        specialization: 'Commercial Renovation',
      };

      const response = await request(app.getHttpServer())
        .post('/api/contractors')
        .send(contractorData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(contractorData.name);
      contractorId = response.body.id;
    });

    it('should get all contractors', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/contractors')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should get a contractor by ID', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/contractors/${contractorId}`)
        .expect(200);

      expect(response.body.id).toBe(contractorId);
    });

    it('should update a contractor', async () => {
      const updateData = {
        contactPerson: 'John Smith Jr.',
        phone: '+1-555-987-6543',
      };

      const response = await request(app.getHttpServer())
        .patch(`/api/contractors/${contractorId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.contactPerson).toBe(updateData.contactPerson);
      expect(response.body.phone).toBe(updateData.phone);
    });
  });

  describe('Vendors', () => {
    it('should create a new vendor', async () => {
      const vendorData = {
        name: 'XYZ Supplies',
        contactPerson: 'Jane Doe',
        email: 'jane@xyzsupplies.com',
        phone: '+1-555-987-6543',
        serviceType: 'Building Materials',
      };

      const response = await request(app.getHttpServer())
        .post('/api/vendors')
        .send(vendorData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(vendorData.name);
      vendorId = response.body.id;
    });

    it('should get all vendors', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/vendors')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should get a vendor by ID', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/vendors/${vendorId}`)
        .expect(200);

      expect(response.body.id).toBe(vendorId);
    });

    it('should update a vendor', async () => {
      const updateData = {
        contactPerson: 'Jane Smith',
        serviceType: 'Premium Building Materials',
      };

      const response = await request(app.getHttpServer())
        .patch(`/api/vendors/${vendorId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.contactPerson).toBe(updateData.contactPerson);
      expect(response.body.serviceType).toBe(updateData.serviceType);
    });
  });

  describe('Estimators', () => {
    it('should create a new estimator', async () => {
      const estimatorData = {
        name: 'Mike Johnson',
        email: 'mike@estimators.com',
        phone: '+1-555-555-5555',
        specialization: 'Commercial Projects',
      };

      const response = await request(app.getHttpServer())
        .post('/api/estimators')
        .send(estimatorData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(estimatorData.name);
      estimatorId = response.body.id;
    });

    it('should get all estimators', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/estimators')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should get an estimator by ID', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/estimators/${estimatorId}`)
        .expect(200);

      expect(response.body.id).toBe(estimatorId);
    });

    it('should update an estimator', async () => {
      const updateData = {
        specialization: 'Commercial and Industrial Projects',
        phone: '+1-555-444-3333',
      };

      const response = await request(app.getHttpServer())
        .patch(`/api/estimators/${estimatorId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.specialization).toBe(updateData.specialization);
      expect(response.body.phone).toBe(updateData.phone);
    });
  });

  describe('Bids', () => {
    it('should create a new bid', async () => {
      const bidData = {
        projectId: projectId,
        contractorId: contractorId,
        bidAmount: 1450000,
        status: 'submitted',
        submissionDate: '2023-05-15',
        notes: 'Includes all materials and labor',
      };

      const response = await request(app.getHttpServer())
        .post('/api/bids')
        .send(bidData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.bidAmount).toBe(bidData.bidAmount);
      bidId = response.body.id;
    });

    it('should get all bids', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/bids')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should get a bid by ID', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/bids/${bidId}`)
        .expect(200);

      expect(response.body.id).toBe(bidId);
    });

    it('should update a bid', async () => {
      const updateData = {
        bidAmount: 1425000,
        status: 'under-review',
        notes: 'Updated bid with more competitive pricing',
      };

      const response = await request(app.getHttpServer())
        .patch(`/api/bids/${bidId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.bidAmount).toBe(updateData.bidAmount);
      expect(response.body.status).toBe(updateData.status);
      expect(response.body.notes).toBe(updateData.notes);
    });

    it('should assign an estimator to a bid', async () => {
      const assignData = {
        estimatorId: estimatorId,
      };

      const response = await request(app.getHttpServer())
        .post(`/api/bids/${bidId}/assign-estimator`)
        .send(assignData)
        .expect(200);

      expect(response.body.estimator).toBeDefined();
      expect(response.body.estimator.id).toBe(estimatorId);
    });

    it('should add a vendor to a bid', async () => {
      const vendorData = {
        vendorId: vendorId,
        role: 'Material Supplier',
      };

      const response = await request(app.getHttpServer())
        .post(`/api/bids/${bidId}/add-vendor`)
        .send(vendorData)
        .expect(200);

      expect(response.body.vendors).toBeDefined();
      expect(response.body.vendors.some((v) => v.id === vendorId)).toBe(true);
    });

    it('should get project bids comparison', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/bids/compare/project/${projectId}`)
        .expect(200);

      expect(response.body.projectId).toBe(projectId);
      expect(response.body.bids).toBeDefined();
      expect(Array.isArray(response.body.bids)).toBe(true);
    });

    it('should remove a vendor from a bid', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/api/bids/${bidId}/vendors/${vendorId}`)
        .expect(200);

      expect(response.body.vendors).toBeDefined();
      expect(response.body.vendors.some((v) => v.id === vendorId)).toBe(false);
    });
  });

  describe('Communications', () => {
    it('should create a new communication', async () => {
      const communicationData = {
        subject: 'Bid Clarification',
        content: 'We need additional details on the proposed timeline',
        communicationType: 'email',
        contractorId: contractorId,
        projectId: projectId,
        bidId: bidId,
      };

      const response = await request(app.getHttpServer())
        .post('/api/communications')
        .send(communicationData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.subject).toBe(communicationData.subject);
      communicationId = response.body.id;
    });

    it('should get all communications', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/communications')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should get a communication by ID', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/communications/${communicationId}`)
        .expect(200);

      expect(response.body.id).toBe(communicationId);
    });

    it('should get communications by contractor', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/communications/contractor/${contractorId}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should get communications by project', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/communications/project/${projectId}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should get communications by bid', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/communications/bid/${bidId}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('Delete Operations', () => {
    it('should delete a communication', async () => {
      await request(app.getHttpServer())
        .delete(`/api/communications/${communicationId}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/api/communications/${communicationId}`)
        .expect(404);
    });

    it('should delete a bid', async () => {
      await request(app.getHttpServer())
        .delete(`/api/bids/${bidId}`)
        .expect(200);

      await request(app.getHttpServer()).get(`/api/bids/${bidId}`).expect(404);
    });

    it('should delete an estimator', async () => {
      await request(app.getHttpServer())
        .delete(`/api/estimators/${estimatorId}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/api/estimators/${estimatorId}`)
        .expect(404);
    });

    it('should delete a vendor', async () => {
      await request(app.getHttpServer())
        .delete(`/api/vendors/${vendorId}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/api/vendors/${vendorId}`)
        .expect(404);
    });

    it('should delete a contractor', async () => {
      await request(app.getHttpServer())
        .delete(`/api/contractors/${contractorId}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/api/contractors/${contractorId}`)
        .expect(404);
    });

    it('should delete a project', async () => {
      await request(app.getHttpServer())
        .delete(`/api/projects/${projectId}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/api/projects/${projectId}`)
        .expect(404);
    });
  });

  describe('Error Handling', () => {
    it('should return 400 for invalid project data', async () => {
      const invalidData = {
        description: 'Incomplete data',
      };

      await request(app.getHttpServer())
        .post('/api/projects')
        .send(invalidData)
        .expect(400);
    });

    it('should return 404 for non-existent resource', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';

      await request(app.getHttpServer())
        .get(`/api/projects/${nonExistentId}`)
        .expect(404);
    });
  });
});
