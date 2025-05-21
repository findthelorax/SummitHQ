```
git init
git add .
git commit -m "Initial commit"

git remote add origin <repository-url>

git branch -M main
git push -u origin main
```

cd backend

Open Powershell as Admin
```
Get-ExecutionPolicy
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

install prisma

edit prisma/schema.prisma
```
npx prisma migrate dev --name init
```

This will:
    Create the necessary database tables.
    Track the migration history.

Generate the Prisma Client: Run the following command to generate the Prisma Client, which will allow you to interact with the database in your code.

```
npx prisma generate
```

```
npm run dev
```

### 4. **Centralize Error Handling**
Use a centralized error-handling middleware to avoid repetitive `try-catch` blocks in controllers. For example:
```typescript
import { Request, Response, NextFunction } from 'express';

export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
```

Use it in routes:
```typescript
app.get('/mountains', asyncHandler(controller.getMountains));
```

---

### 5. **Environment-Specific Configuration**
Use a library like `config` or `dotenv` to manage environment-specific configurations. Create a `config` folder with files like `default.json`, `development.json`, and `production.json`.

Example:
```json
{
    "db": {
        "host": "localhost",
        "port": 5432,
        "username": "postgres",
        "password": "postgres",
        "database": "mountain"
    },
    "server": {
        "port": 3000
    }
}
```

Access it in your code:
```typescript
import config from 'config';
const dbConfig = config.get('db');
```

---

### 6. **Use Dependency Injection**
Use a dependency injection library like `tsyringe` to manage dependencies like the database pool. This makes your app more testable and modular.

Example:
```typescript
import { container } from 'tsyringe';
import { Pool } from 'pg';

container.register<Pool>('DatabasePool', { useValue: new Pool() });
```

Inject it into controllers:
```typescript
import { inject, singleton } from 'tsyringe';

@singleton()
export class MountainController {
    constructor(@inject('DatabasePool') private pool: Pool) {}
}
```

---

### 7. **Document Your API**
Use tools like Swagger or Postman to document your API. Add a route to serve the Swagger UI:
```typescript
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
```

### **Proposed Folder Structure**
```
frontend/
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── service-worker.ts
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/          # Common components (e.g., buttons, modals)
│   │   ├── aidRooms/        # AidRoom-specific components
│   │   ├── lodges/          # Lodge-specific components
│   │   ├── lifts/           # Lift-specific components
│   │   ├── trails/          # Trail-specific components
│   ├── pages/               # Page-level components
│   │   ├── Home.tsx         # Home page
│   │   ├── AidRoomsPage.tsx # AidRooms page
│   │   ├── LodgesPage.tsx   # Lodges page
│   │   ├── LiftsPage.tsx    # Lifts page
│   │   ├── TrailsPage.tsx   # Trails page
│   ├── services/            # API service layer
│   │   ├── aidRoomsService.ts
│   │   ├── lodgesService.ts
│   │   ├── liftsService.ts
│   │   ├── trailsService.ts
│   ├── store/               # State management (Redux or Context API)
│   │   ├── aidRoomsSlice.ts
│   │   ├── lodgesSlice.ts
│   │   ├── liftsSlice.ts
│   │   ├── trailsSlice.ts
│   │   ├── store.ts
│   ├── types/               # TypeScript types and interfaces
│   │   ├── aidRooms.d.ts
│   │   ├── lodges.d.ts
│   │   ├── lifts.d.ts
│   │   ├── trails.d.ts
│   ├── utils/               # Utility functions
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   ├── App.tsx              # Main app component
│   ├── index.tsx            # Entry point
│   ├── routes.tsx           # Centralized route definitions
```

---

### **Details for Each Folder**

#### **1. `components/`**
- Contains reusable UI components.
- Subfolders like `aidRooms`, `lodges`, `lifts`, and `trails` hold components specific to those entities.
- Example:
  - `components/aidRooms/AidRoomCard.tsx`: A card component for displaying aid room details.
  - `components/common/Button.tsx`: A reusable button component.

#### **2. `pages/`**
- Contains page-level components for routing.
- Each page corresponds to a route in your app.
- Example:
  - `pages/AidRoomsPage.tsx`: Displays a list of aid rooms using components from `components/aidRooms/`.

#### **3. `services/`**
- Contains API service files for interacting with the backend.
- Each file corresponds to an entity.
- Example:
  ```typescript
  // services/aidRoomsService.ts
  import axios from 'axios';

  export const getAidRooms = async () => {
      const response = await axios.get('/api/aidRooms');
      return response.data;
  };
  ```

#### **4. `store/`**
- Contains state management logic (e.g., Redux slices or Context API).
- Each slice corresponds to an entity.
- Example:
  ```typescript
  // store/aidRoomsSlice.ts
  import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
  import { getAidRooms } from '../services/aidRoomsService';

  const aidRoomsSlice = createSlice({
      name: 'aidRooms',
      initialState: { data: [], loading: false },
      reducers: {},
      extraReducers: (builder) => {
          builder.addCase(fetchAidRooms.fulfilled, (state, action) => {
              state.data = action.payload;
          });
      },
  });

  export const fetchAidRooms = createAsyncThunk('aidRooms/fetch', getAidRooms);
  export default aidRoomsSlice.reducer;
  ```

#### **5. `types/`**
- Contains TypeScript types and interfaces for each entity.
- Example:
  ```typescript
  // types/aidRooms.d.ts
  export interface AidRoom {
      id: string;
      name: string;
      location: string;
  }
  ```

#### **6. `utils/`**
- Contains utility functions like formatters and validators.
- Example:
  ```typescript
  // utils/formatters.ts
  export const formatDate = (date: string) => new Date(date).toLocaleDateString();
  ```

---

### **Routing Example**
Centralize your routes in `routes.tsx`:
```typescript
// routes.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AidRoomsPage from './pages/AidRoomsPage';
import LodgesPage from './pages/LodgesPage';

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aid-rooms" element={<AidRoomsPage />} />
            <Route path="/lodges" element={<LodgesPage />} />
        </Routes>
    </Router>
);

export default AppRoutes;
```

// client
// {
// 	"files": [],
// 	"references": [{ "path": "./tsconfig.app.json" }, { "path": "./tsconfig.node.json" }],
// 	"compilerOptions": {
// 		"baseUrl": ".",
// 		"paths": {
// 			"@shared/types": ["../shared/types/index.ts"],
// 			"@shared/types/*": ["../shared/types/*"]
// 		}
// 	},
// }

// server
// {
//   "compilerOptions": {
//     "target": "ES2020",
//     "module": "commonjs",
//     "strict": true,
//     "esModuleInterop": true,
//     "skipLibCheck": true,
//     "forceConsistentCasingInFileNames": true,
//     "outDir": "./dist",
//     "rootDir": "./src",
//     "baseUrl": "../",
//     "paths": {
//       "@shared/*": ["../shared/types/*"]
//     }
//   },
//   "include": ["src/**/*.ts", "equipmentRoutes.ts"],
//   "exclude": ["node_modules", "**/*.spec.ts"]
// }
