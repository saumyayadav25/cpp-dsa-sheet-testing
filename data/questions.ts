export type Question = {
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
};

export type Topic = {
  id: number;
  name: string;
  questions: Question[];
};

// sample questions lists

export const sampleTopics: Topic[] = [
    // Basics of Programming
    {
        id: 1,
        name: 'Basics of Programming',
        questions: [
            {
                id: 1,
                title: 'Say "Hello, World" with c++(for practice)',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    hackerrank: 'https://www.hackerrank.com/challenges/cpp-hello-world/problem?',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/01%20Introduction%20to%20C%2B%2B/NamasteDuniya.cpp',
            },
            {
                id: 2,
                title: 'Basic Data Types(for practice)',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    hackerrank: 'https://www.hackerrank.com/challenges/c-tutorial-basic-data-types/problem?',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/01%20Introduction%20to%20C%2B%2B/variablesAndDatatypes.cpp',
            },
            {
                id: 3,
                title: 'Input and Output(for practice)',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    hackerrank: 'https://www.hackerrank.com/challenges/cpp-input-and-output/problem?',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/01%20Introduction%20to%20C%2B%2B/userinput.cpp',
            },
            {
                id: 4,
                title: 'Conditional Statements(for practice)',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    hackerrank: 'https://www.hackerrank.com/challenges/c-tutorial-conditional-if-else/problem?',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/01%20Introduction%20to%20C%2B%2B/ifelsestatements.cpp',
            },
            {
                id: 5,
                title: 'Switch Case Statement(for practice)',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/c-switch-case-statement5900/0',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/01%20Introduction%20to%20C%2B%2B/SwitchStatements.cpp',
            },
      // ...more questions
        ],
    },
    // patterns
    {
        id: 2,
        name: 'Patterns',
        // add questions 
        questions: [
            {
                id: 1,
                title: 'Solid Square Pattern',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg:'https://www.geeksforgeeks.org/program-to-print-solid-and-hollow-square-patterns/',
                },
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/02%20Basics%20of%20Programming-level-1/Let's%20Solve%20Patterns/solidSquare.cpp",
            },
            {
                id: 19,
                title: 'Full Fancy 12 Pattern',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    code: 'https://www.glassdoor.co.uk/Interview/write-a-program-in-c-c-java-to-print-the-pattern-1-2-2-3-3-3-4-4-4-4-4-4-4-4-3-3-3-2-2-1-QTN_1391507.htm',
                },
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/02%20Basics%20Of%20Programming-Level-2/Mega%20session-patterns/fullFancy12Pattern.cpp",
            },
            {
                id: 21,
                title: 'Numeric Hollow Half Pyramid Pattern',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/hollow-half-pyramid-pattern-using-numbers/',
                },
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/02%20Basics%20Of%20Programming-Level-2/Week%202-%20assignments/numericHollowHalfPyramid.cpp",
            },
            {
                id: 23,
                title: 'Numeric Palindrome Equilateral Pyramid Pattern',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    code: 'https://prepinsta.com/java-program/palindromic-pyramid-pattern-using-java/',
                },
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/02%20Basics%20Of%20Programming-Level-2/Week%202-%20assignments/numericPalindromeEquilateralPyramid.cpp",
            },
            {
                id: 25,
                title: 'Fancy Pattern 1',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/02%20Basics%20Of%20Programming-Level-2/Week%202-%20assignments/fancyPattern1.cpp",
            },
            {
                id: 26,
                title: 'Fancy Pattern 2',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/02%20Basics%20Of%20Programming-Level-2/Week%202-%20assignments/fancyPattern2.cpp",
            },
            {
                id: 27,
                title: 'Fancy Pattern 3',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/02%20Basics%20Of%20Programming-Level-2/Week%202-%20assignments/fancyPattern3.cpp",
            },
            {
                id: 28,
                title: "Floyd's Triangle Pattern",
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/c/c-program-to-print-floyds-triangle-pyramid-patterns/',
                },
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/02%20Basics%20Of%20Programming-Level-2/Week%202-%20assignments/floydsTriangle.cpp",
            },
            {
                id: 29,
                title: "Pascal's Triangle Pattern",
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/pascals-triangle/description/',
                },
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/02%20Basics%20Of%20Programming-Level-2/Week%202-%20assignments/pascalsTriangle.cpp",
            },
            {
                id: 30,
                title: 'Butterfly Pattern',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/dsa/program-to-print-butterfly-pattern-star-pattern/',
                },
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/02%20Basics%20Of%20Programming-Level-2/Week%202-%20assignments/butterflyPattern.cpp",
            },
      // ...more questions
        ],
    },
    // arrays
    {
        id: 3,
        name: 'Arrays',
        questions: [
            {
                id: 1,
                title: 'Linear Search Algorithm(for practice)',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/search-an-element-in-an-array-1587115621/1',
                },
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/03%20Arrays%2C%20Time%20complexity%20and%20Space%20complexity/Let's%20learn%20arrays/linearSearch.cpp",
            },
            {
                id: 7,
                title: 'Two Sum',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/two-sum/description/',
                },
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/03%20Arrays%2C%20Time%20complexity%20and%20Space%20complexity/Week3-%20Assignments/03_keyPair.cpp",
            },
            {
                id: 16,
                title: 'Transpose of 2D matrix (for practice)',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/transpose-of-matrix-1587115621/1',
                },
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/03%20Arrays%2C%20Time%20complexity%20and%20Space%20complexity/Array%20Class-3/Questions/transposeMatrix.cpp",
            },
            {
                id: 22,
                title: 'Move Negative Nos. to Left of Array/ Dutch National Flag Algorithm',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/03%20Arrays%2C%20Time%20complexity%20and%20Space%20complexity/Week3-%20Assignments/07_moveNegativeNumberToLeft.cpp",
            },
            {
                id: 33,
                title: 'Maximum Subarray(Kadane Algorithm) ⭐⭐⭐ 👩🏻‍💻 ',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/maximum-subarray/description/',
                },
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/03%20Arrays%2C%20Time%20complexity%20and%20Space%20complexity/Mega%20class-%20arrays/kadaneAlgo_maximumSubArray.cpp",
            },
        ]
    },
    // searching and sorting
    {
        id: 4,
        name: 'Searching and Sorting',
        questions: [
            {
                id: 1,
                title: 'Binary Search',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/binary-search/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/05%20Searching%20%26%20Sorting/Searching%20And%20Sorting%20Class-1/binary%20search/binarySearch.cpp',
            },
            {
                id: 6,
                title: 'Sqrt(x) (Search space pattern)',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/sqrtx/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/05%20Searching%20%26%20Sorting/Searching%20and%20Sorting%20class-2/searchSpace/leetcode69.cpp',
            },
            {
                id: 8,
                title: 'Find Quotient(for practice)',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/division-without-using-multiplication-division-and-mod-operator/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/05%20Searching%20%26%20Sorting/Searching%20and%20Sorting%20Class-3/getQuotient.cpp',
            },
            {
                id: 11,
                title: 'Odd Occurring Element',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/find-the-odd-occurence4820/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/05%20Searching%20%26%20Sorting/Searching%20and%20Sorting%20Class-3/oddOccuringElement.cpp',
            },
            {
                id: 12,
                title: 'Square root with precision',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/05%20Searching%20%26%20Sorting/Mega%20Class-%20Binary%20Searching/precisionSqrt.cpp',
            },
        ]
    },
    // char arrays and strings
    {
        id: 5,
        name: 'Char Arrays and Strings',
        questions: [
            {
                id: 1,
                title: 'Remove all Adjacent Duplicates in a String',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/07%20Char%20Arrays%20And%20Strings/Char%20Arrays%20%26%20Strings%20Class-2/leetcode%20questions/leetcode1047.cpp',
            },
            {
                id: 2,
                title: 'Remove all occurrences of a substring',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/remove-all-occurrences-of-a-substring/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/07%20Char%20Arrays%20And%20Strings/Char%20Arrays%20%26%20Strings%20Class-2/leetcode%20questions/leetcode1910.cpp',
            },
            {
                id: 3,
                title: 'Valid Palindrome II',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/valid-palindrome-ii/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/07%20Char%20Arrays%20And%20Strings/Char%20Arrays%20%26%20Strings%20Class-2/leetcode%20questions/leetcode680.cpp',
            },
            {
                id: 4,
                title: 'Palindromic substrings',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/palindromic-substrings/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/07%20Char%20Arrays%20And%20Strings/Char%20Arrays%20%26%20Strings%20Class-2/leetcode%20questions/leetcode647.cpp',
            },
            {
                id: 5,
                title: 'Decode the message',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/decode-the-message/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/07%20Char%20Arrays%20And%20Strings/Char%20Arrays%20%26%20Strings%20Class-3/leetcode2325.cpp',
            },
        ]
    },
    // basic maths and pointers
    {
        id: 6,
        name: 'Basic Maths and Pointers',
        questions: [
            {
                id: 1,
                title: 'C++ Pointers ( Incrementing a variable) - (for practice)',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/c-pointers-set-1introduction/0',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/08%20Basic%20Maths%20%26%20Pointers/Pointers-%20Class%201/pointer.cpp',
            },
            {
                id: 2,
                title: 'Count Primes',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/count-primes/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/08%20Basic%20Maths%20%26%20Pointers/Basic%20Mathematics%20for%20DSA/204CountPrimes.cpp',
            },
            {
                id: 3,
                title: 'Fast Exponentiation',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/powx-n/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/08%20Basic%20Maths%20%26%20Pointers/Basic%20Mathematics%20for%20DSA/fastExponentiation.cpp',
            },
            {
                id: 4,
                title: 'GCD of two numbers',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/gcd-of-two-numbers3459/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/08%20Basic%20Maths%20%26%20Pointers/Basic%20Mathematics%20for%20DSA/gcd.cpp',
            },
            {
                id: 5,
                title: 'Modular exponentiation for large numbers',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/modular-exponentiation-for-large-numbers5537/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/08%20Basic%20Maths%20%26%20Pointers/Basic%20Mathematics%20for%20DSA/modularExponentitationForLargeNumbers.cpp',
            },
            {
                id: 6,
                title: 'Sieve of eratosthenes',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/sieve-of-eratosthenes5242/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/08%20Basic%20Maths%20%26%20Pointers/Optimising%20Sieve%20and%20Segmented%20Sieve/seiveofEratosthenes.cpp',
            },
            {
                id: 7,
                title: 'Segmented Sieve',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/find-prime-numbers-in-a-range4718/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/08%20Basic%20Maths%20%26%20Pointers/Optimising%20Sieve%20and%20Segmented%20Sieve/segmentedSieve.cpp',
            },
            {
                id: 8,
                title: 'Product of primes',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/product-of-primes5328/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/08%20Basic%20Maths%20%26%20Pointers/Optimising%20Sieve%20and%20Segmented%20Sieve/productOfPrimes.cpp',
            },
        ]
    },
    // recursion
    {
        id: 7,
        name: 'Recursion',
        questions: [
            {
                id: 1,
                title: 'Factorial',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/factorial5739/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/09%20Recursion/Recursion%20Class-1/main.cpp',
            },
            {
                id: 2,
                title: 'Fibonacci Number',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/fibonacci-number/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/09%20Recursion/Recursion%20Class-1/main.cpp',
            },
            {
                id: 3,
                title: 'Basic array operations using recursion',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/09%20Recursion/Recursion%20Class-2/main.cpp',
            },
            {
                id: 4,
                title: 'Binary Search using recursion',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/binary-search-1587115620/11',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/09%20Recursion/Recursion%20Class-2/binarySearch.cpp',
            },
            {
                id: 6,
                title: 'House Robber (optimise using DP)',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/house-robber/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/09%20Recursion/Recursion%20Class-3/leetcode198.cpp',
            },        
        ]
    },
    // backtracking and divide and conquer
    {
        id: 8,
        name: 'Backtracking and DnC',
        questions: [
            {
                id: 1,
                title: 'Merge Sort / Divide and conquer ',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/merge-sort/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/10%20Backtracking%20%26%20DnC/Dnc%20Class-1/main.cpp',
            },
            {
                id: 2,
                title: 'Quick Sort',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/quick-sort/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/10%20Backtracking%20%26%20DnC/Quick%20Sort%5BEnd%20Element%20as%20Pivot%5D/main.cpp',
            },
            {
                id: 3,
                title: 'Rat in a Maze Problem - I',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/10%20Backtracking%20%26%20DnC/Backtracking%20%26%20Dnc%20Class-2/ratInMaze.cpp',
            },
            {
                id: 4,
                title: 'Permutations',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/permutations/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/10%20Backtracking%20%26%20DnC/Backtracking%20%26%20DnC%20Class-3/leetcode46Permutations.cpp',
            },
            {
                id: 5,
                title: 'N Queens',
                difficulty: 'hard',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/n-queens/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/10%20Backtracking%20%26%20DnC/Backtracking%20%26%20DnC%20Class-3/leetcode51N_Queens.cpp',
            },
            {
                id: 6,
                title: 'Sudoku Solver',
                difficulty: 'hard',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/sudoku-solver/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/10%20Backtracking%20%26%20DnC/Backtracking%20%26%20DnC%20class-4/leetcode37SudokuSolver.cpp',
            },
            {
                id: 7,
                title: 'Letter combinations of a phone number',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/10%20Backtracking%20%26%20DnC/Backtracking%20%26%20DnC%20class-4/leetcode17LetterCombinationsOfPhoneNumber.cpp',
            },
            {
                id: 8,
                title: 'Generate Parentheses',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/generate-parentheses/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/10%20Backtracking%20%26%20DnC/DnC%20and%20Backtracking%20Mega%20Class/22GenerateParentheses.cpp',
            },
            {
                id: 9,
                title: 'Combinations',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/combinations/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/10%20Backtracking%20%26%20DnC/DnC%20and%20Backtracking%20Mega%20Class/77Combinations.cpp',
            },
        ]
    },
    // oops
    {
        id: 9,
        name: 'OOPS concepts',
        questions: [
            {
                id: 1,
                title: 'How to create objects in Cpp',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/tree/main/11%20OOPs%20Concepts/How%20to%20Create%20Objects%20in%20C%2B%2B',
            },
            {
                id: 2,
                title: 'Encapsulation',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/tree/main/11%20OOPs%20Concepts/Implementing%20Encapsulation',
            },
            {
                id: 3,
                title: 'Inheritance',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/tree/main/11%20OOPs%20Concepts/Implementing%20Inheritance',
            },
            {
                id: 4,
                title: 'Polymorphism',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/tree/main/11%20OOPs%20Concepts/Polymorphism',
            },
            {
                id: 5,
                title: 'Abstraction',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/tree/main/11%20OOPs%20Concepts/Abstraction',
            },
            {
                id: 6,
                title: 'Miscellaneous Concepts',
                difficulty: 'hard',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/tree/main/11%20OOPs%20Concepts/Miscellaneous%20Concepts',
            },
        ]
    },
    // linked lists
    {
        id: 10,
        name: 'Linked Lists',
        questions: [
            {
                id: 1,
                title: 'Linked List Insertion At Head / Beginning',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/linked-list-insertion-at-beginning/0',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/12%20Linked%20List/Linked%20List%20Class-1/insertAtHead.cpp',
            },
            {
                id: 2,
                title: 'Print Linked List elements',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/print-linked-list-elements/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/12%20Linked%20List/Linked%20List%20Class-1/insertAtHead.cpp',
            },
            {
                id: 3,
                title: 'Linked List Insertion At Tail / End',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/linked-list-insertion-1587115620/0',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/12%20Linked%20List/Linked%20List%20Class-1/insertAtTail.cpp',
            },
            {
                id: 4,
                title: 'Linked List Insertion At Position',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/node-at-a-given-index-in-linked-list/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/12%20Linked%20List/Linked%20List%20Class-1/insertAtPosition.cpp',
            },
            {
                id: 9,
                title: 'Reverse Linked List',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/reverse-linked-list/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/12%20Linked%20List/Linked%20List%20Class-3/206ReverseLL.cpp',
            },

        ]
    },
    // stacks
    {
        id: 11,
        name: 'Stacks',
        questions: [
            {
                id: 1,
                title: 'Stack Implementation (for practice)',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/special-stack/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/13%20Stacks/Stack%20Class-1/creation.cpp',
            },
            {
                id: 2,
                title: 'Implement two stacks in an array',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/implement-two-stacks-in-an-array/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/13%20Stacks/Stack%20Class-1/twoStack-usingArray.cpp',
            },
            {
                id: 4,
                title: 'Insert an Element at the Bottom of a Stack',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/insert-an-element-at-the-bottom-of-a-stack/0',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/13%20Stacks/Stack%20Class-1/insertAtBottom.cpp',
            },
            {
                id: 8,
                title: 'Sorted Insert in Stack',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/13%20Stacks/Stack%20Class-2/sortedInsert.cpp',
            },
            {
                id: 10,
                title: 'Check Expression contains redundant bracket or not',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/expression-contains-redundant-bracket-or-not/0',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/13%20Stacks/Stack%20Class-2/gfg/checkRedundant.cpp',
            },
        ]
    },
    // queues
    {
        id: 12,
        name: 'Queues',
        questions: [
            {
                id: 1,
                title: 'Implement Queue using array',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/implement-queue-using-array/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/14%20Queues/Queue%20Class%20-%201/implement-queue.cpp',
            },
            {
                id: 2,
                title: 'Deque Implementations',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/deque-implementations/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/14%20Queues/Queue%20Class%20-%201/implement-deque.cpp',
            },
            {
                id: 3,
                title: 'Implement Circular Queue (for practice)',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/design-circular-queue/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/14%20Queues/Queue%20Class%20-%201/implement-circularQueue.cpp',
            },
            {
                id: 4,
                title: 'Implement Circular Deque',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/design-circular-deque/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/14%20Queues/Queue%20Class%20-%201/implement-circularDeque.cpp',
            },
            {
                id: 5,
                title: 'Reverse a Queue',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/queue-reversal/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/14%20Queues/Queue%20Class%20-%202/reverse-a-queue.cpp',
            },
        ]
    },
    // generic and binary trees
    {
        id: 13,
        name: 'Generic and Binary Trees',
        questions: [
            {
                id: 1,
                title: 'Preorder Traversal',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/preorder-traversal/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/15%20Generic%20and%20Binary%20Trees/Trees%20Class%20-%201/02-Traversal.cpp',
            },
            {
                id: 2,
                title: 'Inorder Traversal ',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/inorder-traversal/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/15%20Generic%20and%20Binary%20Trees/Trees%20Class%20-%201/02-Traversal.cpp',
            },
            {
                id: 3,
                title: 'Postorder Traversal',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/postorder-traversal/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/15%20Generic%20and%20Binary%20Trees/Trees%20Class%20-%201/02-Traversal.cpp',
            },
            {
                id: 4,
                title: 'Level Order Traversal ',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/level-order-traversal/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/15%20Generic%20and%20Binary%20Trees/Trees%20Class%20-%201/02-Traversal.cpp',
            },
            {
                id: 8,
                title: 'Lowest Common Ancestor(LCA) of a Binary Tree ⭐⭐⭐',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/15%20Generic%20and%20Binary%20Trees/Trees%20Class%20-%202/02-Lowest-Common-Ancestor-of-Binary-Tree.cpp',
            },
        ]
    },
    // bst
    {
        id: 14,
        name: 'Binary Search Trees',
        questions: [
            {
                id: 1,
                title: 'Build BST and traverse',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/16%20Binary%20Search%20Trees/Binary%20Search%20Trees%20Class%20-%201/creation.cpp',
            },
            {
                id: 2,
                title: 'Min and max element in BST',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/minimum-element-in-bst/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/16%20Binary%20Search%20Trees/Binary%20Search%20Trees%20Class%20-%201/01-max-min.cpp',
            },
            {
                id: 3,
                title: 'Search a node in BST',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/search-a-node-in-bst/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/16%20Binary%20Search%20Trees/Binary%20Search%20Trees%20Class%20-%201/02-search.cpp',
            },
            {
                id: 4,
                title: 'Delete Node in a BST',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/delete-node-in-a-bst/description/"',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/16%20Binary%20Search%20Trees/Binary%20Search%20Trees%20Class%20-%201/03-delete-a-node.cpp',
            },
            {
                id: 5,
                title: 'Two Sum IV - Input is a BST',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/two-sum-iv-input-is-a-bst/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/16%20Binary%20Search%20Trees/BST%20-%20mega%20class/04-two-sum-IV-input-is-a-BST.cpp',
            },
        ]
    },
    // heaps
    {
        id: 15,
        name: 'Heaps',
        questions: [
            {
                id: 1,
                title: 'Heap Creation',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/17%20Heaps/Heaps%20Class%20-%201/01-create-Heap.cpp',
            },
            {
                id: 2,
                title: 'Build Heap and Heap Sort(for practice)',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/heap-sort/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/17%20Heaps/Heaps%20Class%20-%201/02-buildHeap-and-heapsort.cpp',
            },
            {
                id: 3,
                title: 'Kth Largest Element in an Array',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/kth-largest-element-in-an-array/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/17%20Heaps/Heaps%20Class%20-%202%20or%203/01-find-kth-largest-element-in-array.cpp',
            },
            {
                id: 4,
                title: 'Check Completeness of a Binary Tree',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/check-completeness-of-a-binary-tree/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/17%20Heaps/Heaps%20Class%20-%202%20or%203/02-check-completeness-of-a-binary-tree.cpp',
            },
            {
                id: 5,
                title: 'Is Binary Tree Heap',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/is-binary-tree-heap/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/17%20Heaps/Heaps%20Class%20-%202%20or%203/03-is-binary-tree-heap.cpp',
            },
        ]
    },
    // maps and tries
    {
        id: 16,
        name: 'Maps and Tries',
        questions: [
            {
                id: 1,
                title: 'Maps STL Practice',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    hackerrank: 'https://www.hackerrank.com/challenges/cpp-maps/problem',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/tree/main/04%20Complete%20Cpp%20STL/Containers/Map',
            },
            {
                id: 2,
                title: 'Two Sum - using Maps',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/two-sum/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/18%20Maps%20And%20Tries/Maps%20and%20Tries%20Class%20-%202/01-two-sum.cpp',
            },
            {
                id: 5,
                title: 'Implement Trie (Prefix Tree)',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/implement-trie-prefix-tree/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/18%20Maps%20And%20Tries/Maps%20and%20Tries%20Class%20-%204/01-implement-trie.cpp',
            },
            {
                id: 6,
                title: 'Longest Common Prefix',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/longest-common-prefix/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/18%20Maps%20And%20Tries/Maps%20and%20Tries%20Class%20-%204/02-longest-common-prefix.cpp',
            },
            {
                id: 7,
                title: 'Searching using Trie (for practice)',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/trie-insert-and-search0651/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/18%20Maps%20And%20Tries/Maps%20and%20Tries%20Class%20-%204/searching.cpp',
            },
        ]
    },
    // dp
    {
        id: 17,
        name: 'Dynamic Programming',
        questions: [
            {
                id: 1,
                title: 'Fibonacci Number(using dp)',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/fibonacci-number/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/19%20Dynamic%20Programming%20Level%20-%201/DP%20class%20-%201/01-fibonacci.cpp',
            },
            {
                id: 2,
                title: 'House Robber',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/house-robber/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/19%20Dynamic%20Programming%20Level%20-%201/DP%20class%20-%202/01-house-robber.cpp',
            },
            {
                id: 3,
                title: 'Longest Increasing Subsequence',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/longest-increasing-subsequence/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/19%20Dynamic%20Programming%20Level%20-%201/DP%20class%20-%202/02-longest-increasing-subsequence.cpp',
            },
            {
                id: 4,
                title: 'Coin Change',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/coin-change/description/',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/19%20Dynamic%20Programming%20Level%20-%201/DP%20class%20-%202/03-coin-change.cpp',
            },
            {
                id: 5,
                title: '0 - 1 Knapsack Problem',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/19%20Dynamic%20Programming%20Level%20-%201/DP%20class%20-%203/01-0-1-knapsack-problem.cpp',
            },
        ]
    },
    // graphs
    {
        id: 18,
        name: 'Graphs',
        questions: [
            {
                id: 1,
                title: 'Print adjacency list',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/print-adjacency-list-1587115620/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/20%20Graphs/Graphs%20Class%20-%201/main.cpp',
            },
            {
                id: 2,
                title: 'BFS of graph (for practice)',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/bfs-traversal-of-graph/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/20%20Graphs/Graphs%20Class%20-%201/traversal.cpp',
            },
            {
                id: 3,
                title: 'DFS of graph (for practice)',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/20%20Graphs/Graphs%20Class%20-%201/traversal.cpp',
            },
            {
                id: 5,
                title: 'Directed Graph Cycle(Detect cycle)',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/20%20Graphs/Graphs%20Class%20-%202/directed-graph-cycle-dfs.cpp',
            },
            {
                id: 6,
                title: 'Topological sort',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/topological-sort/1',
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/20%20Graphs/Graphs%20Class%20-%203/01-topological-sort.cpp',
            },
        ]
    },
    // bonus
    {
        id: 19,
        name: 'Bonus',
        questions: [
            {
                id: 1,
                title: 'Add questions here',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/',
            },
        ]
    },
];