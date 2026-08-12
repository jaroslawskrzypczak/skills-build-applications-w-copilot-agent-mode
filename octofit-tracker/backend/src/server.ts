import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database.js';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Codespaces-aware API URL
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const apiBaseUrl = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'OctoFit Tracker Backend is running',
    apiUrl: apiBaseUrl
  });
});

// API Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on ${apiBaseUrl}`);
      console.log(`📝 API available at ${apiBaseUrl}/api`);
      console.log(`
API Endpoints:
  - GET  ${apiBaseUrl}/api/health
  - GET  ${apiBaseUrl}/api/users
  - GET  ${apiBaseUrl}/api/teams
  - GET  ${apiBaseUrl}/api/activities
  - GET  ${apiBaseUrl}/api/leaderboard
  - GET  ${apiBaseUrl}/api/workouts
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Export for testing
export { app, startServer };

// Start server
startServer();
