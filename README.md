# DSAMate v2 – GSSoC '25

<div align="center">
  <p>
    <a href="https://www.buymeacoffee.com/saumyayadav">
      <img src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" />
    </a>
  <br /><br />
    <img src="https://img.shields.io/github/contributors/saumyayadav25/cpp-dsa-sheet-testing" />
    <img src="https://img.shields.io/github/languages/count/saumyayadav25/cpp-dsa-sheet-testing" />
    <img src="https://img.shields.io/github/stars/saumyayadav25/cpp-dsa-sheet-testing" />
    <img src="https://img.shields.io/github/forks/saumyayadav25/cpp-dsa-sheet-testing" />
    <img src="https://img.shields.io/github/last-commit/saumyayadav25/cpp-dsa-sheet-testing" />
    <img src="https://img.shields.io/github/license/saumyayadav25/cpp-dsa-sheet-testing" />
    <br />
    <img src="https://img.shields.io/github/issues-raw/saumyayadav25/cpp-dsa-sheet-testing" />
    <img src="https://img.shields.io/github/issues-closed-raw/saumyayadav25/cpp-dsa-sheet-testing" />
    <img src="https://img.shields.io/github/issues-pr-raw/saumyayadav25/cpp-dsa-sheet-testing" />
    <img src="https://img.shields.io/github/issues-pr-closed-raw/saumyayadav25/cpp-dsa-sheet-testing" />
  </p>
</div>

## 🔍 About the Project

**DSAMate v2** is a one-stop platform for practicing Data Structures & Algorithms (DSA) questions.
Built with a focus on learning and contribution, this project offers an interactive UI, smart question filters, and daily practice features. It includes **450+ topic-wise questions with solutions** to help learners strengthen their DSA skills.

As part of **GirlScript Summer of Code (GSSoC) 2025**, the project is open to contributors who want to explore, improve, and expand the features of DSAMate.

The live project is available at [dsamate-v2.vercel.app](https://dsamate-v2.vercel.app).


### 🌟 Features

- **Practice Sheet UI** with advanced filter options (difficulty, status, platform, etc.)
- **Progress Tracking** with comprehensive analytics and visualizations
  - Interactive progress charts and difficulty breakdowns
  - Topic-wise progress tracking with completion percentages
  - Activity calendar showing daily solving patterns
  - Streak tracking to maintain consistency
  - Recent activity feed and performance insights
- **Responsive Design** optimized for all devices using Tailwind CSS
- Built using **Next.js + TypeScript** for modern web development
- Smooth animations via **Framer Motion**
- **Local Storage** persistence for tracking progress across sessions
- Starter structure for adding your own question list

---

## 📊 Progress Tracking Features

The DSAMate v2 now includes a comprehensive progress tracking system to help users monitor their DSA learning journey:

### 🎯 Key Components

1. **Progress Dashboard** (`/progress`)
   - Overview cards showing total solved problems, current streak, completion rate, and problems marked for review
   - Interactive charts displaying difficulty-wise progress breakdown
   - Performance statistics including daily averages and weekly goals

2. **Topic Progress Visualization**
   - Progress bars for each topic showing completion percentage
   - Color-coded indicators for different completion levels
   - Quick identification of completed topics

3. **Activity Calendar**
   - GitHub-style activity heatmap showing daily solving patterns
   - Streak calculation and visualization
   - Historical activity tracking over the last 12 weeks

4. **Recent Activity Feed**
   - Chronological list of recently solved problems
   - Difficulty badges and review status indicators
   - Notes and timestamps for each solved problem

5. **Progress Summary Widget**
   - Integrated into the practice sheet page
   - Quick overview with circular progress indicator
   - Direct link to detailed progress analytics

### 🔧 Technical Implementation

- **Data Persistence**: Progress data is stored in localStorage for persistence across sessions
- **Real-time Updates**: Progress updates automatically when problems are marked as solved
- **Responsive Design**: All progress components are fully responsive and mobile-friendly
- **Smooth Animations**: Framer Motion animations for engaging user experience

---

## 🚀 Open Source Contributions

Please read the [CONTRIBUTING GUIDELINES](CONTRIBUTING.md) if you're a contributor.

---

## 🛠️ Tech Stack

- **Next.js**  
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **React Icons**
---

## 📁 Project Folder Structure
```
📦 saumyayadav25
├─ 📂 .github                # GitHub workflows, issue/PR templates, CI/CD configs
├─ 📂 app                    # Next.js App Router pages & features
│  ├─ 📂 (auth)              # Authentication-related routes
│  ├─ 📂 api                 # API endpoints (server actions, handlers)
│  ├─ 📂 code-analyzer       # Code analysis feature pages
│  ├─ 📂 companies           # Company-wise interview prep & progress
│  ├─ 📂 contributors        # Contributor-related pages
│  ├─ 📂 cp-tracker          # Competitive Programming tracker pages
│  ├─ 📂 email-preference    # Email subscription & preference settings
│  ├─ 📂 flashcards          # Flashcards for study/revision
│  ├─ 📂 interview-experiences # User shared interview experiences
│  ├─ 📂 notes               # Notes-related pages
│  ├─ 📂 privacy-terms       # Privacy policy & terms pages
│  ├─ 📂 profile             # User profile system
│  │  ├─ 📂 [userId]         # Dynamic user profile pages
│  │  └─ 📂 settings         # Profile settings
│  │     └─ 📄 avatar        # Avatar upload/change page
│  ├─ 📂 progress            # User progress tracking pages
│  ├─ 📂 question            # Question detail pages
│  │  └─ 📂 [slug]           # Dynamic route for each question
│  ├─ 📂 sheet               # Curated DSA sheets
│  ├─ 📂 theory-cheatsheets  # Theory-based cheatsheets
│  ├─ 📂 timequiz            # Timed quiz feature
│  ├─ 📄 globals.css         # Global CSS styles
│  ├─ 📄 layout.tsx          # Root app layout
│  └─ 📄 page.tsx            # Homepage
│
├─ 📂 components             # Reusable UI components
│  ├─ 📂 charts              # Chart visualizations (LeetCode, Codeforces stats)
│  ├─ 📂 magicui             # Special UI widgets (e.g., TestimonialPrompt)
│  └─ 📂 ui                  # Common UI components (Navbar, Footer, Flashcard, etc.)
│
├─ 📂 constant               # Project constants
│  └─ 📄 dbName.ts           # Stores DB name (`DSAMate`)
│
├─ 📂 contexts               # React Context providers (global state management)
│
├─ 📂 data                   # Static datasets
│  ├─ 📄 companyQuestions.ts # Company-wise interview questions
│  ├─ 📄 flashcards.ts       # Flashcard data
│  ├─ 📄 questions.json      # DSA questions dataset (used in quizzes)
│  └─ 📄 questions.ts        # TS-based question data
│
├─ 📂 db                     # Database connection setup
│  └─ 📄 config.ts           # MongoDB connection logic with Mongoose
│
├─ 📂 design                 # Design assets
│  └─ 📂 logo-submissions    # Logo design submissions
│
├─ 📂 lib                    # Helpers, services & API integrations
│  ├─ 📂 cp                  # CP tracker related helpers
│  ├─ 📄 awardBadges.ts      # Logic for awarding badges
│  ├─ 📄 mail.ts             # Email sending (OAuth support)
│  ├─ 📄 openaiAnalyze.ts    # Integration with OpenAI API
│  ├─ 📄 sendOTP.ts          # OTP sending logic (auth)
│  ├─ 📄 types.ts            # TypeScript type definitions
│  ├─ 📄 useLocalStorage.ts  # Custom React hook for localStorage
│  └─ 📄 utils.ts            # General helper functions
│
├─ 📂 middleware             # Request middleware utilities
│  └─ 📄 rateLimiter.ts      # Rate limiting using IP (protects API routes)
│
├─ 📂 models                 # Mongoose models (MongoDB collections)
│  ├─ 📄 Badge.model.ts      # User badges
│  ├─ 📄 CpStats.ts          # CP stats tracking
│  ├─ 📄 InterviewExperience.model.ts # Interview experiences
│  ├─ 📄 JobRun.model.ts     # Scheduled jobs (cron/mail runs)
│  ├─ 📄 Progress.model.ts   # User progress tracking
│  ├─ 📄 Testimonials.ts     # User testimonials
│  ├─ 📄 User.model.ts       # User schema (profile, settings, etc.)
│  └─ 📄 quizSchema.ts       # Quiz schema (questions, attempts, scores)
│
├─ 📂 pages                  # Legacy Next.js `pages` dir (mostly API routes)
│  └─ 📂 api                 # API routes (old-style)
│
├─ 📂 public                 # Static assets
│  ├─ 📂 assets              # Other assets
│  ├─ 📂 icons               # Icons
│  ├─ 📂 images              # Images (avatars, hero, quiz, etc.)
│  ├─ 📂 sounds              # Sound files
│  ├─ 📄 manifest.json       # PWA manifest
│  ├─ 📄 sw.js               # Service Worker
│  └─ 📄 workbox-*.js        # Workbox caching script
│
├─ 📂 scripts                # Migration & maintenance scripts
│  └─ 📄 migrateBadges.ts    # Converts old badge data into new schema
│
├─ 📂 utils                  # External API fetchers & helpers
│  ├─ 📄 codeforces.ts       # Codeforces data fetcher
│  ├─ 📄 getPOTD.ts          # Fetch Problem of the Day
│  ├─ 📄 githubContributions.ts # GitHub contributions fetcher
│  └─ 📄 leetcode.ts         # LeetCode data fetcher
│
├─ 📄 .gitignore             # Git ignore rules
├─ 📄 CODE_OF_CONDUCT.md     # Contributor code of conduct
├─ 📄 CONTRIBUTING.md        # Guidelines for contributors
├─ 📄 LEARN.md               # Learning guide/docs
├─ 📄 LICENSE                # Project license
├─ 📄 README.md              # Project documentation
├─ 📄 components.json        # shadcn/ui config
├─ 📄 contributors-data.md   # Contributor details
├─ 📄 get-ip.js              # Utility to fetch client IP
├─ 📄 issue-tracker.txt      # Internal issue tracker notes
├─ 📄 middleware.ts          # Root Next.js middleware
├─ 📄 next.config.ts         # Next.js configuration
├─ 📄 package-lock.json      # Dependency lockfile
├─ 📄 package-lock 2.json    # Duplicate lockfile (cleanup candidate)
├─ 📄 package.json           # Dependencies & scripts
├─ 📄 postcss.config.mjs     # PostCSS (Tailwind) config
└─ 📄 tsconfig.json          # TypeScript config

```

---

### 📚 New to Open Source?

Don’t worry if you’re just getting started - we’ve got you covered!
Check out this blog to kickstart your open-source journey with GSSoC (no experience needed):

👉 [Kickstart Your Open Source Journey with GSSoC – No Experience Needed](https://medium.com/@saumyayadav213/kickstart-your-open-source-journey-with-gssoc-no-experience-needed-39f5934418a0)

We’re here to guide you — don’t hesitate to ask in the Discord group or comment directly on the GitHub issue!

--- 

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

---

## 👥 Contributors

Thanks to all the amazing people who have contributed! 💖

<div align="center">

### :sparkles: Our Valuable Contributors 

<a href="https://github.com/saumyayadav25/cpp-dsa-sheet-testing/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=saumyayadav25/cpp-dsa-sheet-testing&max=1000" />
</a>

![Line](https://user-images.githubusercontent.com/85225156/171937799-8fc9e255-9889-4642-9c92-6df85fb86e82.gif)

</div>
  
Contributions of any kind are welcome!

## License

This project is licensed under the MIT License.  
See the [LICENSE](LICENSE) file for details.

