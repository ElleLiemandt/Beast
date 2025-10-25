# How to Run the MrBeast Community App

## Quick Start

Since Node.js isn't currently installed on your system, here are your options to run the app:

### Option 1: Install Node.js (Recommended)

1. **Install Node.js**
   - Go to [nodejs.org](https://nodejs.org)
   - Download and install the LTS version for macOS
   - This will also install npm (Node Package Manager)

2. **Open Terminal and navigate to the project**
   ```bash
   cd /Users/ellebelle/mrbeast-community-app
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   - The app will automatically open at `http://localhost:3000`
   - If it doesn't open automatically, navigate to that URL manually

### Option 2: Use Online Development Environment

You can copy all the files to an online React development environment like:
- **CodeSandbox.io**
- **StackBlitz.com**
- **Replit.com**

Just upload the files and the environment will handle the dependencies automatically.

## What You'll See

The app starts with a beautiful login screen and then shows:

1. **Home Dashboard** - Overview of your progress, quick actions, daily challenges
2. **Compliments** - Anonymous positive polls to send compliments to classmates
3. **Donations** - Interactive 3D globe showing global causes with "Beast Signals"
4. **Events** - Local volunteer opportunities with RSVP system
5. **Leaderboard** - Rankings showing top contributors in school/city/state/global
6. **Profile** - Your stats, badges, level progression, and settings

## Demo Features

The app includes realistic mock data so you can explore all features:

- **Send anonymous compliments** through fun polls
- **Explore the 3D donation globe** - click and drag to rotate, tap signals to see causes
- **Browse volunteer events** and RSVP to join
- **View leaderboards** and see where you rank
- **Check your profile** with XP, level progression, and badges
- **Ambassador features** - create events if you're an ambassador

## Key Interactions

- **Navigation**: Bottom tab bar for easy mobile navigation
- **3D Globe**: Interactive - drag to rotate, tap on glowing signals to explore causes
- **Compliment Polls**: Tap on a person's name to send them an anonymous compliment
- **XP System**: Every positive action earns XP (compliments +1, donations +$1, events +10-15)
- **Level Progression**: Watch your level and title change as you earn XP

## Mobile-First Design

The app is designed specifically for mobile devices (like teens use), but works great on desktop too. For the best experience, try it on your phone's browser or use Chrome's mobile device simulator (F12 → Device toolbar).

## Technologies Used

- **React 18** with TypeScript for robust development
- **Tailwind CSS** for beautiful, responsive styling
- **HTML5 Canvas** for the interactive 3D globe
- **Modern ES6+** JavaScript features
- **Mobile-first responsive design**

## Troubleshooting

If you encounter any issues:

1. **Make sure Node.js is properly installed**: `node --version` should show v16+
2. **Clear npm cache if needed**: `npm cache clean --force`
3. **Delete node_modules and reinstall**: `rm -rf node_modules && npm install`
4. **Check that all files are in the correct location**

The app should work perfectly once Node.js is set up! 🚀
