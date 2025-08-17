// import type { FlashcardItem } from "@/lib/types";

// // Starter set — add more freely
// export const flashcards: FlashcardItem[] = [
//   {
//     id: "tc-1",
//     term: "Time Complexity",
//     topic: "Complexity",
//     difficulty: "Basic",
//     explanation:
//       "Time complexity describes how the runtime of an algorithm grows with input size n. We use asymptotic notation (Big-O) to capture the dominant term and ignore constants.",
//     example:
//       "Example: Linear search runs in O(n); binary search runs in O(log n).",
//   },
//   {
//     id: "bigo-1",
//     term: "Big-O Notation",
//     topic: "Complexity",
//     difficulty: "Basic",
//     explanation:
//       "Big-O is an upper bound on growth: f(n) = O(g(n)) means f grows no faster than g up to constant factors beyond some n₀.",
//     example:
//       "Ordering (typical): O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2^n) < O(n!).",
//   },
//   {
//     id: "sort-1",
//     term: "Sorting: Comparison Lower Bound",
//     topic: "Sorting",
//     difficulty: "Intermediate",
//     explanation:
//       "Any comparison-based sorting algorithm has a lower bound of Ω(n log n) comparisons in the worst case, derived from decision tree height over n! permutations.",
//   },
//   {
//     id: "sort-2",
//     term: "Stable Sorting",
//     topic: "Sorting",
//     difficulty: "Basic",
//     explanation:
//       "A stable sort preserves the relative order of elements with equal keys. Useful when sorting by multiple keys in passes.",
//     example:
//       "Merge sort (typical impl) is stable; quicksort (typical in-place impl) is not.",
//   },
//   {
//     id: "rec-1",
//     term: "Recursion vs Iteration",
//     topic: "Recursion",
//     difficulty: "Basic",
//     explanation:
//       "Recursion solves a problem by solving smaller subproblems of the same form. Iteration uses loops. Tail recursion can often be optimized to iteration.",
//   },
//   {
//     id: "rec-2",
//     term: "Master Theorem (T(n) = aT(n/b) + f(n))",
//     topic: "Recursion",
//     difficulty: "Intermediate",
//     explanation:
//       "Compare f(n) to n^{log_b a}. If f is poly smaller ⇒ O(n^{log_b a}); if comparable with log^k factor ⇒ O(n^{log_b a} log^{k+1} n); if f dominates (regularity) ⇒ O(f(n)).",
//   },
//   {
//     id: "graph-1",
//     term: "Graph Traversal: BFS",
//     topic: "Graphs",
//     difficulty: "Basic",
//     explanation:
//       "Breadth-first search explores neighbors level by level using a queue. On unweighted graphs, BFS finds the shortest path in O(V+E).",
//   },
//   {
//     id: "graph-2",
//     term: "Graph Traversal: DFS",
//     topic: "Graphs",
//     difficulty: "Basic",
//     explanation:
//       "Depth-first search goes as deep as possible along a branch before backtracking. Useful for topological sort, cycle detection, and connected components.",
//   },
//   {
//     id: "graph-3",
//     term: "Topological Sort",
//     topic: "Graphs",
//     difficulty: "Intermediate",
//     explanation:
//       "Ordering of vertices in a DAG such that all edges go from earlier to later. Can be found with DFS finishing times or Kahn’s algorithm (BFS with in-degree).",
//   },
//   {
//     id: "hash-1",
//     term: "Hashing: Expected O(1) Lookup",
//     topic: "Hashing",
//     difficulty: "Basic",
//     explanation:
//       "With good hash functions and load factors, average lookup/insert/delete is O(1). Worst case can degrade to O(n) if many collisions.",
//   },
// ];
