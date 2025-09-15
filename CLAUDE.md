# Montagna Puck - AI Assistant Context

## Project Overview
Montagna Puck is a premium cycling travel platform built with Next.js 14 and Puck visual editor. This is a complete rebuild from scratch after exploring various visual editor options (Puck → Webstudio → back to Puck).

**Created:** December 7, 2024
**Purpose:** Visual page builder for Montagna Travel cycling tours
**Architecture:** Single environment with edit → preview → publish workflow

## Current Deployment Status (December 7, 2024)

### 🚀 Live Deployment
- **Cloud Run URL:** https://montagna-puck-182768287149.us-central1.run.app
- **Status:** ✅ Deployed and running
- **Region:** us-central1
- **Service Name:** montagna-puck

### 📍 Application Routes
- **Editor:** `/admin/[page-name]` (e.g., `/admin/swiss-alps-2026`)
- **Preview:** `/preview/[page-name]` - View draft changes
- **Published:** `/[page-name]` - Live published pages

### 🗄️ Database
- **Cloud SQL Instance:** montagna-puck-db
- **Type:** PostgreSQL 15
- **IP Address:** 34.27.90.67
- **Status:** ⏳ Creating (as of last check)
- **Tier:** db-f1-micro (cost-effective for development)

### 📦 GitHub Repository
- **URL:** https://github.com/rtaylorgraham/montagna-puck
- **Owner:** rtaylorgraham (personal account)
- **Visibility:** Public
- **Default Branch:** master

## Tech Stack

- **Framework:** Next.js 14.0.4 with App Router
- **Visual Editor:** @measured/puck
- **Database:** PostgreSQL with Prisma ORM
- **Styling:** Tailwind CSS
- **Components:** Custom Puck components including:
  - HeroCarousel (with SwiperJS integration)
  - ClimbCard
  - TextBlock
  - Container
  - Columns
- **Deployment:**
  - Google Cloud Run (serverless)
  - Cloud SQL (PostgreSQL)
  - Artifact Registry (Docker images)
  - GitHub Actions (CI/CD)

## Environment Variables

### Required for Local Development
```env
# Database
DATABASE_URL="postgresql://montagna:montagna_dev_2024@localhost:5432/montagna_puck?schema=public"

# Application
NEXT_PUBLIC_URL="http://localhost:3000"
```

### Required for Production (Cloud Run)
```env
# Database (Cloud SQL)
DATABASE_URL="postgresql://postgres:montagna123@34.27.90.67:5432/montagna_puck?schema=public"

# Application
NEXT_PUBLIC_URL="https://montagna-puck-182768287149.us-central1.run.app"
```

## GitHub Secrets (Already Configured)
- `GCP_PROJECT_ID`: montagna-travel-site
- `GCP_SA_KEY`: Service account JSON for deployment
- `DATABASE_URL`: PostgreSQL connection string
- `NEXT_PUBLIC_URL`: Public URL for the application

## GCP Resources

### Project Details
- **Project ID:** montagna-travel-site
- **Project Number:** 182768287149
- **Service Account:** github-actions-deployer@montagna-travel-site.iam.gserviceaccount.com

### Enabled APIs
- Cloud Run Admin API
- Cloud SQL Admin API
- Artifact Registry API
- Cloud Resource Manager API
- Compute Engine API

### Artifact Registry
- **Repository:** montagna-puck
- **Location:** us-central1
- **Format:** Docker
- **Image Path:** us-central1-docker.pkg.dev/montagna-travel-site/montagna-puck/montagna-puck

## Work Completed

1. ✅ Created new clean repository from scratch
2. ✅ Set up Next.js 14 with TypeScript
3. ✅ Integrated Puck editor with custom components
4. ✅ Built SwiperJS carousel as Puck component
5. ✅ Set up Prisma with PostgreSQL schema
6. ✅ Created edit/preview/publish workflow
7. ✅ Built Docker image with standalone Next.js output
8. ✅ Pushed to GitHub with proper SSH authentication
9. ✅ Set up GitHub Actions for CI/CD
10. ✅ Configured all GitHub Secrets
11. ✅ Deployed to Cloud Run
12. ✅ Created Cloud SQL instance (still provisioning)

## Known Issues & Fixes Applied

### 1. Google Fonts in Docker
- **Issue:** Docker build failed due to Google Fonts fetch error
- **Fix:** Removed Google Fonts dependency, using system fonts

### 2. Next.js Standalone Build
- **Issue:** Docker couldn't find .next/standalone directory
- **Fix:** Added `output: 'standalone'` to next.config.js

### 3. TypeScript Errors
- **Issue:** Swiper web components not recognized
- **Fix:** Added type declarations in types/swiper.d.ts

### 4. GitHub Token in Repository
- **Issue:** GitHub blocked push due to exposed token
- **Fix:** Removed token from setup-secrets.sh

## Pending Tasks

### Immediate (Once Cloud SQL is ready)
1. **Set PostgreSQL password:**
   ```bash
   gcloud sql users set-password postgres --instance=montagna-puck-db --password=montagna123
   ```

2. **Create database:**
   ```bash
   gcloud sql databases create montagna_puck --instance=montagna-puck-db
   ```

3. **Update Cloud Run with proper connection:**
   ```bash
   gcloud run services update montagna-puck \
     --set-env-vars DATABASE_URL="postgresql://postgres:montagna123@34.27.90.67:5432/montagna_puck?schema=public" \
     --region us-central1
   ```

4. **Run database migrations** (from local with connection to Cloud SQL)

### Next Steps
- [ ] Test Puck editor functionality on Cloud Run
- [ ] Set up custom domain (montagnatravel.com or similar)
- [ ] Configure SSL certificate
- [ ] Add authentication for editor (optional)
- [ ] Create initial content pages
- [ ] Set up monitoring and logging

## Local Development

```bash
# Install dependencies
npm install

# Set up database
docker-compose up -d  # If using local PostgreSQL
npx prisma db push

# Run development server
npm run dev

# Build for production
npm run build
```

## Deployment Commands

### Manual Docker Build & Deploy
```bash
# Build Docker image
docker build -t montagna-puck:latest .

# Tag for Artifact Registry
docker tag montagna-puck:latest \
  us-central1-docker.pkg.dev/montagna-travel-site/montagna-puck/montagna-puck:latest

# Push to Artifact Registry
docker push us-central1-docker.pkg.dev/montagna-travel-site/montagna-puck/montagna-puck:latest

# Deploy to Cloud Run
gcloud run deploy montagna-puck \
  --image us-central1-docker.pkg.dev/montagna-travel-site/montagna-puck/montagna-puck:latest \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated
```

### Automatic Deployment
Push to master branch triggers GitHub Actions workflow

## Useful Commands

### Check Cloud SQL Status
```bash
gcloud sql instances list --project=montagna-travel-site
```

### View Cloud Run Logs
```bash
gcloud run services logs read montagna-puck --region=us-central1
```

### Connect to Cloud SQL from Local
```bash
psql "postgresql://postgres:montagna123@34.27.90.67:5432/montagna_puck"
```

### Check GitHub Actions Status
```bash
gh run list --repo rtaylorgraham/montagna-puck
```

## Cost Optimization
- **Cloud Run:** Pay per use, scales to zero
- **Cloud SQL:** db-f1-micro (~$10/month)
- **Estimated Monthly Cost:** $10-20 for low traffic

## Security Notes
- Cloud SQL has public IP but requires password
- Consider adding authorized networks restriction
- Add authentication for /admin routes in production
- Use Secret Manager for sensitive environment variables

## SSH Configuration
Using personal GitHub account with SSH key:
- Host: github.com-personal
- User: rtaylorgraham
- Key: ~/.ssh/id_ed25519_personal

## Personal GitHub Token
Environment variable set: `GITHUB_TOKEN_PERSONAL`
Used for GitHub API operations and gh CLI

## Troubleshooting

### If deployment fails:
1. Check GitHub Actions logs
2. Verify all secrets are set correctly
3. Ensure service account has proper permissions

### If database connection fails:
1. Check Cloud SQL instance status
2. Verify IP address and credentials
3. Ensure Cloud Run can reach Cloud SQL

### If Puck editor doesn't save:
1. Check database connection
2. Verify API routes are working
3. Check browser console for errors

## Contact & Repository
- **GitHub:** https://github.com/rtaylorgraham/montagna-puck
- **GCP Project:** montagna-travel-site
- **Local Directory:** C:\Users\rtayl\repos\montagna-puck

---
*Last Updated: December 7, 2024*
*This file contains all context needed to continue development on the Montagna Puck project*