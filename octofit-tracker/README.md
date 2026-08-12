# OctoFit Tracker

A modern multi-tier fitness tracking application built with React, Express, and MongoDB.

## Project Structure

```
octofit-tracker/
├── frontend/        # React 19 + Vite (Port 5173)
├── backend/         # Node.js + Express + TypeScript (Port 8000)
└── README.md
```

## Technology Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Port**: 5173

### Backend
- **Node.js** - Runtime
- **Express.js** - API framework
- **TypeScript** - Type safety
- **Mongoose** - MongoDB data access
- **Port**: 8000

### Database
- **MongoDB** - Document database
- **Port**: 27017

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB (v5.0 or higher)

## Installation

### Frontend Setup

```bash
cd octofit-tracker/frontend
npm install
```

### Backend Setup

```bash
cd octofit-tracker/backend
npm install
```

## Running the Application

### Start MongoDB

```bash
# If using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or use your local MongoDB installation
```

### Start Backend Server

```bash
cd octofit-tracker/backend
npm run dev
```

The backend will be available at: `http://localhost:8000`
- Health check: `http://localhost:8000/api/health`

### Start Frontend Development Server

```bash
cd octofit-tracker/frontend
npm run dev
```

The frontend will be available at: `http://localhost:5173`

## Available Scripts

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production build
- `npm run seed` - Seed the database with initial data
- `npm run lint` - Run ESLint

## Environment Configuration

### Backend (.env)

```env
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/octofit-tracker
MONGODB_PORT=27017
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:8000/api
```

## Database Seeding

To seed the database with initial data:

```bash
cd octofit-tracker/backend
npm run seed
```

## API Health Check

Once the backend is running, test the API:

```bash
curl http://localhost:8000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "OctoFit Tracker Backend is running"
}
```

## Development Workflow

1. Ensure MongoDB is running on port 27017
2. Start the backend server (port 8000)
3. Start the frontend dev server (port 5173)
4. Open `http://localhost:5173` in your browser
5. Frontend will communicate with backend at `http://localhost:8000/api`

## License

MIT
