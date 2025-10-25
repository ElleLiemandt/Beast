import React, { useState } from 'react';
import { Globe, Heart, Zap, Filter, DollarSign, Star, MapPin } from 'lucide-react';
import { User, Cause } from '../types';
import { mockCauses } from '../utils/mockData';
import Globe3D from '../components/Globe3D';

interface DonationsProps {
  user: User | null;
}

const Donations: React.FC<DonationsProps> = ({ user }) => {
  const [selectedCause, setSelectedCause] = useState<Cause | null>(null);
  const [filter, setFilter] = useState<'all' | 'local' | 'global' | 'mrbeast'>('all');
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState<number | null>(null);

  if (!user) return null;

  const filteredCauses = mockCauses.filter(cause => {
    switch (filter) {
      case 'local':
        return cause.location.country === 'USA';
      case 'global':
        return cause.location.country !== 'USA';
      case 'mrbeast':
        return cause.isMrBeastCampaign;
      default:
        return true;
    }
  });

  const handleDonate = () => {
    if (!selectedCause || !donationAmount) return;
    
    // TODO: Process donation
    setShowDonationModal(false);
    setDonationAmount(null);
    // TODO: Show success message and update XP
  };

  const quickAmounts = [1, 5, 10, 25, 50];

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Globe className="text-green-400" size={24} />
          <h2 className="text-2xl font-bold text-white">Beast Signals</h2>
          <Zap className="text-yellow-400" size={20} />
        </div>
        <p className="text-white/80">Discover causes worldwide and make an impact</p>
      </div>

      {/* Filter Tabs */}
      <div className="glass-morphism rounded-xl p-1">
        <div className="grid grid-cols-4 gap-1">
          {[
            { key: 'all', label: 'All', icon: Globe },
            { key: 'local', label: 'Local', icon: MapPin },
            { key: 'global', label: 'Global', icon: Globe },
            { key: 'mrbeast', label: 'Beast', icon: Star },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              className={`flex flex-col items-center py-2 px-2 rounded-lg transition-all duration-200 ${
                filter === key
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

      {/* 3D Globe */}
      <div className="glass-morphism rounded-2xl p-6">
        <div className="mb-4 text-center">
          <h3 className="text-white font-semibold text-lg mb-2">Live Causes Map</h3>
          <p className="text-white/70 text-sm">Tap on beams to explore causes</p>
        </div>
        
        <Globe3D 
          causes={filteredCauses}
          onCauseSelect={setSelectedCause}
          selectedCause={selectedCause}
        />

        <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-beast-orange rounded-full animate-pulse"></div>
            <span className="text-white/70">MrBeast Campaigns</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-beast-green rounded-full animate-pulse"></div>
            <span className="text-white/70">Global Causes</span>
          </div>
        </div>
      </div>

      {/* Selected Cause Details */}
      {selectedCause && (
        <div className="glass-morphism rounded-2xl p-6 slide-in-up">
          <div className="flex items-start space-x-4 mb-4">
            <img 
              src={selectedCause.imageUrl} 
              alt={selectedCause.title}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-white font-semibold text-lg">{selectedCause.title}</h3>
                {selectedCause.isMrBeastCampaign && (
                  <Star className="text-yellow-400" size={16} />
                )}
              </div>
              <p className="text-white/70 text-sm mb-2">{selectedCause.organization}</p>
              <p className="text-white/80 text-sm">{selectedCause.description}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/70 text-sm">Progress</span>
              <span className="text-white text-sm font-semibold">
                ${selectedCause.currentAmount.toLocaleString()} / ${selectedCause.targetAmount.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3">
              <div 
                className="h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full transition-all duration-500"
                style={{ width: `${(selectedCause.currentAmount / selectedCause.targetAmount) * 100}%` }}
              />
            </div>
            <p className="text-white/60 text-xs mt-1">
              {Math.round((selectedCause.currentAmount / selectedCause.targetAmount) * 100)}% funded
            </p>
          </div>

          {/* Location */}
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="text-blue-400" size={16} />
            <span className="text-white/70 text-sm">
              {selectedCause.location.region}, {selectedCause.location.country}
            </span>
          </div>

          {/* Donate Button */}
          <button
            onClick={() => setShowDonationModal(true)}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 px-4 rounded-xl hover:from-blue-500 hover:to-green-500 transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-center space-x-2">
              <Heart size={20} />
              <span>Donate Now</span>
            </div>
          </button>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-morphism rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">$125</div>
          <div className="text-white/70 text-sm">Total Donated</div>
          <div className="text-green-400 text-xs">+125 XP earned</div>
        </div>
        <div className="glass-morphism rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">8</div>
          <div className="text-white/70 text-sm">Causes Supported</div>
          <div className="text-blue-400 text-xs">Generous Giver!</div>
        </div>
      </div>

      {/* Featured Causes List */}
      <div className="glass-morphism rounded-2xl p-6">
        <h3 className="text-white font-semibold text-lg mb-4">Featured Causes</h3>
        <div className="space-y-3">
          {filteredCauses.slice(0, 3).map((cause) => (
            <button
              key={cause.id}
              onClick={() => setSelectedCause(cause)}
              className="w-full bg-white/5 hover:bg-white/10 rounded-xl p-3 transition-all duration-200 text-left"
            >
              <div className="flex items-center space-x-3">
                <img 
                  src={cause.imageUrl} 
                  alt={cause.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-white font-medium text-sm">{cause.title}</h4>
                    {cause.isMrBeastCampaign && (
                      <Star className="text-yellow-400" size={12} />
                    )}
                  </div>
                  <p className="text-white/70 text-xs">{cause.organization}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex-1 bg-white/10 rounded-full h-1">
                      <div 
                        className="h-1 bg-green-400 rounded-full"
                        style={{ width: `${(cause.currentAmount / cause.targetAmount) * 100}%` }}
                      />
                    </div>
                    <span className="text-white/60 text-xs">
                      {Math.round((cause.currentAmount / cause.targetAmount) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Donation Modal */}
      {showDonationModal && selectedCause && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-morphism rounded-2xl p-6 w-full max-w-sm">
            <div className="text-center mb-6">
              <h3 className="text-white font-bold text-xl mb-2">Make a Donation</h3>
              <p className="text-white/70 text-sm">{selectedCause.title}</p>
            </div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setDonationAmount(amount)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    donationAmount === amount
                      ? 'bg-green-500 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="mb-6">
              <label className="text-white/70 text-sm block mb-2">Custom Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
                <input
                  type="number"
                  value={donationAmount || ''}
                  onChange={(e) => setDonationAmount(Number(e.target.value))}
                  placeholder="Enter amount"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Impact Info */}
            {donationAmount && (
              <div className="bg-green-500/20 rounded-lg p-3 mb-4">
                <p className="text-green-300 text-sm text-center">
                  Your ${donationAmount} donation will earn you {donationAmount} XP!
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDonationModal(false)}
                className="flex-1 bg-white/10 text-white py-3 px-4 rounded-lg hover:bg-white/20 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDonate}
                disabled={!donationAmount}
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-500 hover:to-green-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donations;
