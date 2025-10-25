import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Globe, Calendar, Trophy, User, Home } from 'lucide-react';
import { User as UserType } from '../types';

interface NavbarProps {
  user: UserType | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/compliments', icon: Heart, label: 'Compliments' },
    { path: '/donations', icon: Globe, label: 'Donations' },
    { path: '/events', icon: Calendar, label: 'Events' },
    { path: '/leaderboard', icon: Trophy, label: 'Rankings' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <>
      {/* Top Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-beast-orange to-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">MB</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">MrBeast Community</h1>
            </div>
          </div>
          {user && (
            <div className="flex items-center space-x-2">
              <div className="bg-beast-orange/20 px-3 py-1 rounded-full">
                <span className="text-white text-sm font-semibold">{user.xp} XP</span>
              </div>
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img 
                  src={user.avatar || '/api/placeholder/32/32'} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20 z-50">
        <div className="max-w-md mx-auto px-2 py-2">
          <div className="flex items-center justify-around">
            {navItems.map(({ path, icon: Icon, label }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-beast-orange/30 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'animate-pulse-slow' : ''} />
                  <span className="text-xs mt-1 font-medium">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
