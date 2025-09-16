# Architecture Documentation

## Multi-tenant System Design

### Overview
The system uses a database-per-tenant architecture, providing complete data isolation between different organizations.

### Components

#### Main Database
- Tenant information
- Global configurations
- Super admin accounts

#### Tenant Databases
- Created dynamically for each tenant
- Contains tenant-specific:
  - Travel requests
  - Admin users
  - Content management data

### Authentication & Authorization

#### JWT Authentication
- Token-based authentication
- Redis-based token blacklisting
- 24-hour token expiration

#### Authorization Levels
1. Super Admin
   - Can manage all tenants
   - Access to global configurations
2. Tenant Admin
   - Can manage their tenant's data
   - Access to tenant-specific admin panel
3. Regular Users
   - Can submit travel requests
   - View their own requests

### Database Schema

#### Tenants Table
```sql
CREATE TABLE tenants (
    id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
    subdomain VARCHAR UNIQUE NOT NULL,
    db_name VARCHAR UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);
```

#### Admin Users Table
```sql
CREATE TABLE admin_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    password_hash VARCHAR NOT NULL,
    tenant_id INTEGER REFERENCES tenants(id),
    is_superadmin BOOLEAN DEFAULT false
);
```

#### Travel Requests Table (Per Tenant)
```sql
CREATE TABLE travel_requests (
    id SERIAL PRIMARY KEY,
    destination VARCHAR NOT NULL,
    travel_date DATE NOT NULL,
    user_email VARCHAR NOT NULL,
    num_persons INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Security Measures

#### Database Isolation
- Each tenant's data is in a separate database
- No cross-tenant data access possible
- Automatic database creation on tenant signup

#### Request Handling
1. Request arrives with tenant header
2. Middleware identifies tenant
3. Request context updated with tenant info
4. Database connection switched to tenant's DB
5. Request processed with tenant context

#### Password Security
- Bcrypt password hashing
- Salted hashes
- Configurable work factor

### Background Tasks

#### Celery Tasks
- Email notifications
- Data aggregation
- Cleanup jobs

#### Redis Usage
- Token blacklist storage
- Task queue backend
- Caching layer

### Deployment Architecture

For detailed visual representations of the system architecture, including:
- High-Level System Architecture
- Multi-tenant Request Flow
- Authentication Flow
- Database Schema
- Background Task Flow
- Deployment Architecture

Please see [System Architecture Diagrams](./diagrams.md)

### Scalability Considerations

#### Horizontal Scaling
- Stateless API design
- Redis for shared state
- Load balancer ready

#### Database Scaling
- Read replicas per tenant
- Connection pooling
- Query optimization

#### Monitoring
- API endpoint metrics
- Database performance
- Background task status
