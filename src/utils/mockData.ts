import { User, ComplimentPoll, Cause, Event, Leaderboard, Badge } from '../types';

// Mock user data
export const mockUser: User = {
  id: '1',
  username: 'kindness_hero',
  email: 'user@example.com',
  firstName: 'Alex',
  lastName: 'Johnson',
  school: 'Lincoln High School',
  grade: 11,
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b1f4aca4?w=150&h=150&fit=crop&crop=face',
  xp: 1250,
  level: 8,
  badges: [
    {
      id: 'b1',
      name: 'First Compliment',
      description: 'Sent your first compliment',
      icon: '💝',
      earnedAt: new Date('2024-01-15'),
    },
    {
      id: 'b2',
      name: 'Generous Giver',
      description: 'Donated to 5 different causes',
      icon: '🌟',
      earnedAt: new Date('2024-02-20'),
    },
  ],
  isVerified: true,
  isAmbassador: true,
  ambassadorLevel: 'school',
  createdAt: new Date('2024-01-10'),
};

// Mock compliment polls
export const mockComplimentPolls: ComplimentPoll[] = [
  {
    id: 'p1',
    question: 'Who has the brightest smile?',
    options: [
      { ...mockUser, id: '2', firstName: 'Emma', lastName: 'Davis' },
      { ...mockUser, id: '3', firstName: 'Jake', lastName: 'Wilson' },
      { ...mockUser, id: '4', firstName: 'Sophie', lastName: 'Brown' },
      { ...mockUser, id: '5', firstName: 'Michael', lastName: 'Taylor' },
    ],
    category: 'personality',
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    id: 'p2',
    question: 'Who is most likely to become a teacher?',
    options: [
      { ...mockUser, id: '6', firstName: 'Olivia', lastName: 'Anderson' },
      { ...mockUser, id: '7', firstName: 'Lucas', lastName: 'Martinez' },
      { ...mockUser, id: '8', firstName: 'Ava', lastName: 'Garcia' },
      { ...mockUser, id: '9', firstName: 'Ethan', lastName: 'Rodriguez' },
    ],
    category: 'achievements',
    expiresAt: new Date(Date.now() + 18 * 60 * 60 * 1000),
  },
  {
    id: 'p3',
    question: 'Who always helps others?',
    options: [
      { ...mockUser, id: '10', firstName: 'Mia', lastName: 'Jackson' },
      { ...mockUser, id: '11', firstName: 'Noah', lastName: 'White' },
      { ...mockUser, id: '12', firstName: 'Isabella', lastName: 'Lee' },
      { ...mockUser, id: '13', firstName: 'James', lastName: 'Harris' },
    ],
    category: 'kindness',
    expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
  },
];

// Mock causes for donation map
export const mockCauses: Cause[] = [
  {
    id: 'c1',
    title: 'Plant 1,000 Trees in California',
    description: 'Help reforest areas affected by wildfires',
    organization: 'TeamTrees',
    category: 'environment',
    location: { lat: 36.7783, lng: -119.4179, country: 'USA', region: 'California' },
    targetAmount: 10000,
    currentAmount: 7350,
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
    isVerified: true,
    isMrBeastCampaign: true,
    donationUrl: 'https://teamtrees.org',
  },
  {
    id: 'c2',
    title: 'Clean Water for Rural Schools',
    description: 'Provide clean drinking water to 50 schools in Kenya',
    organization: 'Water.org',
    category: 'health',
    location: { lat: -1.2921, lng: 36.8219, country: 'Kenya', region: 'Nairobi' },
    targetAmount: 25000,
    currentAmount: 18700,
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    isVerified: true,
    isMrBeastCampaign: false,
    donationUrl: 'https://water.org',
  },
  {
    id: 'c3',
    title: 'Feed 1,000 Families This Holiday',
    description: 'Provide holiday meals to families in need',
    organization: 'Local Food Bank',
    category: 'poverty',
    location: { lat: 40.7128, lng: -74.0060, country: 'USA', region: 'New York' },
    targetAmount: 15000,
    currentAmount: 12800,
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop',
    isVerified: true,
    isMrBeastCampaign: false,
    donationUrl: 'https://foodbank.org',
  },
  {
    id: 'c4',
    title: 'Save the Ocean - Plastic Cleanup',
    description: 'Remove plastic waste from ocean waters',
    organization: 'TeamSeas',
    category: 'environment',
    location: { lat: 21.3099, lng: -157.8581, country: 'USA', region: 'Hawaii' },
    targetAmount: 30000,
    currentAmount: 22100,
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    isVerified: true,
    isMrBeastCampaign: true,
    donationUrl: 'https://teamseas.org',
  },
];

// Mock events
export const mockEvents: Event[] = [
  {
    id: 'e1',
    title: 'Community Park Cleanup',
    description: 'Join us for a fun morning cleaning up Riverside Park! We\'ll provide all supplies.',
    category: 'cleanup',
    hostId: '1',
    hostName: 'Alex Johnson',
    location: {
      address: '123 Park Ave, Lincoln City',
      lat: 40.7589,
      lng: -73.9851,
    },
    startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000), // 3 hours later
    maxParticipants: 30,
    currentParticipants: 18,
    requirements: 'Bring water bottle and wear old clothes',
    isApproved: true,
    approvedBy: 'City Ambassador Sarah',
    rsvps: ['2', '3', '4', '5'],
    attendees: [],
  },
  {
    id: 'e2',
    title: 'Food Drive for Local Shelter',
    description: 'Help collect non-perishable food items for families in need.',
    category: 'food-drive',
    hostId: '2',
    hostName: 'Emma Davis',
    location: {
      address: '456 School St, Lincoln City',
      lat: 40.7505,
      lng: -73.9934,
    },
    startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000), // 4 hours later
    maxParticipants: 20,
    currentParticipants: 12,
    requirements: 'Bring canned goods or non-perishable items',
    isApproved: true,
    approvedBy: 'School Ambassador Alex',
    rsvps: ['1', '3', '6', '7'],
    attendees: [],
  },
  {
    id: 'e3',
    title: 'Animal Shelter Volunteer Day',
    description: 'Spend time with rescue animals and help with daily care activities.',
    category: 'shelter',
    hostId: '3',
    hostName: 'Jake Wilson',
    location: {
      address: '789 Animal Rd, Lincoln City',
      lat: 40.7282,
      lng: -74.0776,
    },
    startTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000), // 2 hours later
    maxParticipants: 15,
    currentParticipants: 8,
    requirements: 'Must be comfortable around animals',
    isApproved: true,
    approvedBy: 'City Ambassador Sarah',
    rsvps: ['1', '2', '4'],
    attendees: [],
  },
];

// Mock leaderboards
export const mockLeaderboard: Leaderboard = {
  id: 'l1',
  type: 'school',
  scope: 'Lincoln High School',
  period: 'monthly',
  users: [
    {
      userId: '1',
      username: 'kindness_hero',
      xp: 1250,
      rank: 1,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b1f4aca4?w=50&h=50&fit=crop&crop=face',
      badges: mockUser.badges,
    },
    {
      userId: '2',
      username: 'helping_hands',
      xp: 1100,
      rank: 2,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      badges: [],
    },
    {
      userId: '3',
      username: 'good_vibes',
      xp: 980,
      rank: 3,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      badges: [],
    },
    {
      userId: '4',
      username: 'volunteer_star',
      xp: 875,
      rank: 4,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      badges: [],
    },
    {
      userId: '5',
      username: 'community_champion',
      xp: 750,
      rank: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face',
      badges: [],
    },
  ],
  lastUpdated: new Date(),
};

// Experience levels and requirements
export const XP_LEVELS = [
  { level: 1, minXP: 0, title: 'Kindness Newbie', color: '#94a3b8' },
  { level: 2, minXP: 50, title: 'Helpful Helper', color: '#64748b' },
  { level: 3, minXP: 150, title: 'Good Deed Doer', color: '#06b6d4' },
  { level: 4, minXP: 300, title: 'Community Friend', color: '#0ea5e9' },
  { level: 5, minXP: 500, title: 'Kindness Warrior', color: '#3b82f6' },
  { level: 6, minXP: 750, title: 'Helpful Hero', color: '#6366f1' },
  { level: 7, minXP: 1000, title: 'Generous Giver', color: '#8b5cf6' },
  { level: 8, minXP: 1200, title: 'Community Champion', color: '#a855f7' },
  { level: 9, minXP: 1500, title: 'Altruism All-Star', color: '#d946ef' },
  { level: 10, minXP: 2000, title: 'Beast Mode Helper', color: '#ff6b35' },
];

export function getUserLevel(xp: number) {
  for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= XP_LEVELS[i].minXP) {
      return XP_LEVELS[i];
    }
  }
  return XP_LEVELS[0];
}

export function getProgressToNextLevel(xp: number) {
  const currentLevel = getUserLevel(xp);
  const nextLevelIndex = XP_LEVELS.findIndex(level => level.level === currentLevel.level) + 1;
  
  if (nextLevelIndex >= XP_LEVELS.length) {
    return { progress: 100, remaining: 0, nextLevel: null };
  }
  
  const nextLevel = XP_LEVELS[nextLevelIndex];
  const progress = ((xp - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100;
  const remaining = nextLevel.minXP - xp;
  
  return { progress, remaining, nextLevel };
}
