import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Globe, Calendar, Trophy, Star, Zap, Users } from 'lucide-react';
import { User } from '../types';
import { getUserLevel, getProgressToNextLevel } from '../utils/mockData';

interface HomeProps {
  user: User | null;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  if (!user) return null;

  const currentLevel = getUserLevel(user.xp);
  const progress = getProgressToNextLevel(user.xp);

  const quickStats = [
    { label: 'Compliments Sent', value: 47, icon: Heart, color: 'text-pink-400' },
    { label: 'Events Attended', value: 8, icon: Calendar, color: 'text-blue-400' },
    { label: 'Total Donated', value: '$125', icon: Globe, color: 'text-green-400' },
  ];

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-6">
      {/* Welcome Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Welcome back, {user.firstName}! 👋
        </h2>
        <p className="text-white/80">Ready to spread some kindness today?</p>
      </div>

      {/* Level Progress Card */}
      <div className="glass-morphism rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-white font-semibold text-lg">{currentLevel.title}</h3>
            <p className="text-white/70 text-sm">Level {currentLevel.level}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="text-yellow-400" size={20} />
            <span className="text-white font-bold text-xl">{user.xp} XP</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Progress to next level</span>
            <span className="text-white">{progress.remaining} XP to go</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3">
            <div 
              className="h-3 bg-gradient-to-r from-beast-orange to-yellow-400 rounded-full transition-all duration-500"
              style={{ width: `${progress.progress}%` }}
            />
          </div>
        </div>

        {user.isAmbassador && (
          <div className="mt-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Star className="text-yellow-400" size={16} />
              <span className="text-white font-medium">
                {user.ambassadorLevel?.charAt(0).toUpperCase() + user.ambassadorLevel?.slice(1)} Ambassador
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        {quickStats.map((stat, index) => (
          <div key={index} className="glass-morphism rounded-xl p-4 text-center">
            <stat.icon className={`${stat.color} mx-auto mb-2`} size={24} />
            <div className="text-white font-bold text-lg">{stat.value}</div>
            <div className="text-white/70 text-xs">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="text-white font-semibold text-lg flex items-center">
          <Zap className="mr-2 text-yellow-400" size={20} />
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/compliments"
            className="glass-morphism rounded-xl p-4 hover:bg-white/20 transition-all duration-200 group"
          >
            <Heart className="text-pink-400 group-hover:scale-110 transition-transform duration-200" size={24} />
            <div className="text-white font-medium mt-2">Send Compliment</div>
            <div className="text-white/70 text-sm">Spread positivity</div>
          </Link>

          <Link
            to="/donations"
            className="glass-morphism rounded-xl p-4 hover:bg-white/20 transition-all duration-200 group"
          >
            <Globe className="text-green-400 group-hover:scale-110 transition-transform duration-200" size={24} />
            <div className="text-white font-medium mt-2">Make Donation</div>
            <div className="text-white/70 text-sm">Help a cause</div>
          </Link>

          <Link
            to="/events"
            className="glass-morphism rounded-xl p-4 hover:bg-white/20 transition-all duration-200 group"
          >
            <Calendar className="text-blue-400 group-hover:scale-110 transition-transform duration-200" size={24} />
            <div className="text-white font-medium mt-2">Join Event</div>
            <div className="text-white/70 text-sm">Volunteer locally</div>
          </Link>

          <Link
            to="/leaderboard"
            className="glass-morphism rounded-xl p-4 hover:bg-white/20 transition-all duration-200 group"
          >
            <Trophy className="text-yellow-400 group-hover:scale-110 transition-transform duration-200" size={24} />
            <div className="text-white font-medium mt-2">Rankings</div>
            <div className="text-white/70 text-sm">See top helpers</div>
          </Link>
        </div>
      </div>

      {/* Today's Challenges */}
      <div className="glass-morphism rounded-2xl p-6">
        <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
          <Trophy className="mr-2 text-yellow-400" size={20} />
          Today's Challenges
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center">
                <Heart className="text-pink-400" size={16} />
              </div>
              <div>
                <div className="text-white font-medium">Send 3 Compliments</div>
                <div className="text-white/70 text-sm">+15 XP</div>
              </div>
            </div>
            <div className="text-white/50 text-sm">2/3</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <Globe className="text-green-400" size={16} />
              </div>
              <div>
                <div className="text-white font-medium">Make a Donation</div>
                <div className="text-white/70 text-sm">+20 XP</div>
              </div>
            </div>
            <div className="text-white/50 text-sm">0/1</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Users className="text-blue-400" size={16} />
              </div>
              <div>
                <div className="text-white font-medium">RSVP to an Event</div>
                <div className="text-white/70 text-sm">+10 XP</div>
              </div>
            </div>
            <div className="text-white/50 text-sm">0/1</div>
          </div>
        </div>
      </div>

      {/* Recent Badges */}
      {user.badges.length > 0 && (
        <div className="glass-morphism rounded-2xl p-6">
          <h3 className="text-white font-semibold text-lg mb-4">Recent Badges</h3>
          <div className="flex space-x-3">
            {user.badges.slice(0, 3).map((badge) => (
              <div key={badge.id} className="text-center">
                <div className="text-2xl mb-1">{badge.icon}</div>
                <div className="text-white text-xs font-medium">{badge.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
