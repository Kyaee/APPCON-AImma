import { parseISO } from "date-fns";

export function handleUpdateStreak(updateUser, userId, gems, exp, streak, lives) {
  console.log("handleUpdateStreak called with:", { userId, gems, exp, streak, lives });
  
  // INITIALIZE DAILY STATUS
  const dailyStatus = localStorage.getItem("dailyStatus");
  if (!dailyStatus) {
    console.warn("No dailyStatus found in localStorage");
    return;
  }
  
  const parsedDailyStatus = JSON.parse(dailyStatus);
  const now = new Date();
  const nowDayName = now.toLocaleDateString("en-US", { weekday: "long" });

  // FIND INDEX OF TODAY
  const todayIndex = parsedDailyStatus.findIndex((day) => day.full === nowDayName);
  if (todayIndex === -1) {
    console.warn(`Could not find today (${nowDayName}) in dailyStatus`);
    return;
  }
  
  now.setHours(0, 0, 0, 0);

  // Mark today as completed if not already
  if (parsedDailyStatus[todayIndex].status === "completed") {
    console.log(`Today (${nowDayName}) is already marked as completed, not updating streak or rewards.`);
    // Don't update user here - would give duplicate rewards
    localStorage.setItem("dailyStatus", JSON.stringify(parsedDailyStatus));
    return;
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
