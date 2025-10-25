import React, { useState, useEffect } from 'react';
import { Heart, Clock, Send, ThumbsUp, Sparkles } from 'lucide-react';
import { User, ComplimentPoll, Compliment } from '../types';
import { mockComplimentPolls } from '../utils/mockData';

interface ComplimentsProps {
  user: User | null;
}

const Compliments: React.FC<ComplimentsProps> = ({ user }) => {
  const [polls, setPolls] = useState<ComplimentPoll[]>(mockComplimentPolls);
  const [currentPollIndex, setCurrentPollIndex] = useState(0);
  const [recentCompliments, setRecentCompliments] = useState<Compliment[]>([]);
  const [showThankYou, setShowThankYou] = useState(false);

  if (!user) return null;

  const currentPoll = polls[currentPollIndex];
  const hasMorePolls = currentPollIndex < polls.length - 1;

  const handleSendCompliment = (recipientId: string) => {
    // Create a compliment record
    const newCompliment: Compliment = {
      id: `comp_${Date.now()}`,
      pollId: currentPoll.id,
      question: currentPoll.question,
      recipientId,
      senderId: user.id,
      isAnonymous: true,
      sentAt: new Date(),
      isLiked: false,
    };

    // Add to recent compliments for the recipient (if it were them)
    setRecentCompliments(prev => [newCompliment, ...prev.slice(0, 9)]);

    // Show thank you message
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 2000);

    // Move to next poll or loop back
    if (hasMorePolls) {
      setCurrentPollIndex(prev => prev + 1);
    } else {
      setCurrentPollIndex(0);
    }

    // TODO: Send XP to user (+1 XP for sending compliment)
    // TODO: Send notification to recipient
  };

  const formatTimeLeft = (expiresAt: Date) => {
    const now = new Date();
    const timeLeft = expiresAt.getTime() - now.getTime();
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m left`;
    }
    return `${minutes}m left`;
  };

  // Mock recent compliments received
  const mockReceivedCompliments = [
    {
      id: '1',
      question: 'Who has the brightest smile?',
      senderHint: 'A 11th grade student',
      sentAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isLiked: false,
    },
    {
      id: '2',
      question: 'Who is most likely to become a teacher?',
      senderHint: 'Someone from your English class',
      sentAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      isLiked: true,
    },
    {
      id: '3',
      question: 'Who always helps others?',
      senderHint: 'A classmate',
      sentAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isLiked: true,
    },
  ];

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Heart className="text-pink-400" size={24} />
          <h2 className="text-2xl font-bold text-white">Compliments</h2>
          <Sparkles className="text-yellow-400" size={20} />
        </div>
        <p className="text-white/80">Spread positivity with anonymous compliments</p>
      </div>

      {/* Thank You Animation */}
      {showThankYou && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg animate-bounce-gentle">
            <div className="flex items-center space-x-2">
              <Heart className="text-white" size={20} />
              <span className="font-semibold">Compliment sent! +1 XP</span>
            </div>
          </div>
        </div>
      )}

      {/* Current Poll */}
      {currentPoll && (
        <div className="glass-morphism rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/70 text-sm">Live Poll</span>
            </div>
            <div className="flex items-center space-x-1 text-white/70 text-sm">
              <Clock size={14} />
              <span>{formatTimeLeft(currentPoll.expiresAt)}</span>
            </div>
          </div>

          <h3 className="text-white font-semibold text-lg mb-6 text-center">
            {currentPoll.question}
          </h3>

          <div className="space-y-3">
            {currentPoll.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSendCompliment(option.id)}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl p-4 transition-all duration-200 hover:scale-105 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={option.avatar || '/api/placeholder/48/48'} 
                      alt={`${option.firstName} ${option.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-white font-medium">
                      {option.firstName} {option.lastName.charAt(0)}.
                    </div>
                    <div className="text-white/70 text-sm">{option.school}</div>
                  </div>
                  <Send className="text-pink-400 group-hover:scale-110 transition-transform duration-200" size={20} />
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Your vote is completely anonymous 🤫
            </p>
          </div>
        </div>
      )}

      {/* Poll Progress */}
      <div className="glass-morphism rounded-xl p-4">
        <div className="flex items-center justify-between">
          <span className="text-white/70 text-sm">Poll Progress</span>
          <span className="text-white text-sm">{currentPollIndex + 1} of {polls.length}</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 mt-2">
          <div 
            className="h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full transition-all duration-500"
            style={{ width: `${((currentPollIndex + 1) / polls.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Compliments Received */}
      <div className="glass-morphism rounded-2xl p-6">
        <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
          <Heart className="mr-2 text-pink-400" size={20} />
          Compliments You've Received
        </h3>

        {mockReceivedCompliments.length === 0 ? (
          <div className="text-center py-8">
            <Heart className="text-white/30 mx-auto mb-3" size={48} />
            <p className="text-white/70">No compliments yet</p>
            <p className="text-white/50 text-sm">Stay active and kind - they'll come!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {mockReceivedCompliments.map((compliment) => (
              <div key={compliment.id} className="bg-white/5 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-white font-medium text-sm flex-1">
                    "{compliment.question}"
                  </p>
                  <button className="ml-3 p-1">
                    <ThumbsUp 
                      className={`${compliment.isLiked ? 'text-blue-400 fill-blue-400' : 'text-white/50'}`} 
                      size={16} 
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-xs">{compliment.senderHint}</span>
                  <span className="text-white/50 text-xs">
                    {compliment.sentAt.toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-morphism rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">47</div>
          <div className="text-white/70 text-sm">Compliments Sent</div>
          <div className="text-pink-400 text-xs">+47 XP earned</div>
        </div>
        <div className="glass-morphism rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">23</div>
          <div className="text-white/70 text-sm">Compliments Received</div>
          <div className="text-pink-400 text-xs">Popular this week!</div>
        </div>
      </div>

      {/* How It Works */}
      <div className="glass-morphism rounded-2xl p-6">
        <h3 className="text-white font-semibold text-lg mb-4">How It Works</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-pink-400 text-xs font-bold">1</span>
            </div>
            <p className="text-white/80">Vote for classmates in fun, positive polls</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-pink-400 text-xs font-bold">2</span>
            </div>
            <p className="text-white/80">Your votes are sent as anonymous compliments</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-pink-400 text-xs font-bold">3</span>
            </div>
            <p className="text-white/80">Earn XP for spreading positivity!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compliments;
