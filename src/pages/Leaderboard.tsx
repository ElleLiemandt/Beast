import React, { useState } from 'react';
import { Trophy, Medal, Crown, Star, Zap, Users } from 'lucide-react';
import { User, Leaderboard as LeaderboardType } from '../types';
import { mockLeaderboard, getUserLevel } from '../utils/mockData';

interface LeaderboardProps {
  user: User | null;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ user }) => {
  const [selectedScope, setSelectedScope] = useState<'school' | 'city' | 'state' | 'global'>('school');
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | 'all-time'>('monthly');

  if (!user) return null;

  const scopes = [
    { key: 'school', label: 'School', icon: Users },
    { key: 'city', label: 'City', icon: Star },
    { key: 'state', label: 'State', icon: Medal },
    { key: 'global', label: 'Global', icon: Crown },
  ];

  const periods = [
    { key: 'weekly', label: 'This Week' },
    { key: 'monthly', label: 'This Month' },
    { key: 'all-time', label: 'All Time' },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="text-yellow-400" size={20} />;
      case 2:
        return <Medal className="text-gray-300" size={20} />;
      case 3:
        return <Medal className="text-orange-400" size={20} />;
      default:
        return <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
          <span className="text-white/70 text-sm font-bold">{rank}</span>
        </div>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      case 2:
        return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30';
      case 3:
        return 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30';
      default:
        return 'bg-white/5 border-white/10';
    }
  };

  // Find user's rank in the leaderboard
  const userRank = mockLeaderboard.users.findIndex(entry => entry.userId === user.id) + 1;

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Trophy className="text-yellow-400" size={24} />
          <h2 className="text-2xl font-bold text-white">Kindness Rankings</h2>
        </div>
        <p className="text-white/80">See who's spreading the most positivity</p>
      </div>

      {/* User's Current Rank */}
      <div className="glass-morphism rounded-2xl p-6">
        <div className="text-center mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3">
            <img 
              src={user.avatar || '/api/placeholder/64/64'} 
              alt="Your avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-white font-semibold text-lg">{user.firstName} {user.lastName}</h3>
          <p className="text-white/70 text-sm">{getUserLevel(user.xp).title}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-white">{userRank || '?'}</div>
            <div className="text-white/70 text-xs">Your Rank</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{user.xp}</div>
            <div className="text-white/70 text-xs">Total XP</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{user.level}</div>
            <div className="text-white/70 text-xs">Level</div>
          </div>
        </div>
      </div>

      {/* Scope Selection */}
      <div className="glass-morphism rounded-xl p-1">
        <div className="grid grid-cols-4 gap-1">
          {scopes.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setSelectedScope(key as any)}
              className={`flex flex-col items-center py-2 px-2 rounded-lg transition-all duration-200 ${
                selectedScope === key
                  ? 'bg-beast-orange text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={16} />
              <span className="text-xs mt-1">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Period Selection */}
      <div className="glass-morphism rounded-xl p-1">
        <div className="grid grid-cols-3 gap-1">
          {periods.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setSelectedPeriod(key as any)}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedPeriod === key
                  ? 'bg-beast-orange text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="glass-morphism rounded-2xl p-6">
        <h3 className="text-white font-semibold text-lg mb-4 text-center">
          Top 3 {scopes.find(s => s.key === selectedScope)?.label} Champions
        </h3>
        
        <div className="flex items-end justify-center space-x-4 mb-6">
          {/* 2nd Place */}
          {mockLeaderboard.users[1] && (
            <div className="text-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mx-auto mb-2">
                <img 
                  src={mockLeaderboard.users[1].avatar || '/api/placeholder/48/48'} 
                  alt="2nd place"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-16 h-12 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-lg flex items-center justify-center">
                <span className="text-gray-800 font-bold text-sm">2</span>
              </div>
              <p className="text-white text-xs mt-1">{mockLeaderboard.users[1].username}</p>
              <p className="text-gray-300 text-xs">{mockLeaderboard.users[1].xp} XP</p>
            </div>
          )}

          {/* 1st Place */}
          {mockLeaderboard.users[0] && (
            <div className="text-center">
              <Crown className="text-yellow-400 mx-auto mb-2" size={20} />
              <div className="w-14 h-14 rounded-full overflow-hidden mx-auto mb-2 ring-2 ring-yellow-400">
                <img 
                  src={mockLeaderboard.users[0].avatar || '/api/placeholder/56/56'} 
                  alt="1st place"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-16 h-16 bg-gradient-to-t from-yellow-500 to-yellow-400 rounded-t-lg flex items-center justify-center">
                <span className="text-yellow-900 font-bold">1</span>
              </div>
              <p className="text-white font-semibold text-sm mt-1">{mockLeaderboard.users[0].username}</p>
              <p className="text-yellow-400 text-xs">{mockLeaderboard.users[0].xp} XP</p>
            </div>
          )}

          {/* 3rd Place */}
          {mockLeaderboard.users[2] && (
            <div className="text-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mx-auto mb-2">
                <img 
                  src={mockLeaderboard.users[2].avatar || '/api/placeholder/48/48'} 
                  alt="3rd place"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-16 h-10 bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg flex items-center justify-center">
                <span className="text-orange-900 font-bold text-sm">3</span>
              </div>
              <p className="text-white text-xs mt-1">{mockLeaderboard.users[2].username}</p>
              <p className="text-orange-400 text-xs">{mockLeaderboard.users[2].xp} XP</p>
            </div>
          )}
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="glass-morphism rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-lg">Full Rankings</h3>
          <div className="flex items-center space-x-1 text-white/70 text-sm">
            <Zap size={14} />
            <span>XP</span>
          </div>
        </div>

        <div className="space-y-3">
          {mockLeaderboard.users.map((entry) => {
            const isCurrentUser = entry.userId === user.id;
            
            return (
              <div 
                key={entry.userId}
                className={`border rounded-xl p-4 transition-all duration-200 ${
                  isCurrentUser 
                    ? 'bg-beast-orange/20 border-beast-orange/50' 
                    : getRankStyle(entry.rank)
                }`}
              >
                <div className="flex items-center space-x-4">
                  {getRankIcon(entry.rank)}
                  
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img 
                      src={entry.avatar || '/api/placeholder/40/40'} 
                      alt={entry.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className={`font-semibold ${isCurrentUser ? 'text-white' : 'text-white'}`}>
                        {entry.username}
                        {isCurrentUser && <span className="text-beast-orange"> (You)</span>}
                      </h4>
                      {entry.badges.length > 0 && (
                        <div className="flex space-x-1">
                          {entry.badges.slice(0, 2).map((badge, index) => (
                            <span key={index} className="text-sm">{badge.icon}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-white/70 text-sm">{getUserLevel(entry.xp).title}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-white font-bold">{entry.xp}</div>
                    <div className="text-white/50 text-xs">XP</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievement Motivation */}
      <div className="glass-morphism rounded-2xl p-6">
        <h3 className="text-white font-semibold text-lg mb-4">Climb the Rankings</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center">
              <span className="text-pink-400">💝</span>
            </div>
            <div>
              <div className="text-white font-medium">Send compliments daily</div>
              <div className="text-white/70">+1 XP per compliment</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <span className="text-green-400">🌍</span>
            </div>
            <div>
              <div className="text-white font-medium">Donate to causes</div>
              <div className="text-white/70">+1 XP per $1 donated</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
              <span className="text-blue-400">📅</span>
            </div>
            <div>
              <div className="text-white font-medium">Attend volunteer events</div>
              <div className="text-white/70">+10 XP per event</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
