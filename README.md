# Montagna Puck - Visual Page Builder

A modern, self-hosted visual page builder for Montagna Travel, built with Puck editor and deployed on Google Cloud Platform.

## 🚀 Features

- **Visual Editing**: Drag-and-drop page builder with live preview
- **Custom Components**: Hero carousel (SwiperJS), climb cards, and more
- **Single Environment**: Simple edit → preview → publish workflow
- **Serverless**: Runs on Cloud Run with auto-scaling
- **Cost-Effective**: Pay only for what you use (~$35-40/month)

## 📁 Project Structure

```
montagna-puck/
├── app/
│   ├── admin/[[...path]]/   # Visual editor
│   ├── preview/[[...path]]/ # Preview pages
│   ├── [[...slug]]/         # Published pages
│   └── api/puck/            # Save/load API
├── components/puck/         # Custom Puck components
├── lib/                     # Configuration
└── prisma/                  # Database schema
```

## 🛠️ Local Development

### Prerequisites

- Node.js 20+
- PostgreSQL 14+
- Git

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/montagna-puck.git
   cd montagna-puck
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL**
   ```bash
   # Create database
   createdb montagna_puck
   
   # Run migrations
   npx prisma db push
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open the editor**
   - Editor: http://localhost:3000/admin/swiss-alps-2026
   - Preview: http://localhost:3000/preview/swiss-alps-2026
   - Published: http://localhost:3000/swiss-alps-2026

## 🎨 Using the Editor

### Creating a Page

1. Go to `/admin/your-page-name`
2. Drag components from the sidebar
3. Configure component properties
4. Click "Publish" to save

### Available Components

- **HeroCarousel**: Image carousel with text overlays
- **ClimbCard**: Interactive cards for mountain passes
- **TextBlock**: Rich text content
- **Container**: Layout wrapper
- **Columns**: Multi-column layouts

### Adding Custom Components

1. Create component in `components/puck/`
2. Add to `lib/puck-config.tsx`
3. Define fields and default props
4. Component is now available in editor

## ☁️ GCP Deployment

### Initial Setup

1. **Run setup script**
   ```bash
   chmod +x setup-gcp.sh
   ./setup-gcp.sh
   ```

2. **Create service account**
   - Go to IAM & Admin > Service Accounts
   - Create account with roles:
     - Cloud Run Admin
     - Cloud SQL Client
     - Service Account User
   - Download JSON key

3. **Add GitHub secrets**
   - `GCP_SA_KEY`: Service account JSON
   - `DATABASE_URL`: PostgreSQL connection string
   - `NEXT_PUBLIC_URL`: Your domain

4. **Deploy**
   ```bash
   git push origin main
   ```

### Manual Deployment

```bash
# Build and deploy to Cloud Run
gcloud run deploy montagna-puck \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```

## 🔧 Configuration

### Environment Variables

```env
# Database (Cloud SQL)
DATABASE_URL="postgresql://user:pass@localhost/db?host=/cloudsql/project:region:instance"

# Application
NEXT_PUBLIC_URL="https://yourdomain.com"

# Optional: Authentication
NEXTAUTH_SECRET="your-secret"
```

### Custom Domain

1. Go to Cloud Run console
2. Select your service
3. Click "Manage Custom Domains"
4. Add your domain
5. Update DNS records

## 📊 Architecture

- **Frontend**: Next.js 14 with App Router
- **Editor**: Puck visual builder
- **Database**: PostgreSQL (Cloud SQL)
- **Hosting**: Cloud Run (serverless)
- **CDN**: Cloud CDN
- **CI/CD**: GitHub Actions

## 💰 Cost Breakdown

Monthly costs (low traffic):
- Cloud Run: ~$5-10
- Cloud SQL: ~$10
- Load Balancer: ~$18
- Storage: ~$1
- **Total**: ~$35-40/month

## 🚦 Workflow

1. **Edit**: `/admin/page-name` - Visual editor
2. **Preview**: `/preview/page-name` - Test changes
3. **Publish**: `/page-name` - Live page

## 📝 Database Schema

```prisma
model Page {
  id        String   @id
  path      String   @unique
  data      Json     // Published content
  draft     Json?    // Draft content
  published Boolean
  createdAt DateTime
  updatedAt DateTime
}
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit pull request

## 📄 License

MIT License - See LICENSE file

## 🆘 Support

- Create an issue on GitHub
- Check Puck documentation: https://puckeditor.com/docs
- GCP documentation: https://cloud.google.com/run/docs

---

Built with ❤️ by Montagna Travel