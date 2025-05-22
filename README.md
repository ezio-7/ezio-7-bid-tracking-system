# Multi-Vendor Bid Tracking System

A Nest.js application for tracking multiple contractors and vendors bidding on projects, managing vendor relationships, assigning estimators, and comparing bids.

## Features

- Project Management: Create and track construction projects
- Contractor Management: Manage contractors and their bids
- Vendor Tracking: Associate multiple vendors with each bid
- Bid Comparison: Compare multiple bids for the same project
- Estimator Assignment: Assign estimators to evaluate bids
- Communication Tracking: Track all communications with contractors

## Tech Stack

- **Backend:** Nest.js + TypeScript
- **Database:** PostgreSQL
- **ORM:** TypeORM

## Prerequisites

- Node.js (v16+)
- npm
- PostgreSQL

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/ezio-7/ezio-7-bid-tracking-system.git
cd bid-tracking-system
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory with the following content:

```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=bidtracking
PORT=3000
```

### 4. Create a PostgreSQL database

Create a postgres db with the db name set in env file

## Running the Application

Running the Application

```BASH
npm run start:dev
```

## API Endpoints

### 1. Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get a specific project
- `POST /api/projects` - Create a new project
- `PATCH /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project
- `GET /api/projects/:id/bids` - Get all bids for a project

### 2. Contractors

- `GET /api/contractors` - Get all contractors
- `GET /api/contractors/:id` - Get a specific contractor
- `POST /api/contractors` - Create a new contractor
- `PATCH /api/contractors/:id` - Update a contractor
- `DELETE /api/contractors/:id` - Delete a contractor
- `GET /api/contractors/:id/bids` - Get all bids from a contractor
- `GET /api/contractors/:id/communications` - Get all communications with a contractor

### 3. Vendors

- `GET /api/vendors` - Get all vendors
- `GET /api/vendors/:id` - Get a specific vendor
- `POST /api/vendors` - Create a new vendor
- `PATCH /api/vendors/:id` - Update a vendor
- `DELETE /api/vendors/:id` - Delete a vendor
- `GET /api/vendors/:id/bids` - Get all bids associated with a vendor

### 4. Bids

- `GET /api/bids` - Get all bids
- `GET /api/bids/:id` - Get a specific bid
- `POST /api/bids` - Create a new bid
- `PATCH /api/bids/:id` - Update a bid
- `DELETE /api/bids/:id` - Delete a bid
- `POST /api/bids/:id/assign-estimator` - Assign an estimator to a bid
- `POST /api/bids/:id/add-vendor` - Add a vendor to a bid
- `DELETE /api/bids/:bidId/vendors/:vendorId` - Remove a vendor from a bid
- `GET /api/bids/compare/project/:projectId` - Compare all bids for a project

### 5. Estimators

- `GET /api/estimators` - Get all estimators
- `GET /api/estimators/:id` - Get a specific estimator
- `POST /api/estimators` - Create a new estimator
- `PATCH /api/estimators/:id` - Update an estimator
- `DELETE /api/estimators/:id` - Delete an estimator
- `GET /api/estimators/:id/assigned-bids` - Get all bids assigned to an estimator

### 6. Communications

- `GET /api/communications` - Get all communications
- `GET /api/communications/:id` - Get a specific communication
- `POST /api/communications` - Create a new communication
- `DELETE /api/communications/:id` - Delete a communication
- `GET /api/communications/contractor/:contractorId` - Get all communications with a contractor
- `GET /api/communications/project/:projectId` - Get all communications for a project
- `GET /api/communications/bid/:bidId` - Get all communications related to a bid
