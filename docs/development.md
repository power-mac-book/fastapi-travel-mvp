# Development Guide

## Project Structure

```
smartgroup-travel-mvp/
├── app/
│   ├── api/
│   │   └── v1/
│   │       └── endpoints/
│   ├── core/
│   │   ├── security.py
│   │   ├── token.py
│   │   └── tenant_db.py
│   ├── models/
│   ├── schemas/
│   ├── services/
│   └── tests/
├── frontend/
│   ├── smartgroup-admin-react/
│   └── smartgroup-traveler-ui/
└── docs/
```

## Backend Development

### Creating New Endpoints

1. Add route in `app/api/v1/endpoints/`
2. Update router in `app/api/v1/router.py`
3. Create necessary schemas in `app/schemas/`
4. Implement service logic in `app/services/`

Example:
```python
# app/api/v1/endpoints/example.py
from fastapi import APIRouter, Depends
from app.schemas.example import ExampleSchema
from app.services.example import example_service

router = APIRouter()

@router.post("/", response_model=ExampleSchema)
def create_example(data: ExampleSchema):
    return example_service(data)
```

### Adding New Models

1. Create model in `app/models/`
2. Define schema in `app/schemas/`
3. Add relationships if needed
4. Update database initialization

Example:
```python
# app/models/example.py
from sqlalchemy import Column, Integer, String
from app.models.base import Base

class Example(Base):
    __tablename__ = "examples"
    id = Column(Integer, primary_key=True)
    name = Column(String)
```

### Testing

1. Write tests in `app/tests/`
2. Use pytest for testing
3. Mock external services

Example:
```python
# app/tests/test_example.py
import pytest
from app.services.example import example_service

def test_example():
    result = example_service()
    assert result is not None
```

## Frontend Development

### Admin Dashboard

#### Adding New Pages

1. Create component in `frontend/smartgroup-admin-react/src/components/`
2. Add route in `App.jsx`
3. Update navigation

Example:
```jsx
// components/NewPage.jsx
import React from 'react';

export const NewPage = () => {
  return <div>New Page Content</div>;
};
```

#### State Management

1. Use React Context for global state
2. Local state for component-specific data
3. Custom hooks for reusable logic

Example:
```jsx
// hooks/useData.js
import { useState, useEffect } from 'react';

export const useData = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Fetch data
  }, []);
  
  return { data };
};
```

### Traveler UI

#### Components

1. Create reusable components
2. Follow atomic design principles
3. Maintain consistent styling

Example:
```jsx
// components/Button.jsx
export const Button = ({ children, onClick }) => (
  <button 
    className="bg-blue-500 text-white px-4 py-2 rounded"
    onClick={onClick}
  >
    {children}
  </button>
);
```

## Best Practices

### Code Style

#### Python (Backend)
- Follow PEP 8
- Use type hints
- Document functions

#### JavaScript (Frontend)
- Use ESLint
- Follow Airbnb style guide
- Use TypeScript when possible

### Git Workflow

1. Create feature branch
2. Make changes
3. Write tests
4. Submit PR
5. Code review
6. Merge

### Commit Messages

Follow conventional commits:
```
feat: add new feature
fix: resolve bug
docs: update documentation
style: format code
refactor: restructure code
test: add tests
```

## Deployment

### Development
```bash
docker compose up
cd frontend/smartgroup-admin-react && npm run dev
cd frontend/smartgroup-traveler-ui && npm run dev
```

### Production
1. Build frontend
```bash
cd frontend/smartgroup-admin-react
npm run build
```

2. Deploy backend
```bash
docker compose -f docker-compose.prod.yml up -d
```

## Troubleshooting

### Common Issues

1. Database Connection
```bash
docker compose down
docker volume rm smartgroup-travel-mvp_postgres_data
docker compose up
```

2. Redis Connection
```bash
docker compose restart redis
```

3. Frontend Build
```bash
rm -rf node_modules
npm install
npm run build
```
