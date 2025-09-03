export type CompanyQuestion = {
  id: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isSolved: boolean;
  isMarkedForRevision: boolean;
  links: {
    leetcode?: string;
    gfg?: string;
    hackerrank?: string;
    spoj?: string;
    ninja?: string;
    code?: string;
    custom?: string;
  };
  solutionLink?: string;
  frequency: 'low' | 'medium' | 'high' | 'very-high'; // How frequently asked
  lastAsked?: string; // Year when last asked
  tags: string[]; // Topic tags like 'arrays', 'dp', 'graphs'
  description?: string; // Brief description of the problem
};

export type Company = {
  id: string;
  name: string;
  logo?: string;
  description: string;
  totalQuestions: number;
  questions: CompanyQuestion[];
  difficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
  popularTags: string[];
};

// Shared questions that appear across multiple companies
export const sharedQuestions: CompanyQuestion[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "easy",
    isSolved: false,
    isMarkedForRevision: false,
    links: {
      leetcode: "https://leetcode.com/problems/two-sum/",
    },
    frequency: "very-high",
    lastAsked: "2024",
    tags: ["arrays", "hash-table"],
    description: "Find two numbers in array that add up to target sum"
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "easy",
    isSolved: false,
    isMarkedForRevision: false,
    links: {
      leetcode: "https://leetcode.com/problems/valid-parentheses/",
    },
    frequency: "high",
    lastAsked: "2024",
    tags: ["stack", "string"],
    description: "Check if string of parentheses is valid"
  },
  {
    id: 3,
    title: "Reverse Linked List",
    difficulty: "easy",
    isSolved: false,
    isMarkedForRevision: false,
    links: {
      leetcode: "https://leetcode.com/problems/reverse-linked-list/",
    },
    frequency: "very-high",
    lastAsked: "2024",
    tags: ["linked-list", "recursion"],
    description: "Reverse a singly linked list"
  },
  {
    id: 4,
    title: "Maximum Subarray (Kadane's Algorithm)",
    difficulty: "medium",
    isSolved: false,
    isMarkedForRevision: false,
    links: {
      leetcode: "https://leetcode.com/problems/maximum-subarray/",
    },
    frequency: "high",
    lastAsked: "2024",
    tags: ["arrays", "dynamic-programming"],
    description: "Find contiguous subarray with largest sum"
  },
  {
    id: 5,
    title: "Binary Tree Inorder Traversal",
    difficulty: "easy",
    isSolved: false,
    isMarkedForRevision: false,
    links: {
      leetcode: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
    },
    frequency: "high",
    lastAsked: "2024",
    tags: ["tree", "dfs", "binary-tree"],
    description: "Traverse binary tree in inorder"
  },
  {
    id: 6,
    title: "Merge Two Sorted Lists",
    difficulty: "easy",
    isSolved: false,
    isMarkedForRevision: false,
    links: {
      leetcode: "https://leetcode.com/problems/merge-two-sorted-lists/",
    },
    frequency: "high",
    lastAsked: "2024",
    tags: ["linked-list", "recursion"],
    description: "Merge two sorted linked lists"
  },
  {
    id: 7,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "easy",
    isSolved: false,
    isMarkedForRevision: false,
    links: {
      leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    },
    frequency: "high",
    lastAsked: "2024",
    tags: ["arrays", "dynamic-programming"],
    description: "Find maximum profit from stock prices"
  },
  {
    id: 8,
    title: "3Sum",
    difficulty: "medium",
    isSolved: false,
    isMarkedForRevision: false,
    links: {
      leetcode: "https://leetcode.com/problems/3sum/",
    },
    frequency: "high",
    lastAsked: "2024",
    tags: ["arrays", "two-pointers"],
    description: "Find all unique triplets that sum to zero"
  },
  {
    id: 9,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "medium",
    isSolved: false,
    isMarkedForRevision: false,
    links: {
      leetcode: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    },
    frequency: "very-high",
    lastAsked: "2024",
    tags: ["string", "sliding-window", "hash-table"],
    description: "Find length of longest substring without repeating characters"
  },
  {
    id: 10,
    title: "Add Two Numbers",
    difficulty: "medium",
    isSolved: false,
    isMarkedForRevision: false,
    links: {
      leetcode: "https://leetcode.com/problems/add-two-numbers/",
    },
    frequency: "high",
    lastAsked: "2024",
    tags: ["linked-list", "math"],
    description: "Add two numbers represented as linked lists"
  }
];

// Company-specific questions (not in the main sheet)
const googleSpecificQuestions: CompanyQuestion[] = [
  {
    id: 101,
    title: "Design Search Autocomplete System",
    difficulty: "hard",
    isSolved: false,
    isMarkedForRevision: false,
    links: {
      leetcode: "https://leetcode.com/problems/design-search-autocomplete-system/",
    },
    frequency: "medium",
    lastAsked: "2024",
    tags: ["design", "trie", "string"],
    description: "Design a search autocomplete system"
  },
  {
    id: 102,
    title: "Meeting Rooms II",
    difficulty: "medium",
    isSolved: false,
    isMarkedForRevision: false,
    links: {
      leetcode: "https://leetcode.com/problems/meeting-rooms-ii/",
    },
    frequency: "high",
    lastAsked: "2024",
    tags: ["intervals", "heap", "greedy"],
    description: "Find minimum number of meeting rooms required"
  },
  {
    id: 103,
    title: "Word Ladder",
    difficulty: "hard",
    isSolved: false,
    isMarkedForRevision: false,
    links: {
      leetcode: "https://leetcode.com/problems/word-ladder/",
    },
    frequency: "medium",
    lastAsked: "2023",
    tags: ["bfs", "string", "hash-table"],
    description: "Find shortest transformation sequence from start to end word"
  }
];

const amazonSpecificQuestions: CompanyQuestion[] = [
  {
    id: 201,
    title: "LRU Cache",
    difficulty: "medium",
    isSolved: false,
    isMarkedForRevision: false,
    links: {
      leetcode: "https://leetcode.com/problems/lru-cache/",
    },
    frequency: "very-high",
    lastAsked: "2024",
    tags: ["design", "hash-table", "linked-list"],
    description: "Design and implement LRU cache"
  },
  {
    id: 202,
    title: "Number of Islands",
    difficulty: "medium",
    isSolved: false,
    isMarkedForRevision: false,
    links: {
      leetcode: "https://leetcode.com/problems/number-of-islands/",
    },
    frequency: "high",
    lastAsked: "2024",
    tags: ["dfs", "bfs", "union-find", "matrix"],
    description: "Count number of islands in 2D grid"
  },
  {
    id: 203,
    title: "Top K Frequent Elements",
    difficulty: "medium",
    isSolved: false,
    isMarkedForRevision: false,
    links: {
      leetcode: "https://leetcode.com/problems/top-k-frequent-elements/",
    },
    frequency: "high",
    lastAsked: "2024",
    tags: ["heap", "hash-table", "bucket-sort"],
    description: "Find k most frequent elements in array"
  }
];

const microsoftSpecificQuestions: CompanyQuestion[] = [
  {
    id: 301,
    title: "Design Tic-Tac-Toe",
    difficulty: "medium",
    isSolved: false,
    isMarkedForRevision: false,
    links: {
      leetcode: "https://leetcode.com/problems/design-tic-tac-toe/",
    },
    frequency: "medium",
    lastAsked: "2024",
    tags: ["design", "array", "hash-table"],
    description: "Design a tic-tac-toe game"
  },
  {
    id: 302,
    title: "Rotate Image",
    difficulty: "medium",
    isSolved: false,
    isMarkedForRevision: false,
    links: {
      leetcode: "https://leetcode.com/problems/rotate-image/",
    },
    frequency: "high",
    lastAsked: "2024",
    tags: ["array", "math", "matrix"],
    description: "Rotate n x n 2D matrix by 90 degrees"
  }
];

const metaSpecificQuestions: CompanyQuestion[] = [
  {
    id: 401,
    title: "Valid Palindrome II",
    difficulty: "easy",
    isSolved: false,
    isMarkedForRevision: false,
    links: {
      leetcode: "https://leetcode.com/problems/valid-palindrome-ii/",
    },
    frequency: "high",
    lastAsked: "2024",
    tags: ["string", "two-pointers"],
    description: "Check if string can be palindrome after deleting at most one character"
  },
  {
    id: 402,
    title: "Binary Tree Vertical Order Traversal",
    difficulty: "medium",
    isSolved: false,
    isMarkedForRevision: false,
    links: {
      leetcode: "https://leetcode.com/problems/binary-tree-vertical-order-traversal/",
    },
    frequency: "medium",
    lastAsked: "2024",
    tags: ["tree", "bfs", "hash-table"],
    description: "Return vertical order traversal of binary tree"
  }
];

const appleSpecificQuestions: CompanyQuestion[] = [
  {
    id: 501,
    title: "Serialize and Deserialize Binary Tree",
    difficulty: "hard",
    isSolved: false,
    isMarkedForRevision: false,
    links: {
      leetcode: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
    },
    frequency: "medium",
    lastAsked: "2024",
    tags: ["tree", "dfs", "bfs", "design"],
    description: "Design algorithm to serialize and deserialize binary tree"
  }
];

// Helper function to combine shared questions with company-specific ones
const combineQuestions = (specificQuestions: CompanyQuestion[], sharedQuestionIds: number[]) => {
  const shared = sharedQuestions.filter(q => sharedQuestionIds.includes(q.id));
  return [...shared, ...specificQuestions];
};

export const companies: Company[] = [
  {
    id: "google",
    name: "Google",
    description: "Search, Cloud, Android, and AI technologies",
    totalQuestions: 0,
    questions: combineQuestions(googleSpecificQuestions, [1, 2, 3, 4, 5, 6, 7, 8, 9]),
    difficulty: { easy: 0, medium: 0, hard: 0 },
    popularTags: ["arrays", "string", "tree", "design", "dynamic-programming"]
  },
  {
    id: "amazon",
    name: "Amazon",
    description: "E-commerce, Cloud Computing (AWS), and Digital Streaming",
    totalQuestions: 0,
    questions: combineQuestions(amazonSpecificQuestions, [1, 2, 3, 4, 6, 7, 8, 9, 10]),
    difficulty: { easy: 0, medium: 0, hard: 0 },
    popularTags: ["arrays", "tree", "design", "dfs", "dynamic-programming"]
  },
  {
    id: "microsoft",
    name: "Microsoft",
    description: "Software, Cloud Services, and Gaming",
    totalQuestions: 0,
    questions: combineQuestions(microsoftSpecificQuestions, [1, 2, 3, 4, 5, 7, 8, 9]),
    difficulty: { easy: 0, medium: 0, hard: 0 },
    popularTags: ["arrays", "string", "tree", "design", "math"]
  },
  {
    id: "meta",
    name: "Meta (Facebook)",
    description: "Social Media, VR/AR, and Metaverse Technologies",
    totalQuestions: 0,
    questions: combineQuestions(metaSpecificQuestions, [1, 2, 3, 4, 5, 6, 8, 9]),
    difficulty: { easy: 0, medium: 0, hard: 0 },
    popularTags: ["arrays", "string", "tree", "hash-table", "two-pointers"]
  },
  {
    id: "apple",
    name: "Apple",
    description: "Consumer Electronics, Software, and Services",
    totalQuestions: 0,
    questions: combineQuestions(appleSpecificQuestions, [1, 2, 3, 4, 5, 6, 7, 9]),
    difficulty: { easy: 0, medium: 0, hard: 0 },
    popularTags: ["arrays", "tree", "string", "design", "linked-list"]
  },
  {
    id: "netflix",
    name: "Netflix",
    description: "Streaming Entertainment and Content Production",
    totalQuestions: 0,
    questions: combineQuestions([], [1, 2, 4, 6, 7, 8, 9]),
    difficulty: { easy: 0, medium: 0, hard: 0 },
    popularTags: ["arrays", "string", "dynamic-programming", "design"]
  },
  {
    id: "uber",
    name: "Uber",
    description: "Ride-sharing, Food Delivery, and Logistics",
    totalQuestions: 0,
    questions: combineQuestions([], [1, 2, 3, 4, 7, 8, 9, 10]),
    difficulty: { easy: 0, medium: 0, hard: 0 },
    popularTags: ["arrays", "string", "design", "graph", "greedy"]
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "Professional Networking and Career Development",
    totalQuestions: 0,
    questions: combineQuestions([], [1, 2, 3, 5, 6, 7, 8]),
    difficulty: { easy: 0, medium: 0, hard: 0 },
    popularTags: ["arrays", "string", "tree", "design", "hash-table"]
  }
];

// Calculate difficulty distribution and total questions for each company
companies.forEach(company => {
  company.totalQuestions = company.questions.length;
  company.difficulty = company.questions.reduce(
    (acc, q) => {
      acc[q.difficulty]++;
      return acc;
    },
    { easy: 0, medium: 0, hard: 0 }
  );
});

// Helper function to get company by id
export const getCompanyById = (id: string): Company | undefined => {
  return companies.find(company => company.id === id);
};

// Helper function to get all unique tags
export const getAllTags = (): string[] => {
  const tagSet = new Set<string>();
  companies.forEach(company => {
    company.questions.forEach(question => {
      question.tags.forEach(tag => tagSet.add(tag));
    });
  });
  return Array.from(tagSet).sort();
};

// Helper function to search questions across all companies
export const searchQuestionsAcrossCompanies = (searchTerm: string): { company: Company; question: CompanyQuestion }[] => {
  const results: { company: Company; question: CompanyQuestion }[] = [];
  
  companies.forEach(company => {
    company.questions.forEach(question => {
      if (
        question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        question.description?.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        results.push({ company, question });
      }
    });
  });
  
  return results;
};
