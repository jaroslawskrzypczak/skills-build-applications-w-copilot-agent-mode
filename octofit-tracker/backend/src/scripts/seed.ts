import { connectDatabase, disconnectDatabase } from '../config/database.js';

/**
 * Database seeding script for OctoFit Tracker
 * 
 * This script initializes the database with sample data.
 * Run with: npm run seed
 */

const seedDatabase = async () => {
  try {
    await connectDatabase();
    
    console.log('🌱 Seeding database...');
    
    // TODO: Add seed data for users, teams, activities, leaderboard, and workouts
    
    console.log('✅ Database seeded successfully');
    await disconnectDatabase();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
