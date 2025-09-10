#!/usr/bin/env bash
set -e

echo "Fetching private questions.ts..."
if [ -z "$PRIVATE_PAT" ]; then
  echo "ERROR: PRIVATE_PAT not set. Aborting."
  exit 1
fi

rm -rf temp_private_repo || true
git clone https://${PRIVATE_PAT}@github.com/saumyayadav25/DSAMate.git temp_private_repo --depth=1
cp temp_private_repo/data/questions.ts data/questions.ts
rm -rf temp_private_repo

echo "Done: questions.ts copied for build."
