#!/bin/bash

echo "🚀 Montagna Puck - Deployment Setup Script"
echo "=========================================="

# Push to GitHub
echo "📦 Pushing code to GitHub..."
git push -u origin master

if [ $? -eq 0 ]; then
    echo "✅ Code pushed successfully!"
    echo ""
    echo "📝 Next Steps:"
    echo "1. Go to: https://github.com/rtaylorgraham/montagna-puck/settings/secrets/actions"
    echo ""
    echo "2. Add these GitHub Secrets:"
    echo "   - GCP_PROJECT_ID: montagna-travel-site"
    echo "   - GCP_SA_KEY: (Service account JSON key)"
    echo "   - DATABASE_URL: (PostgreSQL connection string)"
    echo ""
    echo "3. The GitHub Action will automatically deploy on push to main branch"
    echo ""
    echo "4. Your app will be available at:"
    echo "   https://montagna-puck-[hash]-us-central1.a.run.app"
else
    echo "❌ Failed to push. Please create the repository first at:"
    echo "   https://github.com/new"
    echo ""
    echo "   Repository name: montagna-puck"
    echo "   Make it public, don't initialize with any files"
fi