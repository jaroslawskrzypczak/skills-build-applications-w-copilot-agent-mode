import { Router, Request, Response } from 'express';
import { Leaderboard } from '../models/Leaderboard.js';

const router = Router();

// GET leaderboard
router.get('/', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find()
      .sort({ rank: 1 })
      .populate('userId')
      .limit(100);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// GET leaderboard entry for user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findOne({ userId: req.params.userId }).populate('userId');
    if (!entry) {
      res.status(404).json({ error: 'User not found on leaderboard' });
      return;
    }
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard entry' });
  }
});

// POST create leaderboard entry
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, points, rank, totalActivities } = req.body;
    const entry = new Leaderboard({ userId, points, rank, totalActivities });
    await entry.save();
    await entry.populate('userId');
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create leaderboard entry' });
  }
});

// PUT update leaderboard entry
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('userId');
    if (!entry) {
      res.status(404).json({ error: 'Leaderboard entry not found' });
      return;
    }
    res.json(entry);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update leaderboard entry' });
  }
});

export default router;
