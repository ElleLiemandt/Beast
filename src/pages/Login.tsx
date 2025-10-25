import React, { useState } from 'react';
import { Heart, Globe, Trophy } from 'lucide-react';
import { User } from '../types';
import { mockUser } from '../utils/mockData';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    school: '',
    grade: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, just log in with mock user
    onLogin(mockUser);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-green-400 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-beast-orange to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">MB</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">MrBeast Community</h1>
          <p className="text-white/80 text-lg">Turn acts of kindness into the next social network</p>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Heart className="text-pink-300" size={20} />
            </div>
            <p className="text-white/80 text-sm">Send Compliments</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Globe className="text-green-300" size={20} />
            </div>
            <p className="text-white/80 text-sm">Global Donations</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Trophy className="text-yellow-300" size={20} />
            </div>
            <p className="text-white/80 text-sm">Earn Recognition</p>
          </div>
        </div>

        {/* Login/Signup Form */}
        <div className="glass-morphism rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex bg-white/5 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  !isSignUp
                    ? 'bg-beast-orange text-white shadow-lg'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  isSignUp
                    ? 'bg-beast-orange text-white shadow-lg'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            {isSignUp && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-beast-orange focus:border-transparent"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-beast-orange focus:border-transparent"
                    required
                  />
                </div>
                <input
                  type="text"
                  name="school"
                  placeholder="School Name"
                  value={formData.school}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-beast-orange focus:border-transparent"
                />
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-beast-orange focus:border-transparent"
                >
                  <option value="">Select Grade</option>
                  {[9, 10, 11, 12].map(grade => (
                    <option key={grade} value={grade} className="bg-gray-800">
                      Grade {grade}
                    </option>
                  ))}
                </select>
              </>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-beast-orange focus:border-transparent"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-beast-orange focus:border-transparent"
              required
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-beast-orange to-yellow-400 text-white font-bold py-3 px-4 rounded-lg hover:from-yellow-400 hover:to-beast-orange transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {isSignUp ? 'Start Spreading Kindness' : 'Join the Movement'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              By joining, you agree to spread positivity and make the world a better place ❤️
            </p>
          </div>
        </div>

        {/* Stats Preview */}
        <div className="mt-8 text-center">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold text-white">50M+</div>
              <div className="text-white/60 text-sm">Acts of Kindness</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">$2M+</div>
              <div className="text-white/60 text-sm">Donated</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">100K+</div>
              <div className="text-white/60 text-sm">Volunteers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
