import React, { useState } from 'react';
import { Camera, Edit3, Star, Award, Calendar, DollarSign, Heart, Settings, LogOut, Shield } from 'lucide-react';
import { User } from '../types';
import { getUserLevel, getProgressToNextLevel } from '../utils/mockData';

interface ProfileProps {
  user: User | null;
  setUser: (user: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    school: user?.school || '',
    grade: user?.grade || '',
  });

  if (!user) return null;

  const currentLevel = getUserLevel(user.xp);
  const progress = getProgressToNextLevel(user.xp);

  const handleSave = () => {
    setUser({
      ...user,
      firstName: editForm.firstName,
      lastName: editForm.lastName,
      school: editForm.school,
      grade: Number(editForm.grade),
    });
    setIsEditing(false);
  };

  const stats = [
    { label: 'Compliments Sent', value: 47, icon: Heart, color: 'text-pink-400' },
    { label: 'Events Attended', value: 8, icon: Calendar, color: 'text-blue-400' },
    { label: 'Total Donated', value: '$125', icon: DollarSign, color: 'text-green-400' },
    { label: 'Badges Earned', value: user.badges.length, icon: Award, color: 'text-purple-400' },
  ];

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-6">
      {/* Profile Header */}
      <div className="glass-morphism rounded-2xl p-6">
        <div className="text-center">
          {/* Avatar */}
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-beast-orange/30">
              <img 
                src={user.avatar || '/api/placeholder/96/96'} 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-beast-orange rounded-full flex items-center justify-center shadow-lg">
              <Camera className="text-white" size={16} />
            </button>
          </div>

          {/* User Info */}
          {isEditing ? (
            <div className="space-y-3 mb-4">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={editForm.firstName}
                  onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-center"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  value={editForm.lastName}
                  onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-center"
                  placeholder="Last Name"
                />
              </div>
              <input
                type="text"
                value={editForm.school}
                onChange={(e) => setEditForm({ ...editForm, school: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-center"
                placeholder="School"
              />
              <select
                value={editForm.grade}
                onChange={(e) => setEditForm({ ...editForm, grade: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-center"
              >
                <option value="">Select Grade</option>
                {[9, 10, 11, 12].map(grade => (
                  <option key={grade} value={grade} className="bg-gray-800">
                    Grade {grade}
                  </option>
                ))}
              </select>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-white/10 text-white py-2 px-4 rounded-lg hover:bg-white/20 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-beast-orange text-white py-2 px-4 rounded-lg hover:bg-beast-orange/80 transition-all"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <h2 className="text-2xl font-bold text-white">{user.firstName} {user.lastName}</h2>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-white/50 hover:text-white"
                >
                  <Edit3 size={16} />
                </button>
              </div>
              <p className="text-white/70">{user.school} • Grade {user.grade}</p>
              <p className="text-white/60 text-sm">@{user.username}</p>
            </div>
          )}

          {/* Level and XP */}
          <div className="mb-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <h3 className="text-xl font-semibold text-white">{currentLevel.title}</h3>
              <div className="bg-beast-orange/20 px-3 py-1 rounded-full">
                <span className="text-beast-orange text-sm font-bold">Level {user.level}</span>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Award className="text-yellow-400" size={16} />
              <span className="text-white font-bold">{user.xp} XP</span>
            </div>
            
            {/* Progress to next level */}
            <div className="w-full bg-white/10 rounded-full h-2 mb-2">
              <div 
                className="h-2 bg-gradient-to-r from-beast-orange to-yellow-400 rounded-full transition-all duration-500"
                style={{ width: `${progress.progress}%` }}
              />
            </div>
            <p className="text-white/70 text-sm">{progress.remaining} XP to next level</p>
          </div>

          {/* Ambassador Status */}
          {user.isAmbassador && (
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Star className="text-yellow-400" size={20} />
                <span className="text-white font-semibold">
                  {user.ambassadorLevel?.charAt(0).toUpperCase() + user.ambassadorLevel?.slice(1)} Ambassador
                </span>
              </div>
              <p className="text-white/80 text-sm">You're leading the kindness movement in your community!</p>
            </div>
          )}

          {/* Verification Status */}
          {user.isVerified && (
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="text-green-400" size={16} />
              <span className="text-green-400 text-sm font-medium">Verified Account</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <div key={index} className="glass-morphism rounded-xl p-4 text-center">
            <stat.icon className={`${stat.color} mx-auto mb-2`} size={24} />
            <div className="text-white font-bold text-lg">{stat.value}</div>
            <div className="text-white/70 text-xs">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Badges Collection */}
      <div className="glass-morphism rounded-2xl p-6">
        <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
          <Award className="mr-2 text-purple-400" size={20} />
          Badge Collection
        </h3>
        
        {user.badges.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {user.badges.map((badge) => (
              <div key={badge.id} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center text-2xl mb-2 mx-auto">
                  {badge.icon}
                </div>
                <h4 className="text-white font-medium text-sm">{badge.name}</h4>
                <p className="text-white/60 text-xs">{badge.description}</p>
                <p className="text-white/50 text-xs mt-1">
                  {badge.earnedAt.toLocaleDateString()}
                </p>
              </div>
            ))}
            
            {/* Empty badge slots */}
            {Array.from({ length: Math.max(0, 6 - user.badges.length) }).map((_, index) => (
              <div key={`empty-${index}`} className="text-center">
                <div className="w-16 h-16 bg-white/5 border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <span className="text-white/30 text-xs">?</span>
                </div>
                <p className="text-white/40 text-xs">Locked</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Award className="text-white/30 mx-auto mb-3" size={48} />
            <p className="text-white/70">No badges yet</p>
            <p className="text-white/50 text-sm">Keep being kind to earn your first badge!</p>
          </div>
        )}
      </div>

      {/* Activity Summary */}
      <div className="glass-morphism rounded-2xl p-6">
        <h3 className="text-white font-semibold text-lg mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center">
              <Heart className="text-pink-400" size={16} />
            </div>
            <div className="flex-1">
              <p className="text-white text-sm">Sent a compliment to Emma</p>
              <p className="text-white/50 text-xs">2 hours ago</p>
            </div>
            <span className="text-pink-400 text-xs">+1 XP</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <DollarSign className="text-green-400" size={16} />
            </div>
            <div className="flex-1">
              <p className="text-white text-sm">Donated $10 to TeamTrees</p>
              <p className="text-white/50 text-xs">1 day ago</p>
            </div>
            <span className="text-green-400 text-xs">+10 XP</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Calendar className="text-blue-400" size={16} />
            </div>
            <div className="flex-1">
              <p className="text-white text-sm">Attended Park Cleanup</p>
              <p className="text-white/50 text-xs">3 days ago</p>
            </div>
            <span className="text-blue-400 text-xs">+15 XP</span>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="glass-morphism rounded-2xl p-6">
        <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
          <Settings className="mr-2 text-gray-400" size={20} />
          Settings
        </h3>
        
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
            <span className="text-white">Notification Settings</span>
            <span className="text-white/50">›</span>
          </button>
          
          <button className="w-full flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
            <span className="text-white">Privacy & Safety</span>
            <span className="text-white/50">›</span>
          </button>
          
          <button className="w-full flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
            <span className="text-white">Help & Support</span>
            <span className="text-white/50">›</span>
          </button>
          
          <button className="w-full flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
            <span className="text-white">About MrBeast Community</span>
            <span className="text-white/50">›</span>
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="glass-morphism rounded-2xl p-6">
        <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-all">
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>

      {/* App Info */}
      <div className="text-center text-white/50 text-xs">
        <p>MrBeast Community App v1.0</p>
        <p>Making kindness cool, one act at a time ❤️</p>
      </div>
    </div>
  );
};

export default Profile;
