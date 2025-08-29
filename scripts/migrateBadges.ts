import { connect } from "../db/config"; // Adjust path if needed
import { Badge } from "../models/Badge.model"; // Adjust path if needed

async function migrateBadges() {
  try {
    await connect();
    console.log("Connected to MongoDB for migration...");

    const allBadges = await Badge.find();

    for (const doc of allBadges) {
      let updated = false;

      doc.badges = doc.badges.map((b: any) => {
        if (typeof b === "string") {
          updated = true;
          return { name: b, claimedAt: new Date() };
        }
        return b;
      });

      if (updated) {
        await doc.save();
        console.log(`Migrated badges for user: ${doc.userId}`);
      }
    }

    console.log("Migration complete!");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

migrateBadges();
