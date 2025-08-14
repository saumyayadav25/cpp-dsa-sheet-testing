// lib/cp/fetchHackerEarth.ts
//This Code only gives the no.of Problems solved in HackerEarth(We can't scrap Easy/Medium/hard categerization & no.of the active days from HackerEarth site ,SO THE DASHBOARD WILL ALWAYS SHOW ALL 0's for all sections of HackerEarth stats)  
import { chromium } from "playwright";

export const fetchHackerEarthStats = async (username: string) => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    const url = `https://www.hackerearth.com/@${username}`;
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Wait for metrics to load
    await page.waitForSelector(".metrics-container", { timeout: 15000 }).catch(() => {
      throw new Error("Metrics container did not load — possibly invalid handle or slow site.");
    });


    const getValueByLabel = async (labelText: string) => {
      const labelLocator = page.locator(`.metric:has(.label:has-text("${labelText}")) .value`);
      if (await labelLocator.count()) {
        const value = await labelLocator.first().textContent();
        return parseInt(value?.trim() || "0");
      }
      return 0;
    };

    const points = await getValueByLabel("Points");
    const contestRating = await getValueByLabel("Contest ratings");
    const problemsSolved = await getValueByLabel("Problem solved");
    const submissions = await getValueByLabel("Solutions submitted");

    await browser.close();

    return {
      Points: points,
      ContestRating: contestRating,
      ProblemsSolved: problemsSolved,
      Submissions: submissions,
      Total: problemsSolved, // fallback mapping
      Easy: problemsSolved,  //NOTE : Currently hackerEarth code can only count no.of problems so pushing them all to "Easy" so as to display the count on HackerEarth Stats card
      Medium: null,
      Hard: null,
      ActiveDays: null
    };
  } catch (err) {
    console.log("Failed to scraped")  //because wrong handle
    await browser.close();
    return null;
  }
};
