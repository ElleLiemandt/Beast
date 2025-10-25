import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Plus, CheckCircle, Star, Filter } from 'lucide-react';
import { User, Event } from '../types';
import { mockEvents } from '../utils/mockData';

interface EventsProps {
  user: User | null;
}

const Events: React.FC<EventsProps> = ({ user }) => {
  const [events] = useState<Event[]>(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'my-events'>('upcoming');
  const [showCreateModal, setShowCreateModal] = useState(false);

  if (!user) return null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const formatDuration = (start: Date, end: Date) => {
    const hours = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60));
    return `${hours}h`;
  };

  const filteredEvents = events.filter(event => {
    const now = new Date();
    switch (filter) {
      case 'upcoming':
        return event.startTime > now;
      case 'my-events':
        return event.rsvps.includes(user.id) || event.hostId === user.id;
      default:
        return true;
    }
  });

  const handleRSVP = (eventId: string) => {
    // TODO: Handle RSVP logic
    console.log('RSVP to event:', eventId);
  };

  const categoryColors = {
    'cleanup': 'bg-green-500',
    'food-drive': 'bg-orange-500',
    'shelter': 'bg-purple-500',
    'fundraiser': 'bg-blue-500',
    'other': 'bg-gray-500',
  };

  const categoryIcons = {
    'cleanup': '🌱',
    'food-drive': '🍲',
    'shelter': '🐕',
    'fundraiser': '💝',
    'other': '🤝',
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Calendar className="text-blue-400" size={24} />
          <h2 className="text-2xl font-bold text-white">Community Events</h2>
        </div>
        <p className="text-white/80">Join local volunteer opportunities</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-morphism rounded-xl p-3 text-center">
          <div className="text-xl font-bold text-white">8</div>
          <div className="text-white/70 text-xs">Events Attended</div>
        </div>
        <div className="glass-morphism rounded-xl p-3 text-center">
          <div className="text-xl font-bold text-white">24</div>
          <div className="text-white/70 text-xs">Hours Volunteered</div>
        </div>
        <div className="glass-morphism rounded-xl p-3 text-center">
          <div className="text-xl font-bold text-white">+180</div>
          <div className="text-white/70 text-xs">XP Earned</div>
        </div>
      </div>

      {/* Filter Tabs and Create Button */}
      <div className="flex items-center justify-between">
        <div className="glass-morphism rounded-xl p-1 flex-1 mr-3">
          <div className="grid grid-cols-3 gap-1">
            {[
              { key: 'upcoming', label: 'Upcoming' },
              { key: 'all', label: 'All Events' },
              { key: 'my-events', label: 'My Events' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 ${
                  filter === key
                    ? 'bg-beast-orange text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        
        {user.isAmbassador && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-3 rounded-xl hover:from-blue-500 hover:to-green-500 transition-all duration-300"
          >
            <Plus size={20} />
          </button>
        )}
      </div>

      {/* Weekly Schedule Preview */}
      <div className="glass-morphism rounded-2xl p-4">
        <h3 className="text-white font-semibold mb-3 flex items-center">
          <Star className="mr-2 text-yellow-400" size={16} />
          Kindness Wednesday - Oct 30
        </h3>
        <div className="bg-gradient-to-r from-beast-orange/20 to-yellow-400/20 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🌟</div>
            <div>
              <div className="text-white font-medium">Weekly Community Event</div>
              <div className="text-white/70 text-sm">Every Wednesday @ 7:00 PM</div>
              <div className="text-yellow-400 text-sm">Join the movement!</div>
            </div>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {filteredEvents.map((event) => {
          const isRSVPed = event.rsvps.includes(user.id);
          const isHost = event.hostId === user.id;
          const isFull = event.maxParticipants && event.currentParticipants >= event.maxParticipants;
          
          return (
            <div key={event.id} className="glass-morphism rounded-2xl p-4">
              {/* Event Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className={`w-12 h-12 ${categoryColors[event.category]} rounded-xl flex items-center justify-center text-white text-lg`}>
                    {categoryIcons[event.category]}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg">{event.title}</h3>
                    <p className="text-white/70 text-sm">Hosted by {event.hostName}</p>
                    {isHost && (
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="text-yellow-400" size={12} />
                        <span className="text-yellow-400 text-xs font-medium">You're hosting</span>
                      </div>
                    )}
                  </div>
                </div>
                {isRSVPed && (
                  <CheckCircle className="text-green-400" size={20} />
                )}
              </div>

              {/* Event Details */}
              <p className="text-white/80 text-sm mb-3">{event.description}</p>

              {/* Event Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-white/70 text-sm">
                  <Clock size={14} />
                  <span>{formatDate(event.startTime)}</span>
                  <span>•</span>
                  <span>{formatDuration(event.startTime, event.endTime)}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-white/70 text-sm">
                  <MapPin size={14} />
                  <span>{event.location.address}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-white/70 text-sm">
                  <Users size={14} />
                  <span>
                    {event.currentParticipants} going
                    {event.maxParticipants && ` • ${event.maxParticipants - event.currentParticipants} spots left`}
                  </span>
                </div>
              </div>

              {/* Requirements */}
              {event.requirements && (
                <div className="bg-blue-500/20 rounded-lg p-3 mb-4">
                  <p className="text-blue-300 text-sm">
                    <strong>Requirements:</strong> {event.requirements}
                  </p>
                </div>
              )}

              {/* Action Button */}
              <div className="flex space-x-2">
                {isHost ? (
                  <button className="flex-1 bg-purple-500/30 text-purple-300 py-2 px-4 rounded-lg text-sm font-medium">
                    Manage Event
                  </button>
                ) : isRSVPed ? (
                  <button className="flex-1 bg-green-500/30 text-green-300 py-2 px-4 rounded-lg text-sm font-medium">
                    ✓ You're Going
                  </button>
                ) : isFull ? (
                  <button className="flex-1 bg-red-500/30 text-red-300 py-2 px-4 rounded-lg text-sm font-medium cursor-not-allowed">
                    Event Full
                  </button>
                ) : (
                  <button
                    onClick={() => handleRSVP(event.id)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-blue-500 hover:to-green-500 transition-all"
                  >
                    RSVP Now (+10 XP)
                  </button>
                )}
                
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="bg-white/10 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-white/20 transition-all"
                >
                  Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="glass-morphism rounded-2xl p-8 text-center">
          <Calendar className="text-white/30 mx-auto mb-4" size={48} />
          <h3 className="text-white font-semibold mb-2">No events found</h3>
          <p className="text-white/70 text-sm mb-4">
            {filter === 'upcoming' ? 'No upcoming events in your area' : 'Try changing your filter'}
          </p>
          {user.isAmbassador && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-blue-500 hover:to-green-500 transition-all"
            >
              Create First Event
            </button>
          )}
        </div>
      )}

      {/* How It Works */}
      <div className="glass-morphism rounded-2xl p-6">
        <h3 className="text-white font-semibold text-lg mb-4">How Volunteering Works</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-400 text-xs font-bold">1</span>
            </div>
            <p className="text-white/80">RSVP to events that interest you</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-400 text-xs font-bold">2</span>
            </div>
            <p className="text-white/80">Show up and help make a difference</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-400 text-xs font-bold">3</span>
            </div>
            <p className="text-white/80">Check in at the event to earn XP and badges!</p>
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-morphism rounded-2xl p-6 w-full max-w-sm max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-xl">{selectedEvent.title}</h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-white/80">{selectedEvent.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-white/70">
                  <Clock size={16} />
                  <span>{formatDate(selectedEvent.startTime)}</span>
                </div>
                <div className="flex items-center space-x-2 text-white/70">
                  <MapPin size={16} />
                  <span>{selectedEvent.location.address}</span>
                </div>
                <div className="flex items-center space-x-2 text-white/70">
                  <Users size={16} />
                  <span>{selectedEvent.currentParticipants} people going</span>
                </div>
              </div>

              {selectedEvent.requirements && (
                <div className="bg-blue-500/20 rounded-lg p-3">
                  <p className="text-blue-300 text-sm">
                    <strong>What to bring:</strong> {selectedEvent.requirements}
                  </p>
                </div>
              )}

              <div className="pt-4">
                <button
                  onClick={() => {
                    handleRSVP(selectedEvent.id);
                    setSelectedEvent(null);
                  }}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-500 hover:to-green-500 transition-all"
                >
                  RSVP to This Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
