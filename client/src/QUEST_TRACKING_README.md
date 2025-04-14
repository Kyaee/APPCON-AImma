# Quest Tracking System Implementation

This document explains the implementation of the quest tracking system for APPCON-AImma.

## Overview

The quest tracking system allows users to complete quests such as:

- Completing lesson assessments
- Studying for specific time periods (30 min, 1 hour)
- Achieving 100% on tests
- Reviewing previous lessons

The system tracks progress, updates Supabase, and awards rewards (gems, XP) upon completion.

## Implementation Details

### 1. Quest Store (useQuestStore.js)

A central store that maintains quest state and provides functions for:

- Tracking quest completion
- Resetting daily quests
- Updating Supabase with rewards
- Tracking study time
- Tracking lesson reviews

### 2. Time Tracking (timeTracker.js)

A utility that:

- Tracks time spent on lessons
- Automatically completes time-based quests when thresholds are met
- Efficiently tracks time even if user navigates away and comes back

### 3. API Updates (UPDATE.js)

Functions for:

- Updating user quest completion in Supabase
- Updating rewards from assessments
- Updating streaks
- Optimized fetching of user data

### 4. Component Updates

#### QuestPanel Component

- Now uses quest store for state
- Synchronizes with Supabase
- Resets quests daily

#### Lesson Component

- Tracks time spent for time-based quests
- Tracks lesson reviews for "Review 3 lessons" quest

#### LessonAssessment Component

- Tracks assessment completion for "Complete 1 Lesson Test" quest
- Tracks perfect scores for "Achieve 100% on a test" quest
- Updates Supabase with rewards

#### Profile Component

- Displays updated quest progress
- Shows rewards from completed quests

## Data Flow

1. User actions (studying, completing tests, etc.) are tracked in real-time
2. Quest progress is updated in the quest store
3. When quests are completed, rewards are calculated
4. Supabase is updated with rewards and quest completion
5. UI is updated to reflect progress

## Optimization

- Reduced API calls by batching updates
- Used a single store for quest state to avoid redundant state
- Implemented efficient time tracking
- Combined data fetching to minimize requests

## Usage

The quest system works automatically in the background as users interact with the application. No specific user actions are needed to trigger quest tracking - it happens as they naturally use the platform.

## Future Improvements

- Weekly quest implementation (currently basic structure only)
- More detailed quest progress tracking
- Additional quest types
- Quest notifications
