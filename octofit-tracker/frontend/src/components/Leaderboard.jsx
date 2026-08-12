import { useState, useEffect } from 'react';
import { fetchFromAPI } from '../api.js';

// API endpoint for leaderboard
// Codespaces: https://{CODESPACE_NAME}-8000.app.github.dev/api/leaderboard
const LEADERBOARD_ENDPOINT = '/api/leaderboard';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await fetchFromAPI('/leaderboard');
        setLeaderboard(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setLeaderboard([]);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2>🏆 Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <p className="text-muted">No leaderboard data found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Total Points</th>
                <th>Activities</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry._id}>
                  <td>
                    {index === 0 && '🥇'}
                    {index === 1 && '🥈'}
                    {index === 2 && '🥉'}
                    {index > 2 && index + 1}
                  </td>
                  <td>{entry.userId?.username || 'Unknown'}</td>
                  <td><strong>{entry.totalPoints || 0}</strong></td>
                  <td>{entry.activityCount || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
