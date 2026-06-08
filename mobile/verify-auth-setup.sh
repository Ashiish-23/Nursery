#!/bin/bash

# SasyaVana Mobile Auth Setup Script
# Run this script after npm install to verify the setup

set -e

echo "🌿 SasyaVana Mobile Authentication Setup Verification"
echo "=================================================="
echo ""

# Check Node version
echo "✓ Checking Node.js..."
node -v
echo ""

# Check dependencies
echo "✓ Checking key dependencies..."
npm list react-hook-form zod @hookform/resolvers expo-secure-store | head -5
echo ""

# Verify file structure
echo "✓ Verifying file structure..."
files=(
  "app/register.tsx"
  "app/login.tsx"
  "services/api.ts"
  "services/auth-storage.ts"
  "components/form/index.ts"
  "components/form/text-input.tsx"
  "components/form/button.tsx"
  "components/form/role-selection.tsx"
  "components/form/alert.tsx"
  "hooks/use-auth.ts"
  "types/auth.ts"
  "constants/theme.ts"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✓ $file"
  else
    echo "  ✗ $file (MISSING)"
  fi
done
echo ""

# Verify documentation
echo "✓ Documentation files..."
docs=(
  "AUTH_IMPLEMENTATION.md"
  "AUTH_QUICK_REFERENCE.md"
  ".env.local.example"
)

for doc in "${docs[@]}"; do
  if [ -f "$doc" ]; then
    echo "  ✓ $doc"
  else
    echo "  ✗ $doc (MISSING)"
  fi
done
echo ""

echo "✅ Setup verification complete!"
echo ""
echo "Next steps:"
echo "1. Run: npm install"
echo "2. Run: npm start"
echo "3. Read: AUTH_IMPLEMENTATION.md"
echo "4. Read: AUTH_QUICK_REFERENCE.md"
echo "5. Create .env.local from .env.local.example"
echo ""
