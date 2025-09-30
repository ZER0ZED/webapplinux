#!/bin/bash

echo "🔒 Security Check - Verifying Sensitive Files Protection"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if files are ignored
echo "📋 Checking .gitignore protection..."
echo ""

files_to_check=(
    "backend/.env"
    "CREDENTIALS.txt"
    "logs/backend.log"
    "backend.pid"
    "frontend.pid"
)

all_protected=true

for file in "${files_to_check[@]}"; do
    if git check-ignore -q "$file" 2>/dev/null; then
        echo -e "${GREEN}✅ Protected:${NC} $file"
    else
        echo -e "${RED}❌ NOT PROTECTED:${NC} $file"
        all_protected=false
    fi
done

echo ""
echo "=================================================="
echo ""

if [ "$all_protected" = true ]; then
    echo -e "${GREEN}✅ All sensitive files are protected!${NC}"
    echo ""
    echo "Safe to commit to GitHub. Your credentials won't be uploaded."
else
    echo -e "${RED}⚠️  WARNING: Some files are NOT protected!${NC}"
    echo ""
    echo "Add missing entries to .gitignore before committing."
fi

echo ""
echo "📝 Files in your .gitignore:"
echo "----------------------------"
cat .gitignore

echo ""
echo "=================================================="
echo ""
echo "🔍 Current git status:"
git status --short 2>/dev/null || echo "Not a git repository"