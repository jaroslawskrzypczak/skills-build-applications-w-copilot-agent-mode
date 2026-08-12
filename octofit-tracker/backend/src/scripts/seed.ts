import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { User } from '../models/User.js';
import { Activity } from '../models/Activity.js';
import { Team } from '../models/Team.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Workout } from '../models/Workout.js';

/**
 * Database seeding script for OctoFit Tracker
 * 
 * Seed the octofit_db database with test data
 * This script initializes the database with sample users, activities, teams, leaderboard entries, and workouts.
 * Run with: npm run seed
 */

const seedDatabase = async () => {
  try {
    await connectDatabase();
    
    console.log('🌱 Seeding database...');
    
    // Clear existing data
    await User.deleteMany({});
    await Activity.deleteMany({});
    await Team.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('🗑️  Cleared existing data');
    
    // Create sample users
    const users = await User.insertMany([
      {
        email: 'alice@example.com',
        username: 'alice_runner',
        password: 'hashed_password_1',
        firstName: 'Alice',
        lastName: 'Johnson',
        bio: 'Marathon enthusiast',
        avatar: 'https://api.example.com/avatars/alice.jpg'
      },
      {
        email: 'bob@example.com',
        username: 'bob_cyclist',
        password: 'hashed_password_2',
        firstName: 'Bob',
        lastName: 'Smith',
        bio: 'Cycling lover',
        avatar: 'https://api.example.com/avatars/bob.jpg'
      },
      {
        email: 'charlie@example.com',
        username: 'charlie_swimmer',
        password: 'hashed_password_3',
        firstName: 'Charlie',
        lastName: 'Williams',
        bio: 'Competitive swimmer',
        avatar: 'https://api.example.com/avatars/charlie.jpg'
      },
      {
        email: 'diana@example.com',
        username: 'diana_yogi',
        password: 'hashed_password_4',
        firstName: 'Diana',
        lastName: 'Brown',
        bio: 'Yoga and pilates instructor',
        avatar: 'https://api.example.com/avatars/diana.jpg'
      }
    ]);
    console.log(`✅ Created ${users.length} users`);
    
    // Create sample activities
    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Running',
        duration: 45,
        distance: 8.5,
        calories: 650,
        date: new Date('2024-08-10'),
        notes: 'Morning run in the park'
      },
      {
        userId: users[0]._id,
        type: 'Running',
        duration: 60,
        distance: 10,
        calories: 800,
        date: new Date('2024-08-11'),
        notes: 'Long run training'
      },
      {
        userId: users[1]._id,
        type: 'Cycling',
        duration: 90,
        distance: 35,
        calories: 900,
        date: new Date('2024-08-10'),
        notes: 'Mountain biking trail'
      },
      {
        userId: users[1]._id,
        type: 'Cycling',
        duration: 60,
        distance: 25,
        calories: 700,
        date: new Date('2024-08-11'),
        notes: 'Road cycling'
      },
      {
        userId: users[2]._id,
        type: 'Swimming',
        duration: 45,
        distance: 2.5,
        calories: 550,
        date: new Date('2024-08-10'),
        notes: 'Freestyle laps'
      },
      {
        userId: users[3]._id,
        type: 'Yoga',
        duration: 60,
        calories: 300,
        date: new Date('2024-08-11'),
        notes: 'Morning yoga session'
      }
    ]);
    console.log(`✅ Created ${activities.length} activities`);
    
    // Create sample workouts
    const workouts = await Workout.insertMany([
      {
        name: 'Beginner Running Program',
        description: 'A gentle introduction to running for beginners',
        difficulty: 'beginner',
        duration: 30,
        exercises: [
          { name: 'Warm-up Jog', duration: 5 },
          { name: 'Running', duration: 20 },
          { name: 'Cool-down Walk', duration: 5 }
        ]
      },
      {
        name: 'Intermediate HIIT Workout',
        description: 'High-intensity interval training session',
        difficulty: 'intermediate',
        duration: 20,
        exercises: [
          { name: 'Burpees', sets: 3, reps: 10 },
          { name: 'Mountain Climbers', sets: 3, reps: 15 },
          { name: 'Jump Squats', sets: 3, reps: 12 },
          { name: 'Push-ups', sets: 3, reps: 10 }
        ]
      },
      {
        name: 'Advanced Strength Training',
        description: 'Intensive weight training program',
        difficulty: 'advanced',
        duration: 60,
        exercises: [
          { name: 'Squats', sets: 4, reps: 8 },
          { name: 'Deadlifts', sets: 3, reps: 5 },
          { name: 'Bench Press', sets: 4, reps: 8 },
          { name: 'Pull-ups', sets: 3, reps: 8 }
        ]
      },
      {
        name: 'Relaxing Yoga Flow',
        description: 'Gentle yoga session for relaxation',
        difficulty: 'beginner',
        duration: 45,
        exercises: [
          { name: 'Child\'s Pose', duration: 2 },
          { name: 'Cat-Cow Stretch', duration: 3 },
          { name: 'Downward Dog', duration: 2 },
          { name: 'Warrior Poses', duration: 20 },
          { name: 'Savasana', duration: 15 }
        ]
      }
    ]);
    console.log(`✅ Created ${workouts.length} workouts`);
    
    // Create sample teams
    const teams = await Team.insertMany([
      {
        name: 'Running Enthusiasts',
        description: 'A team for runners of all levels',
        leader: users[0]._id,
        members: [users[0]._id, users[2]._id]
      },
      {
        name: 'Cycling Club',
        description: 'Mountain and road cycling adventures',
        leader: users[1]._id,
        members: [users[1]._id, users[3]._id]
      },
      {
        name: 'Fitness Warriors',
        description: 'Dedicated to comprehensive fitness',
        leader: users[0]._id,
        members: [users[0]._id, users[1]._id, users[2]._id, users[3]._id]
      }
    ]);
    console.log(`✅ Created ${teams.length} teams`);
    
    // Create leaderboard entries
    const leaderboardEntries = await Leaderboard.insertMany([
      {
        userId: users[0]._id,
        points: 1450,
        rank: 1,
        totalActivities: 10
      },
      {
        userId: users[1]._id,
        points: 1200,
        rank: 2,
        totalActivities: 8
      },
      {
        userId: users[2]._id,
        points: 950,
        rank: 3,
        totalActivities: 7
      },
      {
        userId: users[3]._id,
        points: 800,
        rank: 4,
        totalActivities: 5
      }
    ]);
    console.log(`✅ Created ${leaderboardEntries.length} leaderboard entries`);
    
    console.log('✅ Database seeded successfully');
    await disconnectDatabase();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
