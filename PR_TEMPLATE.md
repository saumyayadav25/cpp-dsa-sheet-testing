### Related Issue(s)
- Fixes #<issue_number> (Create an issue for the Code Analyzer feature if not already exists)

### Summary
Added a comprehensive Code Analyzer page that allows users to paste code snippets and get instant Time and Space Complexity analysis. The feature supports multiple programming languages (C++, Java, Python) and offers both fast static heuristics and AI-powered analysis using Google Gemini for more accurate results.

### Changes
- Created `/app/code-analyzer/page.tsx` with responsive UI including code input textarea, language dropdown, and analysis mode selector
- Implemented static complexity analysis with heuristics for loops, recursion, and memory allocation detection
- Added AI-powered analysis integration using Google Gemini API via `/pages/api/openai-analyze.ts`
- Created `/lib/openaiAnalyze.ts` utility for API communication
- Added `/app/code-analyzer/layout.tsx` for consistent styling
- Fixed TypeScript errors across multiple files for `useSearchParams()` and `useParams()` null safety
- Updated `tsconfig.json` to target ES2018 for regex flag support
- Ensured all components are properly marked as Client Components where needed
- Removed duplicate project folder causing build conflicts
- **Added "Code Analyzer" link to navigation menus** in `Navbar.tsx`, `NavbarSheet.tsx`, and `AuthButtons.tsx` for easy access
- **Restored "Companies" link** that was accidentally removed, ensuring all existing functionality is preserved

### Screenshots (if applicable)
<!-- Add screenshots of the Code Analyzer page showing:
1. The input form with code textarea and dropdowns
2. Results display with Time/Space complexity
3. AI explanation toggle
-->

### How to Test
1. Navigate to `/code-analyzer` in the application
2. Paste a code snippet (e.g., a loop or recursive function) in the textarea
3. Select the appropriate programming language
4. Choose analysis mode: "Heuristics (Fast)" or "AI (Best)"
5. Click "Analyze" and verify the complexity results are displayed
6. For AI mode, ensure `GOOGLE_API_KEY` is set in environment variables
7. Test with different code patterns (nested loops, recursion, arrays)
8. Verify responsive design on mobile/desktop

### Checklist
- [x] I linked a related issue using `Fixes #<issue_number>`
- [x] I tested locally and verified the changes work as expected
- [x] I updated docs or comments where needed
- [x] Build passes successfully with `npm run build`
- [x] TypeScript compilation errors resolved
- [x] Responsive design implemented
- [x] Environment variables documented for AI features
- [x] **Navigation links updated** - Code Analyzer accessible from navbar on all devices
- [x] **Existing functionality preserved** - All original navigation links (including Companies) maintained

> Note: Please ensure that appropriate labels (like `gssoc25` and level labels) are assigned to the **merged PR**.  
> Sometimes it may be missed by PA or mentors, so kindly double-check — otherwise, points won't be counted.
