export interface Flashcard {
  id: number;
  term: string;
  explanation: string;
  difficulty: 'Basic' | 'Intermediate';
  category: string;
}

export const flashcards: Flashcard[] = [
  // Time Complexity
  {
    id: 1,
    term: "Big-O Notation",
    explanation: "Mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity. It represents the upper bound of algorithmic complexity.",
    difficulty: "Basic",
    category: "Time Complexity"
  },
  {
    id: 2,
    term: "O(1) - Constant Time",
    explanation: "Algorithm takes the same amount of time regardless of input size. Examples: array access, hash table lookup, stack push/pop.",
    difficulty: "Basic",
    category: "Time Complexity"
  },
  {
    id: 3,
    term: "O(log n) - Logarithmic Time",
    explanation: "Time grows logarithmically with input size. Common in divide-and-conquer algorithms like binary search, balanced tree operations.",
    difficulty: "Basic",
    category: "Time Complexity"
  },
  {
    id: 4,
    term: "O(n) - Linear Time",
    explanation: "Time grows linearly with input size. Examples: single loop through array, linear search, traversing a linked list.",
    difficulty: "Basic",
    category: "Time Complexity"
  },
  {
    id: 5,
    term: "O(n²) - Quadratic Time",
    explanation: "Time grows quadratically with input size. Common in nested loops, bubble sort, selection sort, insertion sort.",
    difficulty: "Basic",
    category: "Time Complexity"
  },

  // Graph Traversals
  {
    id: 6,
    term: "DFS (Depth-First Search)",
    explanation: "Graph traversal algorithm that explores as far as possible along each branch before backtracking. Uses stack (recursion or explicit). Time: O(V+E), Space: O(V).",
    difficulty: "Intermediate",
    category: "Graph Traversals"
  },
  {
    id: 7,
    term: "BFS (Breadth-First Search)",
    explanation: "Graph traversal algorithm that explores all neighbors at current depth before moving to next depth level. Uses queue. Time: O(V+E), Space: O(V). Finds shortest path in unweighted graphs.",
    difficulty: "Intermediate",
    category: "Graph Traversals"
  },
  {
    id: 8,
    term: "Topological Sort",
    explanation: "Linear ordering of vertices in a directed acyclic graph (DAG) where for every directed edge (u,v), vertex u comes before v. Used in scheduling, dependency resolution.",
    difficulty: "Intermediate",
    category: "Graph Traversals"
  },

  // Sorting Algorithms
  {
    id: 9,
    term: "Merge Sort",
    explanation: "Divide-and-conquer stable sorting algorithm. Divides array into halves, recursively sorts them, then merges. Time: O(n log n), Space: O(n). Always O(n log n) regardless of input.",
    difficulty: "Intermediate",
    category: "Sorting"
  },
  {
    id: 10,
    term: "Quick Sort",
    explanation: "Divide-and-conquer sorting algorithm using pivot partitioning. Average: O(n log n), Worst: O(n²), Space: O(log n). In-place but not stable.",
    difficulty: "Intermediate",
    category: "Sorting"
  },
  {
    id: 11,
    term: "Heap Sort",
    explanation: "Comparison-based sorting using binary heap. Build max-heap, then repeatedly extract maximum. Time: O(n log n), Space: O(1). In-place but not stable.",
    difficulty: "Intermediate",
    category: "Sorting"
  },

  // Data Structures
  {
    id: 12,
    term: "Hash Table",
    explanation: "Data structure that maps keys to values using hash function. Average O(1) for search, insert, delete. Handles collisions via chaining or open addressing.",
    difficulty: "Basic",
    category: "Data Structures"
  },
  {
    id: 13,
    term: "Binary Search Tree (BST)",
    explanation: "Binary tree where left subtree contains nodes with keys less than parent, right subtree contains greater keys. Average O(log n) operations, worst O(n) if unbalanced.",
    difficulty: "Intermediate",
    category: "Data Structures"
  },
  {
    id: 14,
    term: "Heap",
    explanation: "Complete binary tree satisfying heap property. Max-heap: parent ≥ children, Min-heap: parent ≤ children. Used in priority queues, heap sort. Insert/delete: O(log n).",
    difficulty: "Intermediate",
    category: "Data Structures"
  },

  // Recursion
  {
    id: 15,
    term: "Recursion",
    explanation: "Problem-solving technique where function calls itself with smaller subproblems. Requires base case and recursive case. Can lead to stack overflow if not properly bounded.",
    difficulty: "Basic",
    category: "Recursion"
  },
  {
    id: 16,
    term: "Dynamic Programming",
    explanation: "Optimization technique that solves complex problems by breaking them into simpler subproblems and storing results. Avoids redundant calculations. Two approaches: memoization (top-down) and tabulation (bottom-up).",
    difficulty: "Intermediate",
    category: "Recursion"
  },
  {
    id: 17,
    term: "Backtracking",
    explanation: "Algorithmic approach that considers searching every possible combination to solve computational problems. Builds solution incrementally and abandons candidates that cannot lead to valid solution.",
    difficulty: "Intermediate",
    category: "Recursion"
  },
  {
    id: 18,
    term: "Recursive Tree",
    explanation: "A diagram that represents how a recursive function expands into multiple subproblemsat each call",
    difficulty: "Intermediate",
    category: "Recursion"
  }
];

export const categories = [
  "All",
  "Time Complexity", 
  "Graph Traversals",
  "Sorting",
  "Data Structures",
  "Recursion"
] as const;

export const difficulties = ["All", "Basic", "Intermediate"] as const;
