export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  school?: string;
  grade?: number;
  avatar?: string;
  xp: number;
  level: number;
  badges: Badge[];
  isVerified: boolean;
  isAmbassador: boolean;
  ambassadorLevel?: 'school' | 'city' | 'state' | 'national';
  createdAt: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
}

export interface ComplimentPoll {
  id: string;
  question: string;
  options: User[];
  category: 'personality' | 'achievements' | 'kindness' | 'fun';
  expiresAt: Date;
}

export interface Compliment {
  id: string;
  pollId: string;
  question: string;
  recipientId: string;
  senderId: string;
  isAnonymous: boolean;
  sentAt: Date;
  isLiked: boolean;
}

export interface Cause {
  id: string;
  title: string;
  description: string;
  organization: string;
  category: 'environment' | 'health' | 'education' | 'poverty' | 'animals' | 'local';
  location: {
    lat: number;
    lng: number;
    country: string;
    region?: string;
  };
  targetAmount: number;
  currentAmount: number;
  imageUrl: string;
  isVerified: boolean;
  isMrBeastCampaign: boolean;
  donationUrl: string;
}

export interface Donation {
  id: string;
  userId: string;
  causeId: string;
  amount: number;
  message?: string;
  isAnonymous: boolean;
  donatedAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: 'cleanup' | 'food-drive' | 'shelter' | 'fundraiser' | 'other';
  hostId: string;
  hostName: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  startTime: Date;
  endTime: Date;
  maxParticipants?: number;
  currentParticipants: number;
  requirements?: string;
  isApproved: boolean;
  approvedBy?: string;
  rsvps: string[];
  attendees: string[];
}

export interface EventRSVP {
  id: string;
  eventId: string;
  userId: string;
  status: 'attending' | 'maybe' | 'declined';
  rsvpedAt: Date;
}

export interface Leaderboard {
  id: string;
  type: 'school' | 'city' | 'state' | 'global';
  scope: string; // school name, city name, etc.
  period: 'weekly' | 'monthly' | 'all-time';
  users: LeaderboardEntry[];
  lastUpdated: Date;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  xp: number;
  rank: number;
  avatar?: string;
  badges: Badge[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  requirements: {
    type: 'compliments_sent' | 'donations_made' | 'events_attended' | 'streak_days';
    count: number;
  };
}

export interface Notification {
  id: string;
  userId: string;
  type: 'compliment_received' | 'event_reminder' | 'level_up' | 'badge_earned';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
}
