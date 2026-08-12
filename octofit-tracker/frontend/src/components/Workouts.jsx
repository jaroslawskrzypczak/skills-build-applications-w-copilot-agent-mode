import { useState, useEffect } from 'react';
import { fetchFromAPI } from '../api.js';

const WORKOUTS_ENDPOINT = '/api/workouts';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setLoading(true);
        const data = await fetchFromAPI('/workouts');
        setWorkouts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  if (loading) return <div className="alert alert-info">Loading workouts...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2>💪 Workouts</h2>
      {workouts.length === 0 ? (
        <p className="text-muted">No workouts found</p>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id} className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  <p className="card-text">{workout.description}</p>
                  <div className="small">
                    <p className="mb-1">
                      <strong>Duration:</strong> {workout.duration} minutes
                    </p>
                    <p className="mb-1">
                      <strong>Difficulty:</strong> {workout.difficulty}
                    </p>
                    <p>
                      <strong>Type:</strong> {workout.type}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
