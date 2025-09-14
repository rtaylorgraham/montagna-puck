#!/bin/bash

# GCP Setup Script for Montagna Puck
# Run this once to set up your GCP environment

PROJECT_ID="montagna-travel-site"
REGION="us-central1"
SERVICE_NAME="montagna-puck"
DB_INSTANCE="montagna-db"
DB_NAME="montagna_puck"

echo "🚀 Setting up GCP for Montagna Puck..."

# Set default project
gcloud config set project $PROJECT_ID

# Enable required APIs
echo "📡 Enabling required APIs..."
gcloud services enable \
  run.googleapis.com \
  sqladmin.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  compute.googleapis.com

# Create Artifact Registry repository
echo "📦 Creating Artifact Registry repository..."
gcloud artifacts repositories create $SERVICE_NAME \
  --repository-format=docker \
  --location=$REGION \
  --description="Docker repository for Montagna Puck" || true

# Create Cloud SQL instance (if not exists)
echo "🗄️ Creating Cloud SQL instance..."
gcloud sql instances create $DB_INSTANCE \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=$REGION \
  --network=default || true

# Create database
echo "📊 Creating database..."
gcloud sql databases create $DB_NAME \
  --instance=$DB_INSTANCE || true

# Create database user
echo "👤 Creating database user..."
gcloud sql users create montagna \
  --instance=$DB_INSTANCE \
  --password=montagna123 || true

# Get connection name for Cloud SQL
CONNECTION_NAME=$(gcloud sql instances describe $DB_INSTANCE --format='value(connectionName)')

echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update .env with your database connection:"
echo "   DATABASE_URL=\"postgresql://montagna:montagna123@localhost/$DB_NAME?host=/cloudsql/$CONNECTION_NAME\""
echo ""
echo "2. Create a service account for GitHub Actions:"
echo "   - Go to IAM & Admin > Service Accounts"
echo "   - Create a new service account"
echo "   - Grant roles: Cloud Run Admin, Cloud SQL Client, Service Account User"
echo "   - Create and download a JSON key"
echo "   - Add the key to GitHub Secrets as GCP_SA_KEY"
echo ""
echo "3. Deploy your first version:"
echo "   git push origin main"
echo ""
echo "🌐 Your service will be available at:"
echo "   https://$SERVICE_NAME-xxxxx-$REGION.a.run.app"