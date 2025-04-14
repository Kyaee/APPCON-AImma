import { useQuestStore } from '@/store/useQuestStore';

/**
 * Utility class for tracking time spent in lessons
 */
class TimeTracker {
  constructor() {
    this.startTime = null;
    this.elapsedTime = 0; // in milliseconds
    this.isTracking = false;
    this.intervalId = null;
  }

  /**
   * Start tracking time
   */
  start() {
    if (this.isTracking) return;
    
    this.startTime = Date.now();
    this.isTracking = true;
    
    // Update elapsed time every second
    this.intervalId = setInterval(() => {
      this.elapsedTime = Date.now() - this.startTime;
    }, 1000);
  }

  /**
   * Pause tracking time
   */
  pause() {
    if (!this.isTracking) return;
    
    clearInterval(this.intervalId);
    this.elapsedTime = Date.now() - this.startTime;
    this.isTracking = false;
  }

  /**
   * Resume tracking time
   */
  resume() {
    if (this.isTracking) return;
    
    this.startTime = Date.now() - this.elapsedTime;
    this.isTracking = true;
    
    this.intervalId = setInterval(() => {
      this.elapsedTime = Date.now() - this.startTime;
    }, 1000);
  }

  /**
   * Stop tracking time and return elapsed time in minutes
   * @returns {number} Elapsed time in minutes
   */
  stop() {
    if (this.isTracking) {
      clearInterval(this.intervalId);
      this.elapsedTime = Date.now() - this.startTime;
      this.isTracking = false;
    }
    
    // Convert to minutes
    const minutesSpent = Math.floor(this.elapsedTime / (1000 * 60));
    
    // Reset for next tracking session
    this.startTime = null;
    this.elapsedTime = 0;
    
    return minutesSpent;
  }

  /**
   * Get current elapsed time in minutes (for display)
   * @returns {number} Current elapsed time in minutes
   */
  getCurrentTimeInMinutes() {
    if (this.isTracking) {
      return Math.floor((Date.now() - this.startTime) / (1000 * 60));
    }
    return Math.floor(this.elapsedTime / (1000 * 60));
  }
}

// Singleton instance
const timeTracker = new TimeTracker();

/**
 * Hook that returns time tracking functions
 * @param {string} userId - User ID for updating quests
 * @returns {Object} Time tracking functions
 */
export const useTimeTracking = (userId) => {
  const updateStudyTime = useQuestStore(state => state.updateStudyTime);
  
  return {
    startTracking: () => {
      timeTracker.start();
    },
    
    pauseTracking: () => {
      timeTracker.pause();
    },
    
    resumeTracking: () => {
      timeTracker.resume();
    },
    
    stopTracking: () => {
      const minutes = timeTracker.stop();
      if (minutes > 0) {
        updateStudyTime(minutes, userId);
      }
      return minutes;
    },
    
    getCurrentTime: () => {
      return timeTracker.getCurrentTimeInMinutes();
    },
    
    isTracking: () => {
      return timeTracker.isTracking;
    }
  };
};

export default timeTracker; 