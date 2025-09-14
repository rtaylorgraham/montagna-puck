#!/bin/bash

echo "Setting up GitHub Secrets for Montagna Puck..."

# Set the GitHub token (use your personal token)
export GITHUB_TOKEN="${GITHUB_TOKEN_PERSONAL:-your_github_token_here}"

# Create secrets using gh CLI
echo "Setting GCP_PROJECT_ID..."
echo "montagna-travel-site" | gh secret set GCP_PROJECT_ID --repo rtaylorgraham/montagna-puck

echo "Setting GCP_SA_KEY..."
cat ~/montagna-sa-key.json | gh secret set GCP_SA_KEY --repo rtaylorgraham/montagna-puck

echo "Setting DATABASE_URL..."
echo "postgresql://montagna:montagna_dev_2024@localhost:5432/montagna_puck?schema=public" | gh secret set DATABASE_URL --repo rtaylorgraham/montagna-puck

echo "Setting NEXT_PUBLIC_URL..."
echo "https://montagna-puck-xxxxx-us-central1.a.run.app" | gh secret set NEXT_PUBLIC_URL --repo rtaylorgraham/montagna-puck

echo "✅ GitHub Secrets configured successfully!"
echo ""
echo "You can view them at: https://github.com/rtaylorgraham/montagna-puck/settings/secrets/actions"