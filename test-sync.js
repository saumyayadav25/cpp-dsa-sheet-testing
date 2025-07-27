// Test script to verify POTD sync functionality
// Run this in browser console on the /sheet page

console.log("=== POTD Sync Test Script ===");

// Clear existing data for clean test
localStorage.removeItem("potd_last_done");
localStorage.removeItem("potd_streak");
localStorage.removeItem("dsa-progress");

console.log("✅ Cleared existing data");

// Simulate getting today's POTD (you can see this on the page)
const today = new Date();
const dayId = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
console.log("📅 Today's day ID:", dayId);

// Function to test the sync
function testPOTDSync() {
  // Get current localStorage state
  const potdDone = localStorage.getItem("potd_last_done");
  const dsaProgress = JSON.parse(localStorage.getItem("dsa-progress") || "{}");

  console.log("📊 Before POTD completion:");
  console.log("  POTD last done:", potdDone);
  console.log("  DSA progress entries:", Object.keys(dsaProgress).length);

  // Simulate marking POTD as done
  // (In real test, you would click the "Mark as Done" button)
  console.log(
    '🎯 To test: Click "Mark as Done" on POTD, then run checkSyncResult()'
  );
}

function checkSyncResult() {
  const potdDone = localStorage.getItem("potd_last_done");
  const dsaProgress = JSON.parse(localStorage.getItem("dsa-progress") || "{}");

  console.log("📊 After POTD completion:");
  console.log("  POTD last done:", potdDone);
  console.log("  DSA progress entries:", Object.keys(dsaProgress).length);
  console.log("  DSA progress data:", dsaProgress);

  // Check if any DSA question was marked as solved
  const solvedQuestions = Object.entries(dsaProgress).filter(
    ([key, value]) => value.isSolved
  );
  console.log("✅ Solved DSA questions:", solvedQuestions.length);

  if (solvedQuestions.length > 0) {
    console.log("🎉 SUCCESS: POTD sync worked!");
    console.log("   Solved questions:", solvedQuestions);
  } else {
    console.log("❌ FAILED: No DSA questions were marked as solved");
  }
}

// Make functions available globally
window.testPOTDSync = testPOTDSync;
window.checkSyncResult = checkSyncResult;

// Start the test
testPOTDSync();

console.log("📝 Instructions:");
console.log("1. Run testPOTDSync() (already run)");
console.log('2. Click "Mark as Done" on the POTD above');
console.log("3. Run checkSyncResult() to verify sync worked");
console.log("4. Check the DSA list to see if the question is checked");
