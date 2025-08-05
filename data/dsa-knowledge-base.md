# DSA Mate - 100 Essential DSA Questions Knowledge Base

## Table of Contents
1. [Arrays & Strings](#arrays--strings)
2. [Linked Lists](#linked-lists)
3. [Trees & Binary Search Trees](#trees--binary-search-trees)
4. [Graphs](#graphs)
5. [Dynamic Programming](#dynamic-programming)
6. [Sorting & Searching](#sorting--searching)
7. [Recursion & Backtracking](#recursion--backtracking)
8. [Stacks & Queues](#stacks--queues)
9. [Heaps & Priority Queues](#heaps--priority-queues)
10. [Hash Tables & Maps](#hash-tables--maps)

---

## Arrays & Strings

### Q1: Two Sum
**Problem:** Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
**Approach:** Use HashMap to store complement values
**Time Complexity:** O(n)
**Space Complexity:** O(n)
**Example:** Input: nums = [2,7,11,15], target = 9 → Output: [0,1]

### Q2: Maximum Subarray (Kadane's Algorithm)
**Problem:** Find the contiguous subarray with the largest sum.
**Approach:** Dynamic programming - keep track of maximum ending here
**Time Complexity:** O(n)
**Space Complexity:** O(1)
**Example:** Input: [-2,1,-3,4,-1,2,1,-5,4] → Output: 6

### Q3: Merge Intervals
**Problem:** Given an array of intervals, merge all overlapping intervals.
**Approach:** Sort by start time, then merge overlapping intervals
**Time Complexity:** O(n log n)
**Space Complexity:** O(n)

### Q4: Product of Array Except Self
**Problem:** Return an array such that answer[i] is equal to the product of all elements except nums[i].
**Approach:** Two passes - left products and right products
**Time Complexity:** O(n)
**Space Complexity:** O(1)

### Q5: Rotate Array
**Problem:** Rotate the array to the right by k steps.
**Approach:** Reverse entire array, then reverse first k and last n-k elements
**Time Complexity:** O(n)
**Space Complexity:** O(1)

### Q6: Container With Most Water
**Problem:** Find two lines that together with x-axis forms a container that holds the most water.
**Approach:** Two pointers from both ends
**Time Complexity:** O(n)
**Space Complexity:** O(1)

### Q7: 3Sum
**Problem:** Find all unique triplets in the array which gives the sum of zero.
**Approach:** Sort array, use two pointers for each element
**Time Complexity:** O(n²)
**Space Complexity:** O(1)

### Q8: Longest Substring Without Repeating Characters
**Problem:** Find the length of the longest substring without repeating characters.
**Approach:** Sliding window with HashSet
**Time Complexity:** O(n)
**Space Complexity:** O(min(m,n))

### Q9: Valid Anagram
**Problem:** Check if two strings are anagrams of each other.
**Approach:** Character frequency count or sorting
**Time Complexity:** O(n)
**Space Complexity:** O(1)

### Q10: Group Anagrams
**Problem:** Group anagrams together from an array of strings.
**Approach:** Use sorted string as key in HashMap
**Time Complexity:** O(n * m log m)
**Space Complexity:** O(n * m)

---

## Linked Lists

### Q11: Reverse Linked List
**Problem:** Reverse a singly linked list.
**Approach:** Iterative with three pointers (prev, curr, next)
**Time Complexity:** O(n)
**Space Complexity:** O(1)

### Q12: Merge Two Sorted Lists
**Problem:** Merge two sorted linked lists into one sorted list.
**Approach:** Two pointers comparison
**Time Complexity:** O(m + n)
**Space Complexity:** O(1)

### Q13: Linked List Cycle
**Problem:** Determine if a linked list has a cycle.
**Approach:** Floyd's Cycle Detection (Tortoise and Hare)
**Time Complexity:** O(n)
**Space Complexity:** O(1)

### Q14: Remove Nth Node From End
**Problem:** Remove the nth node from the end of the list.
**Approach:** Two pointers with n gap
**Time Complexity:** O(n)
**Space Complexity:** O(1)

### Q15: Add Two Numbers
**Problem:** Add two numbers represented as linked lists.
**Approach:** Digit by digit addition with carry
**Time Complexity:** O(max(m,n))
**Space Complexity:** O(max(m,n))

---

## Trees & Binary Search Trees

### Q16: Maximum Depth of Binary Tree
**Problem:** Find the maximum depth of a binary tree.
**Approach:** Recursive DFS or BFS
**Time Complexity:** O(n)
**Space Complexity:** O(h) where h is height

### Q17: Validate Binary Search Tree
**Problem:** Determine if a binary tree is a valid BST.
**Approach:** Inorder traversal or recursive with bounds
**Time Complexity:** O(n)
**Space Complexity:** O(h)

### Q18: Lowest Common Ancestor of BST
**Problem:** Find the lowest common ancestor of two nodes in BST.
**Approach:** Compare values with root
**Time Complexity:** O(h)
**Space Complexity:** O(1)

### Q19: Binary Tree Level Order Traversal
**Problem:** Return level order traversal of binary tree.
**Approach:** BFS using queue
**Time Complexity:** O(n)
**Space Complexity:** O(w) where w is maximum width

### Q20: Symmetric Tree
**Problem:** Check if a binary tree is symmetric around its center.
**Approach:** Recursive comparison of left and right subtrees
**Time Complexity:** O(n)
**Space Complexity:** O(h)

---

## Graphs

### Q21: Number of Islands
**Problem:** Count the number of islands in a 2D grid.
**Approach:** DFS or BFS to mark connected components
**Time Complexity:** O(m * n)
**Space Complexity:** O(m * n)

### Q22: Clone Graph
**Problem:** Clone an undirected graph.
**Approach:** DFS with HashMap to track cloned nodes
**Time Complexity:** O(V + E)
**Space Complexity:** O(V)

### Q23: Course Schedule
**Problem:** Determine if you can finish all courses (detect cycle in directed graph).
**Approach:** Topological sort using DFS or BFS
**Time Complexity:** O(V + E)
**Space Complexity:** O(V)

### Q24: Word Ladder
**Problem:** Find the shortest transformation sequence from beginWord to endWord.
**Approach:** BFS with word transformations
**Time Complexity:** O(M² × N)
**Space Complexity:** O(M² × N)

### Q25: Graph Valid Tree
**Problem:** Check if given edges form a valid tree.
**Approach:** Union-Find or DFS to check connectivity and cycles
**Time Complexity:** O(V + E)
**Space Complexity:** O(V)

---

## Dynamic Programming

### Q26: Climbing Stairs
**Problem:** Count ways to climb n stairs (1 or 2 steps at a time).
**Approach:** Fibonacci sequence
**Time Complexity:** O(n)
**Space Complexity:** O(1)

### Q27: House Robber
**Problem:** Rob houses without robbing adjacent ones for maximum money.
**Approach:** DP with two variables
**Time Complexity:** O(n)
**Space Complexity:** O(1)

### Q28: Coin Change
**Problem:** Find minimum coins needed to make amount.
**Approach:** Bottom-up DP
**Time Complexity:** O(amount × coins)
**Space Complexity:** O(amount)

### Q29: Longest Increasing Subsequence
**Problem:** Find length of longest increasing subsequence.
**Approach:** DP with binary search optimization
**Time Complexity:** O(n log n)
**Space Complexity:** O(n)

### Q30: Edit Distance
**Problem:** Find minimum operations to convert word1 to word2.
**Approach:** 2D DP table
**Time Complexity:** O(m × n)
**Space Complexity:** O(m × n)

---

## Sorting & Searching

### Q31: Binary Search
**Problem:** Search for target in sorted array.
**Approach:** Divide and conquer
**Time Complexity:** O(log n)
**Space Complexity:** O(1)

### Q32: Search in Rotated Sorted Array
**Problem:** Search target in rotated sorted array.
**Approach:** Modified binary search
**Time Complexity:** O(log n)
**Space Complexity:** O(1)

### Q33: Find Peak Element
**Problem:** Find a peak element in array.
**Approach:** Binary search on slope
**Time Complexity:** O(log n)
**Space Complexity:** O(1)

### Q34: Merge Sort
**Problem:** Sort array using merge sort.
**Approach:** Divide and conquer
**Time Complexity:** O(n log n)
**Space Complexity:** O(n)

### Q35: Quick Sort
**Problem:** Sort array using quick sort.
**Approach:** Partition around pivot
**Time Complexity:** O(n log n) average
**Space Complexity:** O(log n)

---

## Recursion & Backtracking

### Q36: Generate Parentheses
**Problem:** Generate all valid parentheses combinations.
**Approach:** Backtracking with open/close count
**Time Complexity:** O(4^n / √n)
**Space Complexity:** O(4^n / √n)

### Q37: Word Search
**Problem:** Find if word exists in 2D board.
**Approach:** DFS backtracking
**Time Complexity:** O(m × n × 4^L)
**Space Complexity:** O(L)

### Q38: Permutations
**Problem:** Generate all permutations of array.
**Approach:** Backtracking with swapping
**Time Complexity:** O(n!)
**Space Complexity:** O(n)

### Q39: Subsets
**Problem:** Generate all possible subsets.
**Approach:** Backtracking or bit manipulation
**Time Complexity:** O(2^n)
**Space Complexity:** O(2^n)

### Q40: N-Queens
**Problem:** Place N queens on N×N chessboard.
**Approach:** Backtracking with constraint checking
**Time Complexity:** O(N!)
**Space Complexity:** O(N)

---

## Stacks & Queues

### Q41: Valid Parentheses
**Problem:** Check if parentheses are valid.
**Approach:** Stack to match opening/closing brackets
**Time Complexity:** O(n)
**Space Complexity:** O(n)

### Q42: Min Stack
**Problem:** Design stack with min() operation in O(1).
**Approach:** Two stacks or single stack with pairs
**Time Complexity:** O(1) all operations
**Space Complexity:** O(n)

### Q43: Evaluate Reverse Polish Notation
**Problem:** Evaluate arithmetic expression in postfix notation.
**Approach:** Stack for operands
**Time Complexity:** O(n)
**Space Complexity:** O(n)

### Q44: Sliding Window Maximum
**Problem:** Find maximum in each sliding window.
**Approach:** Deque to maintain decreasing order
**Time Complexity:** O(n)
**Space Complexity:** O(k)

### Q45: Implement Queue using Stacks
**Problem:** Implement queue using two stacks.
**Approach:** Two stacks for enqueue/dequeue
**Time Complexity:** O(1) amortized
**Space Complexity:** O(n)

---

## Heaps & Priority Queues

### Q46: Kth Largest Element
**Problem:** Find kth largest element in array.
**Approach:** Min heap of size k
**Time Complexity:** O(n log k)
**Space Complexity:** O(k)

### Q47: Merge k Sorted Lists
**Problem:** Merge k sorted linked lists.
**Approach:** Min heap or divide and conquer
**Time Complexity:** O(n log k)
**Space Complexity:** O(k)

### Q48: Top K Frequent Elements
**Problem:** Find k most frequent elements.
**Approach:** HashMap + Min heap
**Time Complexity:** O(n log k)
**Space Complexity:** O(n + k)

### Q49: Find Median from Data Stream
**Problem:** Find median from stream of integers.
**Approach:** Two heaps (max heap for smaller half, min heap for larger half)
**Time Complexity:** O(log n) insert, O(1) median
**Space Complexity:** O(n)

### Q50: Meeting Rooms II
**Problem:** Find minimum meeting rooms needed.
**Approach:** Min heap for end times
**Time Complexity:** O(n log n)
**Space Complexity:** O(n)

---

## Hash Tables & Maps

### Q51: Two Sum
**Problem:** Find two numbers that add up to target.
**Approach:** HashMap for complement lookup
**Time Complexity:** O(n)
**Space Complexity:** O(n)

### Q52: Group Anagrams
**Problem:** Group strings that are anagrams.
**Approach:** HashMap with sorted string as key
**Time Complexity:** O(n × m log m)
**Space Complexity:** O(n × m)

### Q53: Longest Consecutive Sequence
**Problem:** Find longest consecutive sequence length.
**Approach:** HashSet for O(1) lookup
**Time Complexity:** O(n)
**Space Complexity:** O(n)

### Q54: Word Pattern
**Problem:** Check if string follows a pattern.
**Approach:** Two HashMaps for bijection
**Time Complexity:** O(n)
**Space Complexity:** O(n)

### Q55: Design HashMap
**Problem:** Design a HashMap from scratch.
**Approach:** Array of buckets with chaining
**Time Complexity:** O(1) average
**Space Complexity:** O(n)

---

## Advanced Topics

### Q56: LRU Cache
**Problem:** Design Least Recently Used cache.
**Approach:** HashMap + Doubly Linked List
**Time Complexity:** O(1) all operations
**Space Complexity:** O(capacity)

### Q57: Serialize and Deserialize Binary Tree
**Problem:** Serialize tree to string and deserialize back.
**Approach:** Preorder traversal with null markers
**Time Complexity:** O(n)
**Space Complexity:** O(n)

### Q58: Word Break
**Problem:** Check if string can be segmented using dictionary.
**Approach:** Dynamic programming
**Time Complexity:** O(n²)
**Space Complexity:** O(n)

### Q59: Regular Expression Matching
**Problem:** Implement regex matching with '.' and '*'.
**Approach:** Dynamic programming
**Time Complexity:** O(m × n)
**Space Complexity:** O(m × n)

### Q60: Median of Two Sorted Arrays
**Problem:** Find median of two sorted arrays.
**Approach:** Binary search on smaller array
**Time Complexity:** O(log(min(m,n)))
**Space Complexity:** O(1)

---

## String Algorithms

### Q61: Longest Palindromic Substring
**Problem:** Find the longest palindromic substring.
**Approach:** Expand around centers
**Time Complexity:** O(n²)
**Space Complexity:** O(1)

### Q62: String to Integer (atoi)
**Problem:** Convert string to integer with validation.
**Approach:** State machine or careful parsing
**Time Complexity:** O(n)
**Space Complexity:** O(1)

### Q63: ZigZag Conversion
**Problem:** Convert string in zigzag pattern.
**Approach:** Simulate the zigzag pattern
**Time Complexity:** O(n)
**Space Complexity:** O(n)

### Q64: Minimum Window Substring
**Problem:** Find minimum window containing all characters.
**Approach:** Sliding window with character count
**Time Complexity:** O(m + n)
**Space Complexity:** O(m + n)

### Q65: Valid Palindrome
**Problem:** Check if string is palindrome ignoring non-alphanumeric.
**Approach:** Two pointers
**Time Complexity:** O(n)
**Space Complexity:** O(1)

---

## Bit Manipulation

### Q66: Single Number
**Problem:** Find the single number in array where others appear twice.
**Approach:** XOR all numbers
**Time Complexity:** O(n)
**Space Complexity:** O(1)

### Q67: Number of 1 Bits
**Problem:** Count number of 1 bits in integer.
**Approach:** Bit manipulation with n & (n-1)
**Time Complexity:** O(1)
**Space Complexity:** O(1)

### Q68: Reverse Bits
**Problem:** Reverse bits of 32-bit unsigned integer.
**Approach:** Bit manipulation
**Time Complexity:** O(1)
**Space Complexity:** O(1)

### Q69: Power of Two
**Problem:** Check if integer is power of two.
**Approach:** n & (n-1) == 0
**Time Complexity:** O(1)
**Space Complexity:** O(1)

### Q70: Missing Number
**Problem:** Find missing number in array [0,n].
**Approach:** XOR or sum formula
**Time Complexity:** O(n)
**Space Complexity:** O(1)

---

## Mathematical Problems

### Q71: Palindrome Number
**Problem:** Check if integer is palindrome.
**Approach:** Reverse half the number
**Time Complexity:** O(log n)
**Space Complexity:** O(1)

### Q72: Roman to Integer
**Problem:** Convert roman numeral to integer.
**Approach:** Process from right to left
**Time Complexity:** O(n)
**Space Complexity:** O(1)

### Q73: Happy Number
**Problem:** Check if number is happy.
**Approach:** Floyd's cycle detection
**Time Complexity:** O(log n)
**Space Complexity:** O(1)

### Q74: Factorial Trailing Zeroes
**Problem:** Count trailing zeroes in n!.
**Approach:** Count factors of 5
**Time Complexity:** O(log n)
**Space Complexity:** O(1)

### Q75: Excel Sheet Column Number
**Problem:** Convert Excel column title to number.
**Approach:** Base 26 conversion
**Time Complexity:** O(n)
**Space Complexity:** O(1)

---

## Matrix Problems

### Q76: Spiral Matrix
**Problem:** Return elements of matrix in spiral order.
**Approach:** Layer by layer traversal
**Time Complexity:** O(m × n)
**Space Complexity:** O(1)

### Q77: Rotate Image
**Problem:** Rotate n×n matrix 90 degrees clockwise.
**Approach:** Transpose then reverse rows
**Time Complexity:** O(n²)
**Space Complexity:** O(1)

### Q78: Set Matrix Zeroes
**Problem:** Set entire row/column to zero if element is zero.
**Approach:** Use first row/column as markers
**Time Complexity:** O(m × n)
**Space Complexity:** O(1)

### Q79: Search 2D Matrix
**Problem:** Search target in sorted 2D matrix.
**Approach:** Binary search treating as 1D array
**Time Complexity:** O(log(m × n))
**Space Complexity:** O(1)

### Q80: Word Search
**Problem:** Find word in 2D character grid.
**Approach:** DFS backtracking
**Time Complexity:** O(m × n × 4^L)
**Space Complexity:** O(L)

---

## Interval Problems

### Q81: Merge Intervals
**Problem:** Merge overlapping intervals.
**Approach:** Sort by start time, merge overlapping
**Time Complexity:** O(n log n)
**Space Complexity:** O(n)

### Q82: Insert Interval
**Problem:** Insert interval and merge if necessary.
**Approach:** Find position and merge overlapping
**Time Complexity:** O(n)
**Space Complexity:** O(n)

### Q83: Non-overlapping Intervals
**Problem:** Remove minimum intervals to make non-overlapping.
**Approach:** Greedy - sort by end time
**Time Complexity:** O(n log n)
**Space Complexity:** O(1)

### Q84: Meeting Rooms
**Problem:** Check if person can attend all meetings.
**Approach:** Sort by start time, check overlaps
**Time Complexity:** O(n log n)
**Space Complexity:** O(1)

### Q85: Meeting Rooms II
**Problem:** Find minimum meeting rooms needed.
**Approach:** Min heap for end times
**Time Complexity:** O(n log n)
**Space Complexity:** O(n)

---

## Design Problems

### Q86: Design Twitter
**Problem:** Design simplified Twitter with core features.
**Approach:** HashMap + Priority Queue for timeline
**Time Complexity:** Various per operation
**Space Complexity:** O(users + tweets)

### Q87: Design Hit Counter
**Problem:** Count hits in past 5 minutes.
**Approach:** Sliding window with timestamps
**Time Complexity:** O(1) amortized
**Space Complexity:** O(1)

### Q88: Design Tic-Tac-Toe
**Problem:** Design tic-tac-toe game.
**Approach:** Track row/column/diagonal sums
**Time Complexity:** O(1) per move
**Space Complexity:** O(n)

### Q89: Design Add and Search Words
**Problem:** Design data structure for add/search with wildcards.
**Approach:** Trie with DFS for wildcard search
**Time Complexity:** O(m) add, O(n) search worst case
**Space Complexity:** O(ALPHABET_SIZE × N × M)

### Q90: Design Phone Directory
**Problem:** Design phone directory with get/check/release.
**Approach:** HashSet + Queue for available numbers
**Time Complexity:** O(1) all operations
**Space Complexity:** O(n)

---

## Advanced Data Structures

### Q91: Implement Trie
**Problem:** Implement prefix tree data structure.
**Approach:** Tree with character nodes
**Time Complexity:** O(m) insert/search
**Space Complexity:** O(ALPHABET_SIZE × N × M)

### Q92: Design Browser History
**Problem:** Design browser history with back/forward.
**Approach:** Two stacks or doubly linked list
**Time Complexity:** O(1) all operations
**Space Complexity:** O(n)

### Q93: Range Sum Query - Immutable
**Problem:** Calculate sum of elements between indices.
**Approach:** Prefix sum array
**Time Complexity:** O(1) query, O(n) preprocessing
**Space Complexity:** O(n)

### Q94: Range Sum Query 2D - Immutable
**Problem:** Calculate sum in 2D rectangle.
**Approach:** 2D prefix sum
**Time Complexity:** O(1) query, O(m×n) preprocessing
**Space Complexity:** O(m×n)

### Q95: Kth Largest Element in Stream
**Problem:** Find kth largest element in stream.
**Approach:** Min heap of size k
**Time Complexity:** O(log k) add
**Space Complexity:** O(k)

---

## Final Advanced Problems

### Q96: Alien Dictionary
**Problem:** Find order of characters in alien language.
**Approach:** Topological sort on character graph
**Time Complexity:** O(C) where C is total content
**Space Complexity:** O(1) since alphabet size is constant

### Q97: Sliding Window Maximum
**Problem:** Find maximum in each sliding window of size k.
**Approach:** Deque to maintain decreasing order
**Time Complexity:** O(n)
**Space Complexity:** O(k)

### Q98: Basic Calculator
**Problem:** Implement basic calculator for string expressions.
**Approach:** Stack for operators and operands
**Time Complexity:** O(n)
**Space Complexity:** O(n)

### Q99: Trapping Rain Water
**Problem:** Calculate trapped rainwater in elevation map.
**Approach:** Two pointers or precompute max heights
**Time Complexity:** O(n)
**Space Complexity:** O(1)

### Q100: Largest Rectangle in Histogram
**Problem:** Find largest rectangle area in histogram.
**Approach:** Stack to find nearest smaller elements
**Time Complexity:** O(n)
**Space Complexity:** O(n)

---

## Summary

This knowledge base covers 100 essential DSA problems across all major topics:
- **Arrays & Strings**: 10 problems
- **Linked Lists**: 5 problems  
- **Trees & BST**: 5 problems
- **Graphs**: 5 problems
- **Dynamic Programming**: 5 problems
- **Sorting & Searching**: 5 problems
- **Recursion & Backtracking**: 5 problems
- **Stacks & Queues**: 5 problems
- **Heaps & Priority Queues**: 5 problems
- **Hash Tables & Maps**: 5 problems
- **Advanced Topics**: 5 problems
- **String Algorithms**: 5 problems
- **Bit Manipulation**: 5 problems
- **Mathematical Problems**: 5 problems
- **Matrix Problems**: 5 problems
- **Interval Problems**: 5 problems
- **Design Problems**: 5 problems
- **Advanced Data Structures**: 5 problems
- **Final Advanced Problems**: 5 problems

Each problem includes:
- Clear problem statement
- Optimal approach/algorithm
- Time and space complexity
- Key insights and examples

This comprehensive knowledge base enables the DSA Mate chatbot to provide expert guidance on fundamental data structures and algorithms problems.
