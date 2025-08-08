"use client";
import { useState } from "react";
import { SendHorizonal, Bot, X } from "lucide-react";
import { Input } from "./ui/input";

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function BotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "👋 Hi! I'm your DSAMate Bot. Ask me about DSA problems, algorithms, or data structures!",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    const updatedMessages = [...messages, { role: "user" as const, content: userMessage }];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      // Simple local knowledge-based responses
      const botResponse = await generateDSAResponse(userMessage);
      setMessages([...updatedMessages, { role: "bot" as const, content: botResponse }]);
    } catch (error) {
      setMessages([
        ...updatedMessages,
        { role: "bot" as const, content: "⚠️ Sorry, I encountered an error. Please try asking about a specific DSA topic!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 right-6 z-50">
      {/* Floating Bot Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 hover:bg-blue-700 w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        <Bot size={28} className="text-white" />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="mt-2 w-96 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 max-h-[70vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Bot size={20} className="text-blue-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">DSAMate Bot</h3>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 mb-4" style={{ maxHeight: "400px" }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg text-sm whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 ml-8"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 mr-8"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded-lg text-sm mr-8">
                🤖 Thinking...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about DSA problems..."
              className="flex-grow border border-gray-300 dark:border-gray-600 p-2 rounded-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-2 rounded-lg transition-colors"
            >
              <SendHorizonal size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple DSA Knowledge Base Response Generator
async function generateDSAResponse(userMessage: string): Promise<string> {
  const message = userMessage.toLowerCase();

  // Two Sum
  if (message.includes("two sum") || message.includes("twosum")) {
    return `🎯 **Two Sum Problem**

**Problem:** Find two numbers in an array that add up to a target value.

**Approach:** Use HashMap to store complements
1. Iterate through array
2. For each number, calculate: complement = target - current_number  
3. Check if complement exists in HashMap
4. If yes → return indices, if no → store current number

**Time:** O(n) | **Space:** O(n)

**Example:**
Input: nums = [2,7,11,15], target = 9
Output: [0,1] (because 2 + 7 = 9)

💡 **Key Insight:** Trade space for time efficiency!

Need help with implementation or similar problems?`;
  }

  // Binary Search
  if (message.includes("binary search") || message.includes("search")) {
    return `🔍 **Binary Search**

**Concept:** Efficiently search in sorted array by dividing search space in half.

**Algorithm:**
1. Set left = 0, right = array.length - 1
2. While left ≤ right:
   - mid = left + (right - left) / 2
   - If target == array[mid] → return mid
   - If target < array[mid] → search left half
   - If target > array[mid] → search right half
3. Return -1 if not found

**Time:** O(log n) | **Space:** O(1)

**Key Points:**
- Array must be sorted
- Eliminates half search space each iteration
- Use left + (right - left) / 2 to avoid overflow

Want to see variations like rotated array search?`;
  }

  // Linked List
  if (message.includes("linked list") || message.includes("reverse")) {
    return `🔗 **Linked Lists**

**Key Concepts:**
- Dynamic structure with nodes (data + next pointer)
- No random access, must traverse from head
- Efficient insertion/deletion at known positions

**Common Patterns:**
1. **Two Pointers:** Fast/slow for cycle detection
2. **Dummy Node:** Simplifies edge cases
3. **Recursion:** Natural fit for linked lists

**Reverse Linked List:**
\`\`\`
prev = null, curr = head
while curr:
    next = curr.next
    curr.next = prev
    prev = curr
    curr = next
return prev
\`\`\`

**Time:** O(n) | **Space:** O(1)

Which linked list problem interests you?`;
  }

  // Dynamic Programming
  if (message.includes("dynamic programming") || message.includes("dp") || message.includes("climb")) {
    return `🧠 **Dynamic Programming**

**Core Idea:** Break complex problems into simpler subproblems, store results to avoid recomputation.

**When to Use:**
1. Optimal substructure (optimal solution contains optimal subproblems)
2. Overlapping subproblems (same subproblems solved multiple times)

**Common Patterns:**
- **1D DP:** Climbing stairs, house robber
- **2D DP:** Edit distance, LCS
- **Knapsack:** 0/1 knapsack, coin change

**Climbing Stairs Example:**
- Problem: Count ways to climb n stairs (1 or 2 steps)
- Recurrence: dp[i] = dp[i-1] + dp[i-2]
- Base: dp[1] = 1, dp[2] = 2

**Steps:**
1. Define state (what does dp[i] represent?)
2. Find recurrence relation
3. Identify base cases
4. Determine computation order

Which DP problem would you like to explore?`;
  }

  // Trees
  if (message.includes("tree") || message.includes("binary tree") || message.includes("bst")) {
    return `🌳 **Trees & Binary Search Trees**

**Tree Fundamentals:**
- Hierarchical structure: root, internal nodes, leaves
- Each node has ≤ one parent, ≥ zero children

**Binary Tree:**
- Each node has ≤ 2 children (left, right)
- Height = longest path from root to leaf

**BST Properties:**
- Left subtree < root < right subtree
- Inorder traversal gives sorted sequence
- Average O(log n) operations

**Traversals:**
- **Inorder:** Left → Root → Right (sorted for BST)
- **Preorder:** Root → Left → Right (copying)
- **Postorder:** Left → Right → Root (deletion)
- **Level Order:** BFS using queue

**Key Problems:**
- Maximum Depth, Validate BST
- Lowest Common Ancestor
- Level Order Traversal

What tree concept needs explanation?`;
  }

  // Arrays
  if (message.includes("array") || message.includes("string") || message.includes("kadane")) {
    return `📚 **Arrays & Strings**

**Array Techniques:**
1. **Two Pointers:** Sorted arrays, palindromes
2. **Sliding Window:** Subarray problems
3. **Prefix Sum:** Range sum queries
4. **HashMap:** Frequency counting, lookups

**String Techniques:**
1. **Character Arrays:** In-place modifications
2. **StringBuilder:** Efficient concatenation
3. **Pattern Matching:** KMP, Rabin-Karp
4. **Palindromes:** Expand around centers

**Maximum Subarray (Kadane's):**
\`\`\`
max_sum = current_sum = nums[0]
for i in range(1, len(nums)):
    current_sum = max(nums[i], current_sum + nums[i])
    max_sum = max(max_sum, current_sum)
\`\`\`

**Time:** O(n) | **Space:** O(1)

Which array/string problem do you need help with?`;
  }

  // Graphs
  if (message.includes("graph") || message.includes("dfs") || message.includes("bfs")) {
    return `📊 **Graphs**

**Graph Basics:**
- Vertices (nodes) connected by edges
- Directed vs Undirected, Weighted vs Unweighted

**Representations:**
1. **Adjacency List:** Space efficient O(V + E)
2. **Adjacency Matrix:** Fast lookup O(V²)

**Traversals:**
- **DFS:** Stack/recursion, pathfinding
- **BFS:** Queue, shortest path in unweighted graphs

**Common Problems:**
- Number of Islands (DFS/BFS on 2D grid)
- Clone Graph (DFS + HashMap)
- Course Schedule (Topological Sort)

**DFS Template:**
\`\`\`
def dfs(node, visited):
    if node in visited: return
    visited.add(node)
    for neighbor in graph[node]:
        dfs(neighbor, visited)
\`\`\`

What graph problem are you working on?`;
  }

  // General help
  if (message.includes("help") || message.includes("start") || message.includes("hello")) {
    return `👋 **Welcome to DSAMate Bot!**

I can help you with:

🎯 **Topics I Cover:**
- Arrays & Strings
- Linked Lists  
- Trees & BST
- Graphs & Algorithms
- Dynamic Programming
- Sorting & Searching
- Stacks & Queues
- Hash Tables & Maps

💡 **How to Ask:**
- "Explain Two Sum problem"
- "How does binary search work?"
- "Help with reversing linked list"
- "What is dynamic programming?"

🚀 **I provide:**
- Step-by-step explanations
- Time/space complexity analysis
- Code examples and patterns
- Related problem suggestions

What DSA topic would you like to explore?`;
  }

  // Default response
  return `🤔 **I can help with that DSA topic!**

I specialize in:
- **Algorithms:** Sorting, searching, graph traversal, DP
- **Data Structures:** Arrays, linked lists, trees, graphs, heaps
- **Problem Solving:** Step-by-step approaches and optimizations

**Try asking:**
- "How do I solve Two Sum?"
- "Explain binary search algorithm"  
- "Help with linked list reversal"
- "What's the approach for [specific problem]?"

**Popular topics:** Two Sum, Binary Search, Linked Lists, Trees, Dynamic Programming, Graphs

What specific DSA problem or concept would you like me to explain?`;
}
