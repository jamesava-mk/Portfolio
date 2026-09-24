const GITHUB_USERNAME = "jamesava-mk";

const query = `
  query($username: String!) {
    user(login: $username) {
      login

      repositories(
        first: 100
        ownerAffiliations: OWNER
        isFork: false
      ) {
        totalCount

        nodes {
          name
          primaryLanguage {
            name
          }
        }
      }

      contributionsCollection {
        contributionCalendar {
          totalContributions

          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

export default async function handler(req, res) {
  try {
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      console.error("GITHUB_TOKEN is missing");

      return res.status(500).json({
        error: "GITHUB_TOKEN is not configured",
      });
    }

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github+json",
        "User-Agent": "jamesava-mk-portfolio",
      },
      body: JSON.stringify({
        query,
        variables: {
          username: GITHUB_USERNAME,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("GitHub HTTP error:", response.status, data);

      return res.status(502).json({
        error: "Unable to connect to GitHub",
        status: response.status,
      });
    }

    if (data.errors?.length) {
      console.error("GitHub GraphQL errors:", data.errors);

      return res.status(502).json({
        error: "GitHub GraphQL request failed",
      });
    }

    const user = data?.data?.user;

    if (!user) {
      return res.status(404).json({
        error: `GitHub user "${GITHUB_USERNAME}" was not found`,
      });
    }

    const calendar =
      user.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      return res.status(502).json({
        error: "GitHub contribution calendar is unavailable",
      });
    }

    /*
     * Flatten the contribution calendar into individual days.
     */
    const contributionDays = calendar.weeks
      .flatMap((week) => week.contributionDays || [])
      .sort((a, b) => a.date.localeCompare(b.date));

    /*
     * Calculate active days.
     */
    const activeDays = contributionDays.filter(
      (day) => day.contributionCount > 0
    );

    /*
     * Calculate longest streak.
     */
    let longestStreak = 0;
    let runningStreak = 0;

    for (const day of contributionDays) {
      if (day.contributionCount > 0) {
        runningStreak += 1;
        longestStreak = Math.max(longestStreak, runningStreak);
      } else {
        runningStreak = 0;
      }
    }

    /*
     * Calculate current streak.
     *
     * GitHub's calendar includes today, so walk backwards
     * through the most recent contribution days.
     */
    let currentStreak = 0;

    for (let i = contributionDays.length - 1; i >= 0; i -= 1) {
      if (contributionDays[i].contributionCount > 0) {
        currentStreak += 1;
      } else {
        break;
      }
    }

    /*
     * Count repositories by primary language.
     */
    const languageCounts = {};

    for (const repo of user.repositories?.nodes || []) {
      const language = repo.primaryLanguage?.name;

      if (!language) continue;

      languageCounts[language] =
        (languageCounts[language] || 0) + 1;
    }

    const languages = Object.entries(languageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name]) => name);

    /*
     * Return the real GitHub data.
     */
    const result = {
      username: user.login,

      repositories: user.repositories?.totalCount || 0,

      contributions: calendar.totalContributions || 0,

      activeDays: activeDays.length,

      currentStreak,

      longestStreak,

      languages,

      contributionDays,

      updatedAt: new Date().toISOString(),
    };

    res.setHeader(
      "Cache-Control",
      "s-maxage=600, stale-while-revalidate=3600"
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error("GitHub stats error:", error);

    return res.status(500).json({
      error: "Something went wrong while fetching GitHub statistics",
    });
  }
}