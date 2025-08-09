import axios from "axios";

export const fetchLeetCodeStats = async (username: string) => {
  const query = `
    query {
      matchedUser(username: "${username}") {
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
        userCalendar {
          submissionCalendar
        }
      }
    }
  `;

  const res = await axios.post("https://leetcode.com/graphql", { query });
  const user = res.data?.data?.matchedUser;

  const data = user?.submitStats?.acSubmissionNum;
  const calendarStr = user?.userCalendar?.submissionCalendar;

  const stats = {
    Easy: data.find((d: any) => d.difficulty === "Easy")?.count || 0,
    Medium: data.find((d: any) => d.difficulty === "Medium")?.count || 0,
    Hard: data.find((d: any) => d.difficulty === "Hard")?.count || 0,
  };
  const Total = stats.Easy + stats.Medium + stats.Hard;

  // Active days = number of unique dates where submissions > 0
  let activeDays = 0;
  if (calendarStr) {
    const calendar = JSON.parse(calendarStr); // keys are timestamps (seconds)
    activeDays = Object.values(calendar).filter((count: any) => count > 0).length;
  }

  return { ...stats, Total, ActiveDays: activeDays };
};
