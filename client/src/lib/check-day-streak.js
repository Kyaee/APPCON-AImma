import { parseISO } from "date-fns";

export function handleUpdateStreak(updateUser, userId, gems, exp, streak, lives) {
  console.log("handleUpdateStreak called with:", { userId, gems, exp, streak, lives });
  
  // INITIALIZE DAILY STATUS
  const dailyStatus = localStorage.getItem("dailyStatus");
  if (!dailyStatus) {
    console.warn("No dailyStatus found in localStorage, initializing");
    const daysOfWeek = [
      { day: "Mon", full: "Monday", status: "" },
      { day: "Tue", full: "Tuesday", status: "" },
      { day: "Wed", full: "Wednesday", status: "" },
      { day: "Thu", full: "Thursday", status: "" },
      { day: "Fri", full: "Friday", status: "" },
      { day: "Sat", full: "Saturday", status: "" },
      { day: "Sun", full: "Sunday", status: "" },
    ];
    localStorage.setItem("dailyStatus", JSON.stringify(daysOfWeek));
    const parsedDailyStatus = daysOfWeek;
    return handleDailyUpdate(updateUser, userId, gems, exp, streak, lives, parsedDailyStatus);
  }
  
  const parsedDailyStatus = JSON.parse(dailyStatus);
  return handleDailyUpdate(updateUser, userId, gems, exp, streak, lives, parsedDailyStatus);
}

// Helper function to handle the daily update logic
function handleDailyUpdate(updateUser, userId, gems, exp, streak, lives, parsedDailyStatus) {
  const now = new Date();
  const nowDayName = now.toLocaleDateString("en-US", { weekday: "long" });

  // Store today's date as string for tracking
  const today = now.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  
  // FIND INDEX OF TODAY
  const todayIndex = parsedDailyStatus.findIndex((day) => day.full === nowDayName);
  if (todayIndex === -1) {
    console.warn(`Could not find today (${nowDayName}) in dailyStatus`);
    return false;
  }
  
  now.setHours(0, 0, 0, 0);

  // Check if streak was already incremented today
  if (parsedDailyStatus[todayIndex].status === "completed") {
    console.log(`Today (${nowDayName}) is already marked as completed, not updating streak or rewards.`);
    // Don't update user here - would give duplicate rewards
    localStorage.setItem("dailyStatus", JSON.stringify(parsedDailyStatus));
    return false;
  }

  // Only update user if today wasn't already completed
  console.log(`Updating user rewards: ${gems} gems, ${exp} exp, streak: ${streak}, lives: ${lives}`);
  updateUser({
    userId: userId,
    gems: gems,
    exp: exp,
    streak: streak,
    lives: lives,
  });

  // Mark today as completed
  parsedDailyStatus[todayIndex].status = "completed";
  console.log(`Today (${nowDayName}) marked as completed.`);

  localStorage.setItem("dailyStatus", JSON.stringify(parsedDailyStatus));
  
  // Save last update date to prevent multiple increments on same day
  localStorage.setItem("lastStreakUpdate", today);
  
  return true; // Return true to indicate successful update
}

export function checkStreaks(createdAt) {
  const dailyStatus = localStorage.getItem("dailyStatus");
  const parsedDailyStatus = JSON.parse(dailyStatus);

  const now = new Date();
  const nowDayName = now.toLocaleDateString("en-US", { weekday: "long" });
  now.setHours(0, 0, 0, 0);

  const todayIndex = parsedDailyStatus.findIndex(
    (day) => day.full === nowDayName
  );
  const createdDate = parseISO(createdAt);
  const updatedStatus = parsedDailyStatus.map((day, i) => {
    // Calculate the date for this day in the week, relative to today
    const dayDate = new Date(now);
    dayDate.setDate(now.getDate() - (todayIndex - i));
    dayDate.setHours(0, 0, 0, 0);

    if (
      i < todayIndex &&
      dayDate >= createdDate &&
      day.status !== "completed" &&
      day.status !== "missed"
    ) {
      return { ...day, status: "missed" };
    }
    return day;
  });

  localStorage.setItem("dailyStatus", JSON.stringify(updatedStatus));
}
