# Contributing Guidelines 

🎉 Whether it's fixing a bug, adding a feature, or improving documentation — every contribution matters.

## � Table of Contents

- [🛠️ How to Contribute](#️-how-to-contribute)
- [🔧 Local Development Setup](#-local-development-setup)
  - [📋 Prerequisites](#-prerequisites)
  - [🛠️ Tech Stack Overview](#️-tech-stack-overview)
  - [📦 Install Dependencies](#-1-install-dependencies)
  - [🔐 Environment Variables Setup](#-2-environment-variables-setup)
  - [🗄️ Database Setup](#️-3-database-setup)
  - [🔑 API Keys Setup](#-4-api-keys-setup-optional-but-recommended)
  - [🚀 Run Development Server](#-5-run-the-development-server)
  - [📜 Available Scripts](#-6-available-scripts)
- [✨ Making Your Changes](#-making-your-changes)
- [📤 Submitting Your Changes](#-submitting-your-changes)
- [🔄 Keeping Your Fork Updated](#-keeping-your-fork-updated)
- [🐛 Troubleshooting](#-troubleshooting)
- [🔖 GSSoC'25 Labels & Points](#-gssoc25-labels--points)
- [💡 Additional Tips](#-additional-tips)
- [🎯 Project Structure](#-project-structure)
- [🌟 Features You Can Contribute To](#-features-you-can-contribute-to)

---

## �🛠️ How to Contribute

Thank you for your interest in contributing to this project! Follow the steps below to make your contribution smoothly and effectively:

### ⭐ 1. Star and Fork the Repository

- **Star** this repository to show your support!  
- Click on the **Fork** button at the top-right corner of the repository page. This will create a copy of the repository under your GitHub account.

### 🐛 2. Create or Claim an Issue

- Go to the **Issues** tab and check if the task/feature/bug you want to work on already exists.
- If not, click on **"New Issue"** and clearly describe your suggestion or bug.
- Wait for a maintainer to **assign you the issue** before starting work. This helps avoid duplicate work and ensures coordination.

### 📥 3. Clone Your Fork

Clone the forked repository to your local machine:

```bash
git clone https://github.com/your-username/cpp-dsa-sheet-testing.git
cd cpp-dsa-sheet-testing
```

> Replace your-username with your GitHub username.

### 🌱 4. Create a New Branch

Always create a new branch before making changes:
```bash
git checkout -b feature/your-branch-name
```

> Use a descriptive name like feature/sorting-improvement or fix/header-alignment.

---

## 🔧 Local Development Setup

### 📋 Prerequisites

Make sure you have the following installed on your system:
- **Node.js** (version 18 or higher) - [Download from nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download from git-scm.com](https://git-scm.com/)

### 🛠️ Tech Stack Overview

This project uses:
- **Next.js 15.3.3** (with Turbopack for faster development)
- **TypeScript** for type safety
- **React 19** for UI components
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **MongoDB** (via Mongoose) for database
- **Authentication** (Google OAuth, GitHub OAuth, JWT)
- **Google Gemini AI** for chatbot functionality
- **Nodemailer** for email services

### 📦 1. Install Dependencies

```bash
npm install
```

### 🔐 2. Environment Variables Setup

**Create a `.env.local` file** in the root directory of the project:

```bash
# Required for Database Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority&appName=YourAppName

# Required for GitHub API integration (contributors page)
GITHUB_TOKEN=your_github_personal_access_token

# Required for AI Chatbot Feature
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_KEY=your_gemini_api_key_here

# Required for Authentication
JWT_SECRET=your_jwt_secret_here

# Optional: Google OAuth (for Google login)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

# Optional: GitHub OAuth (for GitHub login)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_REDIRECT_URI=http://localhost:3000/api/auth/github/callback

# Optional: Email functionality
GOOGLE_APP_USER=your_gmail_address
GOOGLE_APP_PASSWORD=your_gmail_app_specific_password
```

### 🗄️ 3. Database Setup

#### Option A: MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string
4. Replace `username`, `password`, and cluster details in `MONGO_URI`

#### Option B: Local MongoDB
1. Install MongoDB locally
2. Use connection string: `mongodb://localhost:27017`

> **Note**: The database name "DSAMate" will be created automatically.

### 🔑 4. API Keys Setup (Optional but Recommended)

#### Google Gemini AI (for chatbot):
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key
3. Add it to `GEMINI_API_KEY` and `GEMINI_KEY`

#### GitHub Token (for contributors page):
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate a new token with `public_repo` scope
3. Add it to `GITHUB_TOKEN`

#### JWT Secret:
```bash
# Generate a random secret (you can use any long random string)
JWT_SECRET=your-super-secret-jwt-key-here
```

### 🚀 5. Run the Development Server

```bash
npm run dev
```

🎉 Open [http://localhost:3000](http://localhost:3000) in your browser to see the application!

### 📜 6. Available Scripts

```bash
npm run dev      # Start development server with Turbopack (faster)
npm run build    # Build the application for production
npm run start    # Start the production server
npm run lint     # Run ESLint to check code quality
```

---

## ✨ Making Your Changes

### 🖥️ UI and Client-Side Logic

- Work within the appropriate directories like `app/`, `components/`, or `lib/`.
- Follow the existing code structure and TypeScript conventions
- Ensure your code follows the project's style guide (ESLint will help)
- Test UI changes locally and ensure responsiveness across different screen sizes
- Update or add comments and documentation as needed

### ⚙️ Server-Side or API Routes

- Modify files under `app/api/` for API endpoints
- Work in `lib/`, `models/`, or `db/` for backend utilities
- Follow backend conventions and maintain clean, modular code
- Test API endpoints using tools like Postman or browser dev tools
- Update any relevant API documentation or comments

### 🎨 Styling Guidelines

- Use **Tailwind CSS** classes for styling
- Follow responsive design principles (`sm:`, `md:`, `lg:`, `xl:` breakpoints)
- Maintain consistency with existing design patterns
- Test on multiple screen sizes

### 🧪 Testing Your Changes

Before submitting your PR:

1. **Run the project locally**: `npm run dev`
2. **Test all functionality** that your changes affect
3. **Check responsive design** on different screen sizes
4. **Run linting**: `npm run lint`
5. **Build the project**: `npm run build` (to catch TypeScript errors)

---

## 📤 Submitting Your Changes

### ✅ 6. Stage and Commit Your Changes

Check the status of your changes:

```bash
git status
```

Add all changes:

```bash
git add .
```

Commit your changes with a meaningful message:

```bash
git commit -m "Add feature: implemented binary search algorithm"
```

### 🚀 7. Push Your Changes

Push your branch to your forked repository:

```bash
git push origin feature/your-branch-name
```

### 🔁 8. Create a Pull Request (PR)

1. Open your forked repository on GitHub
2. Click the "Compare & pull request" button
3. Write a clear and concise title and description for your PR
4. **Include screenshots** for UI changes (before vs after)
5. Specify if your PR is for frontend or backend in the description
6. Submit the PR

### 📸 Important Note

Whenever making changes, try sharing screenshots or visual proof of before vs after as it will be considered a positive way of handling and resolving issues.

### ⏳ 9. Wait for Review

- A project maintainer will review your pull request
- You may be asked to make changes — don't worry, that's part of the collaborative process
- Once approved, your code will be merged into the main branch

---

## 🔄 Keeping Your Fork Updated

### Sync Your Fork (Avoid Merge Conflicts)

To avoid merge conflicts, keep your fork updated:

1. Go to your forked repository on GitHub
2. If it's behind the original repo, you'll see a **"Sync fork"** button
3. Click it → then **"Update branch"**

✅ That's it! Your fork is now up to date 🎉

> 🔍 Note: If you don't see the button, your fork is already updated.

---

## 🐛 Troubleshooting

### Common Issues and Solutions:

1. **Port 3000 already in use**:
   ```bash
   npm run dev -- -p 3001
   ```

2. **Module not found errors**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Environment variables not working**:
   - Ensure `.env.local` is in the root directory
   - Restart the development server after adding new variables
   - Check that variable names match exactly (case-sensitive)

4. **Database connection issues**:
   - Verify your MongoDB URI is correct
   - Check if your IP is whitelisted in MongoDB Atlas
   - Ensure the database user has proper permissions

5. **Build errors**:
   ```bash
   npm run lint        # Check for linting errors
   npm run build       # Check for TypeScript errors
   ```

### Getting Help

If you encounter issues:
- Check existing GitHub issues
- Create a new issue with detailed error descriptions
- Reach out to mentors in the Discord group
- Comment on your PR if you need guidance

---

## 🔖 GSSoC'25 Labels & Points

If your Pull Request (PR) gets merged, please make sure it has the following labels:

- `gssoc25`
- Appropriate `level` label (`level1`, `level2`, `level3`)

Sometimes, the admin or mentor might forget to add these labels. You are encouraged to **politely remind them** in the PR comments.

🧮 You can check your points in the `contributors-data.md` file — it is updated **once a day only**.

---

## 💡 Additional Tips

- Always sync your fork with the upstream repository to stay updated
- Be polite and collaborative in your interactions
- If you're new to open source, don't hesitate to ask for guidance — we're here to help!
- Test your changes thoroughly before submitting
- Follow the existing code style and conventions
- Write meaningful commit messages
- Keep your PRs focused on a single feature or fix

---

## 🎯 Project Structure

```
cpp-dsa-sheet-testing/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── components/        # Page components
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
├── lib/                   # Utility functions
├── models/               # Database models
├── data/                 # Static data (questions.json)
├── db/                   # Database configuration
├── public/               # Static assets
└── utils/                # Helper utilities
```

---

## 🌟 Features You Can Contribute To

- **UI/UX Improvements**: Enhance the user interface and experience
- **New Algorithms**: Add more DSA problem solutions
- **Progress Tracking**: Improve analytics and visualizations
- **Authentication**: Enhance login/signup flows
- **Responsive Design**: Improve mobile experience
- **Performance**: Optimize loading times and animations
- **Accessibility**: Make the app more accessible
- **Documentation**: Improve guides and comments
- **Testing**: Add unit tests and integration tests

---

## Thank You

Thanks again for helping improve this project! 🙏

✨ If you are a complete beginner, read this: [Kickstart Your Open Source Journey with GSSoC - No Experience Needed](https://medium.com/@saumyayadav213/kickstart-your-open-source-journey-with-gssoc-no-experience-needed-39f5934418a0)

### 💬 Need Help?

If you have any doubts or questions regarding the issues or pull requests, feel free to reach out to the mentors:


**Happy Contributing! 🚀**
