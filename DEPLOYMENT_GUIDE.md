# Montagna Puck - Complete Deployment Guide

## Current Status
✅ Code is ready and committed locally
✅ GCP Artifact Registry is configured
✅ Local development environment is working
⏳ Waiting for GitHub repository creation

## Step 1: Create GitHub Repository

1. Open: https://github.com/new
2. Sign in with your personal account (rtaylorgraham)
3. Create repository with these settings:
   - **Repository name:** `montagna-puck`
   - **Description:** Premium cycling travel platform with Puck visual editor
   - **Visibility:** Public
   - **DO NOT** check any initialization options (no README, no .gitignore, no license)
4. Click "Create repository"

## Step 2: Push Code to GitHub

Once the repository is created, run these commands:

```bash
cd C:\Users\rtayl\repos\montagna-puck
git push -u origin master
```

## Step 3: Create GCP Service Account

1. Open Google Cloud Console: https://console.cloud.google.com
2. Make sure project `montagna-travel-site` is selected
3. Go to IAM & Admin > Service Accounts
4. Click "Create Service Account"
5. Name: `github-actions-deployer`
6. Grant these roles:
   - Cloud Run Admin
   - Service Account User
   - Artifact Registry Writer
   - Cloud SQL Client (if using Cloud SQL)
7. Click "Create Key" > JSON
8. Save the downloaded JSON file

## Step 4: Add GitHub Secrets

Go to: https://github.com/rtaylorgraham/montagna-puck/settings/secrets/actions

Add these repository secrets:

### Required Secrets:

1. **GCP_PROJECT_ID**
   ```
   montagna-travel-site
   ```

2. **GCP_SA_KEY**
   - Paste the entire contents of the service account JSON file

3. **DATABASE_URL**
   For development/testing:
   ```
   postgresql://montagna:montagna_dev_2024@localhost:5432/montagna_puck?schema=public
   ```

   For production with Cloud SQL:
   ```
   postgresql://montagna:password@/montagna_puck?host=/cloudsql/montagna-travel-site:us-central1:montagna-db
   ```

4. **NEXT_PUBLIC_URL**
   ```
   https://montagna-puck-xxxxx-us-central1.a.run.app
   ```
   (Update after first deployment with actual URL)

## Step 5: Deploy

The GitHub Action will automatically deploy when you push to the main branch.

To trigger the first deployment:
```bash
git add DEPLOYMENT_GUIDE.md
git commit -m "docs: Add deployment guide"
git push
```

## Step 6: Access Your Application

After deployment completes (~5-10 minutes), your app will be available at:
- Cloud Run URL: Check GitHub Actions logs for the exact URL
- Format: `https://montagna-puck-[hash]-us-central1.a.run.app`

### Application Routes:
- `/admin/[page-name]` - Puck editor (e.g., `/admin/swiss-alps-2026`)
- `/preview/[page-name]` - Preview draft changes
- `/[page-name]` - Published pages

## Step 7: Configure Custom Domain (Optional)

1. In Cloud Run, go to your service
2. Click "Manage Custom Domains"
3. Add your domain
4. Update DNS records as instructed
5. SSL certificate will be automatically provisioned

## Troubleshooting

### If GitHub push fails:
- Make sure repository exists at https://github.com/rtaylorgraham/montagna-puck
- Verify SSH key is working: `ssh -T git@github.com-personal`

### If deployment fails:
- Check GitHub Actions logs
- Verify all secrets are set correctly
- Ensure service account has correct permissions

### Database connection issues:
- For local dev: Ensure PostgreSQL is running in Docker
- For production: Set up Cloud SQL instance first

## Local Development

```bash
# Install dependencies
npm install

# Run database migrations
npx prisma db push

# Start development server
npm run dev
```

Access at: http://localhost:3000

## Support

- Repository: https://github.com/rtaylorgraham/montagna-puck
- Cloud Console: https://console.cloud.google.com/run?project=montagna-travel-site
- GitHub Actions: https://github.com/rtaylorgraham/montagna-puck/actions