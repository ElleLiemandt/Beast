import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Compliments from './pages/Compliments';
import Donations from './pages/Donations';
import Events from './pages/Events';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { mockUser } from './utils/mockData';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(mockUser); // Start with mock user for demo
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Start authenticated for demo

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-green-400">
          <Navbar user={user} onLogout={handleLogout} />
          <main className="pb-20"> {/* Padding for bottom navbar */}
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/compliments" element={<Compliments user={user} />} />
              <Route path="/donations" element={<Donations user={user} />} />
              <Route path="/events" element={<Events user={user} />} />
              <Route path="/leaderboard" element={<Leaderboard user={user} />} />
              <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </div>
  );
}

export default App;
