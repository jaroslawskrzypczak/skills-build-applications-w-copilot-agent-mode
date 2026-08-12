import { useState, useEffect } from 'react';
import { fetchFromAPI } from '../api.js';

const ACTIVITIES_ENDPOINT = '/api/activities';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true);
        const data = await fetchFromAPI('/activities');
        setActivities(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  if (loading) return <div className="alert alert-info">Loading activities...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <p className="text-muted">No activities found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Distance (km)</th>
                <th>Calories</th>
                <th>Date</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id}>
                  <td>{activity.type}</td>
                  <td>{activity.duration}</td>
                  <td>{activity.distance}</td>
                  <td>{activity.calories}</td>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                  <td>{activity.userId?.username || 'Unknown'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
