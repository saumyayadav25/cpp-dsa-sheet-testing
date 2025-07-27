# Contributing Guidelines  
🎉 Whether it's fixing a bug, adding a feature, or improving documentation — every contribution matters.

---

## 🛠️ How to Contribute

Thank you for your interest in contributing to this project! Follow the steps below to make your contribution smoothly and effectively:

### ⭐ 1. Star and Fork the Repository

- **Star** this repository to show your support!  
- Click on the **Fork** button at the top-right corner of the repository page. This will create a copy of the repository under your GitHub account.

---

### 🐛 2. Create or Claim an Issue

- Go to the **Issues** tab and check if the task/feature/bug you want to work on already exists.
- If not, click on **"New Issue"** and clearly describe your suggestion or bug.
- Wait for a maintainer to **assign you the issue** before starting work. This avoids duplication and ensures smoother coordination.

---

### 📥 3. Clone Your Fork

Clone the forked repository to your local machine:

```bash
git clone https://github.com/user-name/cpp-dsa-sheet-testing.git
cd cpp-dsa-sheet-testing

### 🌱 4. Create a New Branch

Create a dedicated branch for your work:

```bash
git checkout -b feature/your-branch-name


### ✨ 5. Make Your Changes (Next.js Project)

Since this project uses Next.js, there are no separate frontend or backend folders. Follow these updated guidelines:

---

### 🧩 General Code Guidelines

- Structure your changes within the existing Next.js file system (e.g., `app`, `components`, `utils`, `db`, etc.).
- Follow code styling rules using tools like **ESLint** and **Prettier** (if configured).
- Keep UI **responsive** and **accessible** where applicable.
- For logic or data fetching, ensure proper usage of Next.js **server/client components**.

---

### 🗄️ Database-Related Contributions

- Database connection logic resides in the `db` folder.
- The database name and constants are managed inside the `constants` folder.

When modifying DB logic, make sure to:

- Maintain consistency with the existing code structure.
- Update or add appropriate types.
- Test all database-related changes **locally**.



### ✅ 6. Stage and Commit Your Changes

Check the status of your changes:

```bash
git status
````

Add all changes:

```bash
git add .
```

Commit with a clear and descriptive message:

```bash
git commit -m "Add: Binary search implementation in utils"
```



### 🚀 7. Push Your Changes

Push your branch to your fork:

```bash
git push origin feature/your-branch-name


## 📌 Title
Enhancement: Added Feature XYZ with UI & DB Updates

---

## ✨ Description

### 🔧 What I’ve Changed
- Implemented [describe the feature/fix/change clearly — e.g., "JWT-based authentication for secure login"].
- Updated [file/component/module names] to support the new logic.
- Added/modified [routes/models/functions/etc.].
- Fixed [mention any bugs or issues resolved].

### 🧠 Type of Change
- [ ] 🖼️ UI Update  
- [ ] 🧮 Logic/Functionality Update  
- [ ] 🗃️ Database Schema/Data Change  
- [ ] 🐛 Bug Fix  
- [ ] 📦 Dependency Update  

### ✅ Checklist
- [ ] Code compiles without errors
- [ ] Linter passes
- [ ] Unit/integration tests added or updated (if applicable)
- [ ] Changes are documented (code comments or README)

---

## 🖼️ Screenshots (Before vs After)

| Before | After |
|--------|-------|
| *Insert before screenshot* | *Insert after screenshot* |

---

## 📚 Notes for Reviewers
- Ensure environment variables are updated if needed.
- Test the following flows: [list flows].
- Relevant test user credentials (if required): `user@example.com / password123`

---

## 🔗 Related Issues/PRs
Closes #123  
Related to #456  


## ⏳ 8. Wait for Review

- A project maintainer will review your Pull Request (PR).
- You may be asked to make changes — this is a normal and collaborative part of open source development.

---

## 🔄 9. Sync Your Fork (Avoid Merge Conflicts)

To keep your fork updated with the main repository:

1. Go to **your fork** on GitHub.
2. Click the **“Sync fork”** button (if available).
3. Then click **“Update branch”**.

> 🔍 **Note:** If the button doesn’t appear, your fork is already up to date.

---

## 🧪 10. Run Locally

Before submitting or updating your PR, ensure the app runs correctly on your machine:

### 1. Install Dependencies
Make sure you have Node.js and npm installed. Then, run:
```bash
npm install

### 2. Set Up Environment Variables
Create a .env.local file in the root directory and add the required environment variables. Here's an example:
# .env.local
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NEXT_PUBLIC_API_URL=http://localhost:3000/api
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
#

### 3. Start the Development Server
```bash 
npm run dev
```
### 4. Open in Browser
Open your browser and go to `http://localhost:3000` to see the app running.
### 5. Run Tests (if applicable)
If you have tests, run them to ensure everything works as expected:
```bash
npm test
```
---### 11. Submit Your Pull Request
Once your changes are ready and tested:
- Go to the **Pull Requests** tab in the main repository.
- Click on **"New Pull Request"**.
- Select your branch and the main branch of the original repository.
- Fill in the PR template with relevant details about your changes.
- Click **"Create Pull Request"**.
- Mention the issue number if applicable (e.g., "Closes #123").
- Wait for feedback from maintainers and be ready to make adjustments as needed.

### 12. Celebrate Your Contribution! 🎉
Congratulations on making your first contribution! Your efforts help improve the project and make it better for everyone.

### 13. Keep Your Branch Updated
If you continue to work on the same branch, keep it updated with the main branch to avoid merge conflicts:
```bash
git fetch upstream
git checkout main
git merge upstream/main
git checkout feature/your-branch-name
git rebase main
```

### 14. Finalize Your Contribution
Once your PR is approved and merged:
- Delete your feature branch from both your local and remote repositories to keep things tidy:
```bash
git branch -d feature/your-branch-name
git push origin --delete feature/your-branch-name
```
--- 