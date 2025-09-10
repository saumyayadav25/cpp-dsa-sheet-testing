## Description
Build a Code Analyzer page where users can paste their code in an input box and get the Time Complexity and Space Complexity instantly.

## Key Features
### Code Input Box
- Text area where users can paste code (in any language like cpp, java, python).
- Dropdown for language selection.

### Analyze Button
- On clicking the button, show the expected Time and Space Complexity.
- Show results in a clean card format below the input area.

### Fast & Accurate Analysis
Focus on quick and reasonably accurate estimation of:
- Loop-based complexity (O(n), O(n²), etc.)
- Recursive functions (Fibonacci, Merge Sort patterns)
- Memory allocation (arrays, recursion stack, etc.)

### AI/Heuristics Based (Optional)
- Explore using AI (Google Gemini) or basic heuristics for static code analysis.

### Must be responsive
- Works well on all device sizes.

## Sample UI Flow
```
[ Paste your code here... ]

[ Analyze Complexity ]

Time Complexity: O(n log n)
Space Complexity: O(n)
```

## Acceptance Criteria
- [ ] Code input textarea with syntax highlighting
- [ ] Language selection dropdown (C++, Java, Python)
- [ ] Analysis mode selector (Heuristics/AI)
- [ ] Clean results display with Time & Space complexity
- [ ] Responsive design using Tailwind CSS
- [ ] AI integration with Google Gemini API
- [ ] Error handling for invalid code/API failures
- [ ] Loading states during analysis
- [ ] TypeScript support throughout

## Technical Requirements
- Next.js 15 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Google Gemini API for AI analysis
- Responsive design principles
- Clean, maintainable code structure

## Labels
- `enhancement`
- `feature`
- `frontend`
- `gssoc25`
- `level3` (or appropriate level)

You can apply your own creativity for this. Comment below to get Assigned.
