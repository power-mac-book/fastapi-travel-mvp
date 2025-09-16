# API Documentation

## Authentication

### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
    "email": "admin@example.com",
    "password": "secure-password"
}
```

Response:
```json
{
    "access_token": "eyJ0eXAi...",
    "token_type": "bearer"
}
```

### Logout
```http
POST /api/v1/auth/logout
Authorization: Bearer <token>
```

Response:
```json
{
    "message": "Successfully logged out"
}
```

## Tenant Management

### Create Tenant
```http
POST /api/v1/tenants
Content-Type: application/json

{
    "name": "Example Corp",
    "subdomain": "example-corp",
    "admin_email": "admin@example.com",
    "admin_password": "secure-password"
}
```

### List Tenants
```http
GET /api/v1/tenants
Authorization: Bearer <token>
```

### Get Tenant Details
```http
GET /api/v1/tenants/{subdomain}
Authorization: Bearer <token>
```

## Travel Management

### Submit Travel Request
```http
POST /api/v1/travel
Content-Type: application/json

{
    "destination": "Paris",
    "travel_date": "2025-12-25",
    "num_persons": 2,
    "user_email": "traveler@example.com"
}
```

### List Travel Requests
```http
GET /api/v1/travel?page=1&limit=10
Authorization: Bearer <token>
X-Tenant-ID: example-corp
```

### Get Grouped Travel Requests
```http
GET /api/v1/travel/grouped
Authorization: Bearer <token>
X-Tenant-ID: example-corp
```

## Error Responses

### 401 Unauthorized
```json
{
    "detail": "Could not validate credentials"
}
```

### 403 Forbidden
```json
{
    "detail": "Tenant is inactive"
}
```

### 404 Not Found
```json
{
    "detail": "Resource not found"
}
```
