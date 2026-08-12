import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { API_BASE_URL, CODESPACE_NAME } from './api.js';

import Users from './components/Users.jsx';
import Activities from './components/Activities.jsx';
import Teams from './components/Teams.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Workouts from './components/Workouts.jsx';

import './App.css';

function Home() {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/health`);
        const data = await response.json();
        setHealth(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    checkHealth();
  }, []);

  return (
    <div className="container mt-5">
      <h1>🏋️ OctoFit Tracker</h1>
      <p className="lead">Track your fitness activities and compete with friends!</p>

      <div className="alert alert-info mt-4">
        <h5>API Configuration:</h5>
        <p className="mb-1">
          <strong>API Base URL:</strong> <code>{API_BASE_URL}</code>
        </p>
        <p className="mb-0">
          <strong>Codespace Name:</strong>{' '}
          <code>{CODESPACE_NAME || 'Not set (using localhost)'}</code>
        </p>
      </div>

      {health && (
        <div className="alert alert-success mt-3">
          <strong>Backend Status:</strong> ✅ {health.message}
        </div>
      )}

      {error && (
        <div className="alert alert-danger mt-3">
          <strong>Backend Error:</strong> {error}
        </div>
      )}

      <div className="mt-5">
        <h3>Quick Start:</h3>
        <p>Use the navigation menu above to explore:</p>
        <ul className="list-group">
          <li className="list-group-item">👥 <strong>Users</strong> - Browse all users</li>
          <li className="list-group-item">🏃 <strong>Activities</strong> - View logged activities</li>
          <li className="list-group-item">👨‍👩‍👧 <strong>Teams</strong> - Explore team groups</li>
          <li className="list-group-item">🏆 <strong>Leaderboard</strong> - Check rankings</li>
          <li className="list-group-item">💪 <strong>Workouts</strong> - Browse available workouts</li>
        </ul>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            🏋️ OctoFit
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">
                  Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">
                  Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">
                  Leaderboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">
                  Workouts
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </>
  );
}
