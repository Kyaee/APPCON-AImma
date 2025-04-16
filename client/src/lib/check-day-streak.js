import { parseISO } from "date-fns";

export function handleUpdateStreak(updateUser, userId, gems, exp, streak, lives) {
  // INITIALIZE DAILY STATUS
  const dailyStatus = localStorage.getItem("dailyStatus");
  const parsedDailyStatus = JSON.parse(dailyStatus);
  const now = new Date();
  const nowDayName = now.toLocaleDateString("en-US", { weekday: "long" });

  // FIND INDEX OF TODAY
  const todayIndex = parsedDailyStatus.findIndex((day) => day.full === nowDayName);
  now.setHours(0, 0, 0, 0);

  // Mark today as completed if not already
  if (parsedDailyStatus[todayIndex].status === "completed") {
    updateUser({
      userId: userId,
      gems: gems,
      exp: exp,
      streak: 0,
      lives: lives,
    });
    console.log(`Today (${nowDayName}) is already marked as completed.`);
    localStorage.setItem("dailyStatus", JSON.stringify(parsedDailyStatus));
    return;
  }

  updateUser({
    userId: userId,
    gems: gems,
    exp: exp,
    streak: streak,
    lives: lives,
  });

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
