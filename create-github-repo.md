# Create GitHub Repository

Please follow these steps to create the repository on your personal GitHub account:

## 1. Create Repository on GitHub

Visit: https://github.com/new

Fill in:
- **Repository name:** `montagna-puck`
- **Description:** Premium cycling travel platform with Puck visual editor
- **Public/Private:** Public
- **Initialize repository:** DO NOT check any boxes (no README, no .gitignore, no license)

Click "Create repository"

## 2. Push the Code

After creating the repository, run this command in your terminal:

```bash
cd C:\Users\rtayl\repos\montagna-puck
git push -u origin master
```

## 3. Set up GitHub Secrets

Go to: https://github.com/rtaylorgraham/montagna-puck/settings/secrets/actions

Add these secrets:

### GCP_PROJECT_ID
Value: `montagna-travel-site`

### GCP_SA_KEY
You'll need to create a service account key:
1. Go to: https://console.cloud.google.com/iam-admin/serviceaccounts?project=montagna-travel-site
2. Create a new service account or use existing
3. Grant roles: Cloud Run Admin, Service Account User, Artifact Registry Writer
4. Create JSON key and paste the entire contents as the secret value

### DATABASE_URL
For production, you'll need a Cloud SQL instance. For now, you can use:
```
postgresql://user:password@/dbname?host=/cloudsql/PROJECT_ID:REGION:INSTANCE_NAME
```

## 4. Enable GitHub Actions

The workflow will automatically run when you push to the main branch.

## Repository will be available at:
https://github.com/rtaylorgraham/montagna-puck