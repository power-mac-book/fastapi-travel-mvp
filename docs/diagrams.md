# System Architecture Diagrams

## High-Level System Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        B[Browser]
        A[Admin Dashboard]
        T[Traveler UI]
    end

    subgraph "Load Balancer"
        LB[Nginx Reverse Proxy]
    end

    subgraph "Application Layer"
        API[FastAPI Backend]
        Static[Static Files]
        Workers[Celery Workers]
    end

    subgraph "Data Layer"
        RD[(Redis Cache)]
        subgraph "PostgreSQL Databases"
            MD[(Main DB)]
            T1[(Tenant 1 DB)]
            T2[(Tenant 2 DB)]
            T3[(Tenant n DB)]
        end
    end

    B --> LB
    A --> LB
    T --> LB
    LB --> API
    LB --> Static
    API --> RD
    API --> MD
    API --> T1
    API --> T2
    API --> T3
    API --> Workers
    Workers --> RD
```

## Multi-tenant Request Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant LB as Load Balancer
    participant M as Middleware
    participant A as API
    participant R as Redis
    participant D as Database

    C->>LB: Request with X-Tenant-ID
    LB->>M: Forward Request
    M->>R: Check Token
    R-->>M: Token Valid
    M->>D: Switch to Tenant DB
    M->>A: Forward Request
    A->>D: Query Data
    D-->>A: Return Data
    A-->>C: Response
```

## Authentication Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant A as Auth API
    participant S as Security
    participant R as Redis
    participant D as Database

    C->>A: Login Request
    A->>D: Verify Credentials
    D-->>A: User Found
    A->>S: Generate JWT
    S-->>A: JWT Token
    A->>R: Store Token Info
    A-->>C: Return Token

    C->>A: Request with Token
    A->>R: Validate Token
    R-->>A: Token Valid
    A-->>C: Response

    C->>A: Logout Request
    A->>R: Blacklist Token
    A-->>C: Logout Success
```

## Database Schema

```mermaid
erDiagram
    TENANTS ||--o{ ADMIN_USERS : has
    TENANTS {
        int id PK
        string name
        string subdomain
        string db_name
        boolean is_active
        datetime created_at
        datetime updated_at
    }
    ADMIN_USERS {
        int id PK
        string email
        string password_hash
        int tenant_id FK
        boolean is_superadmin
    }
    TRAVEL_REQUESTS {
        int id PK
        string destination
        date travel_date
        string user_email
        int num_persons
        datetime created_at
    }
```

## Background Task Flow

```mermaid
graph LR
    subgraph "Application"
        A[API] --> C[Celery]
        C --> W1[Worker 1]
        C --> W2[Worker 2]
        C --> W3[Worker n]
    end

    subgraph "Services"
        W1 --> E[Email Service]
        W2 --> S[Storage Service]
        W3 --> O[Other Services]
    end

    subgraph "Message Broker"
        R[(Redis)]
    end

    C --> R
    R --> W1
    R --> W2
    R --> W3
```

## Deployment Architecture

```mermaid
graph TB
    subgraph "Production Environment"
        LB[Load Balancer] --> API1[API Server 1]
        LB --> API2[API Server 2]
        LB --> API3[API Server n]
        
        API1 --> Redis[(Redis Cluster)]
        API2 --> Redis
        API3 --> Redis
        
        API1 --> DB[(PostgreSQL)]
        API2 --> DB
        API3 --> DB
        
        W1[Worker 1] --> Redis
        W2[Worker 2] --> Redis
        W3[Worker n] --> Redis
    end

    subgraph "Monitoring"
        M[Metrics Collector]
        L[Log Aggregator]
    end

    API1 --> M
    API2 --> M
    API3 --> M
    API1 --> L
    API2 --> L
    API3 --> L
```
