# AC Repair Service - Production-Ready Bilingual Appliance Repair Web Platform

A high-performance, bilingual (English & বাংলা) appliance repair service website built for **AC Repair Service** (`acrepairservice.com`), serving West Bengal, India (Kolkata, Howrah, Durgapur, Siliguri, Asansol, Bardhaman, Malda, Kharagpur, Haldia, Berhampore).

Designed with a modern, premium UX inspired by category-first service discovery (spacious layout, clear pricing transparency, and instant booking workflows) while featuring an original, bespoke brand identity.

---

## Table of Contents

1. [Features & Architecture](#features--architecture)
2. [Tech Stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Environment Configuration](#environment-configuration)
5. [Local Development](#local-development)
6. [Hostinger MySQL Setup & Migration](#hostinger-mysql-setup--migration)
7. [Default Admin Credentials](#default-admin-credentials)
8. [AI Blog Setup (Gemini & OpenAI)](#ai-blog-setup-gemini--openai)
9. [Email & WhatsApp Notifications Setup](#email--whatsapp-notifications-setup)
10. [Production Deployment to Hostinger](#production-deployment-to-hostinger)
11. [SEO & Bilingual URL Structure](#seo--bilingual-url-structure)
12. [Verification & Test Suite](#verification--test-suite)

---

## Features & Architecture

- **5 Primary Appliance Service Categories**:
  - AC Repair (`/ac-repair`, `/bn/ac-repair`)
  - Refrigerator / Fridge Repair (`/fridge-repair`, `/bn/fridge-repair`)
  - Washing Machine Repair (`/washing-machine-repair`, `/bn/washing-machine-repair`)
  - Microwave Oven Repair (`/microwave-repair`, `/bn/microwave-repair`)
  - LED TV Repair (`/led-tv-repair`, `/bn/led-tv-repair`)
- **Transparent ₹299 Pricing Model**: Clear communication of the ₹299 Visit & Inspection fee across modals, category pages, and forms with explicit notice that repair quotes are given post-diagnosis with customer approval.
- **Bilingual SEO Architecture (EN | বাংলা)**:
  - English routes: `/`, `/[categorySlug]`, `/blog`, `/blog/[slug]`, `/privacy-policy`, etc.
  - Bangla routes: `/bn/`, `/bn/[categorySlug]`, `/bn/blog`, `/bn/blog/[slug]`, `/bn/privacy-policy`, etc.
  - Canonical URLs, bidirectional `hreflang` tags, dynamic `sitemap.xml`, and `robots.txt`.
- **Location Selector**: Header location selector for West Bengal cities updating URL hash (`/#kolkata`, `/#howrah`, etc.) without generating premature duplicate SEO pages.
- **Interactive Service Search**: Real-time modal search indexing services, problem symptoms, and admin-defined keywords (excludes blog articles).
- **Brand Selector**: Combines searchable brand dropdown and interactive brand logo grid for 12 major brands (Samsung, LG, Whirlpool, Voltas, Godrej, Haier, Panasonic, Daikin, Sony, IFB, Bosch, Blue Star).
- **Problem Diagnosis Modal / Bottom-Sheet**: Opens detailed symptoms, inspection fee details, and one-click triggers for Call, WhatsApp, and Booking.
- **Conversion-Optimized Booking System**:
  - Rigorous client & server-side validation. Submit button remains disabled until all 8 required fields (Name, Mobile, Service, Brand, Problem, Address, Date, Time) are valid.
  - Generates unique Booking IDs (`ACR-YYYYMM-XXXX`).
  - Dispatches immediate email notification to business inbox via Nodemailer SMTP.
  - Prepares structured WhatsApp lead message.
  - Dedicated reassuring Booking Success page.
- **Isolated SEO Blog & AI Generator**:
  - Blog strictly contained inside `/blog` and `/bn/blog` (no leaks into homepage or category pages).
  - Admin AI generation supporting **Google Gemini API** (`gemini-2.5-flash`) and **OpenAI API** (`gpt-4o-mini`).
  - Strict human-in-the-loop workflow: **AI Generate → Draft → Admin Review/Edit → Manual Publish** (Never auto-publishes).
  - Auto-generates complete SEO metadata, focus keywords, FAQ schema, and article schema.
- **Comprehensive Admin Control Panel (`/admin`)**:
  - Protected with bcrypt password hashing and HTTP-only session cookies.
  - Manage Categories, Common Problems, Brands & Category assignments, West Bengal Locations, Customer Reviews, Blog articles, AI API keys, Site settings (Phone, WhatsApp, Business Email, Working Hours), and Local Media uploads.
- **Hostinger-Optimized**:
  - Uses Hostinger MySQL (`mysql2/promise` connection pool).
  - Uses Hostinger local filesystem storage (`public/uploads`) for zero external asset dependencies (No Cloudinary, No Supabase, No MongoDB).
  - High cache efficiency via Static Generation (SSG) and Incremental Static Regeneration (ISR).

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack, TypeScript strict mode)
- **UI Library**: React 19, Lucide React icons
- **Styling**: Pure Vanilla CSS design system (Teal `#146C5B`, Amber `#E8A33D`, Off-White `#F8FAF9`, Space Grotesk, Inter, Noto Sans Bengali)
- **Database**: Hostinger MySQL (with in-memory fallback for build/offline environments)
- **Authentication**: Bcrypt.js & Signed JSON Web Tokens (HTTP-Only Secure Cookie)
- **Validation**: Zod schema validation
- **Notifications**: Nodemailer (SMTP) & WhatsApp URL / Webhook integration
- **AI Integration**: `@google/genai` (Gemini) & `openai` (GPT-4o)

---

## Prerequisites

- **Node.js**: v18.18.0 or v20+ recommended
- **npm**: v9+ (or use `npm.cmd` on Windows)
- **MySQL**: MySQL 8.0+ or MariaDB 10.4+ (Provided by Hostinger cPanel / hPanel)

---

## Environment Configuration

Create a `.env.local` file in the project root by copying `.env.example`:

```bash
cp .env.example .env.local
```

### Key Environment Variables

```env
# 1. Base URL & Site Identity
NEXT_PUBLIC_SITE_URL=https://acrepairservice.com

# 2. Hostinger MySQL Database Credentials
DB_HOST=localhost
DB_PORT=3306
DB_USER=u123456789_acuser
DB_PASSWORD=YourStrongDatabasePassword123!
DB_NAME=u123456789_acrepair

# 3. Super Admin Authentication & Security
ADMIN_EMAIL=admin@acrepairservice.com
ADMIN_PASSWORD=Admin@2026
JWT_SECRET=super-secret-jwt-token-key-west-bengal-2026-production

# 4. Nodemailer SMTP (For Dispatching Leads to Business Email)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=service@acrepairservice.com
SMTP_PASS=YourEmailPassword123!
SMTP_FROM="AC Repair Service" <service@acrepairservice.com>
BUSINESS_EMAIL=service@acrepairservice.com

# 5. AI Providers for Blog Draft Generation (Optional / Configurable via Admin)
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# 6. WhatsApp Webhook (Optional - if integrating with automated WhatsApp Business Cloud API)
# WHATSAPP_WEBHOOK_URL=https://your-whatsapp-provider-webhook
```

---

## Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build & Test Production Bundle Locally**:
   ```bash
   npm run build
   npm run start
   ```

---

## Hostinger MySQL Setup & Migration

### Step 1: Create Database in Hostinger hPanel
1. Log into your Hostinger hPanel.
2. Navigate to **Databases** → **MySQL Databases**.
3. Create a new database:
   - **Database Name**: e.g., `u123456789_acrepair`
   - **Username**: e.g., `u123456789_acuser`
   - **Password**: Choose a strong password.
4. Note down the Database Name, Username, and Password into your `.env.local` or Hostinger environment configuration.

### Step 2: Run Automatic Migration & Seeding
We provide a standalone automated migration script that initializes all tables, foreign keys, indexes, and initial bilingual data:

```bash
npm run db:init
```

The script will:
- Check connection and create the database if not present.
- Execute [`src/lib/schema.sql`](src/lib/schema.sql).
- Hash and register the default Super Admin user.
- Ensure all 5 categories, 15+ problem symptoms, 12 initial brands, 10 West Bengal locations, trust badges, customer reviews, and initial blog posts are ready.

---

## Default Admin Credentials

Access the Admin Panel at:
**[https://acrepairservice.com/admin/login](https://acrepairservice.com/admin/login)** (or `http://localhost:3000/admin/login` locally)

- **Email**: `admin@acrepairservice.com`
- **Password**: `Admin@2026`

*(You can modify the email and password at any time inside the Admin Panel under Settings or by modifying `ADMIN_EMAIL` and `ADMIN_PASSWORD` in your environment variables).*

### Admin Capabilities
- **Dashboard**: Summary metrics of bookings, published articles, drafts, categories, brands, locations, and reviews.
- **Bookings Log**: Chronological view of customer service requests with unique Booking IDs, customer details, problem, preferred date/time, and address.
- **Categories Manager**: Add, edit, or toggle appliance categories (English & Bengali titles, slugs, descriptions).
- **Problems Manager**: Add, edit, or delete common appliance problems and diagnosis descriptions per category.
- **Brands Manager**: Add/edit appliance brands, toggle active status, upload custom brand logos, and map brands to categories.
- **Locations Manager**: Manage West Bengal service coverage cities and display sort orders.
- **Reviews Manager**: Curate verified customer feedback and star ratings.
- **Blog Manager & AI Generator**: Generate SEO articles with Gemini or OpenAI, review drafts, edit content, and manually publish.
- **AI Settings**: Securely store and toggle active AI providers and API keys.
- **Media Library**: Upload and manage brand logos and service illustrations stored directly in Hostinger storage (`public/uploads`).
- **Site Settings**: Live updates for Phone, WhatsApp number, Business Email, Address, Operating Hours, and Social Links.

---

## AI Blog Setup (Gemini & OpenAI)

The platform supports both **Google Gemini API** and **OpenAI API** for draft generation.

1. Obtain your API keys:
   - **Gemini**: [Google AI Studio](https://aistudio.google.com/)
   - **OpenAI**: [OpenAI Platform](https://platform.openai.com/)
2. In the Admin Panel, navigate to **AI Settings** (`/admin/ai-settings`).
3. Select your preferred provider (Gemini or OpenAI) and paste your API key.
4. Go to **Blog** → **Write / Generate Article**.
5. Input your topic, target audience, and select language (English or বাংলা).
6. Click **Generate Article with AI**.
7. The system generates:
   - Title, Slug, Excerpt, Full Markdown Body
   - SEO Title & Meta Description
   - Focus Keyword & Secondary Keywords
   - FAQ Section & JSON-LD FAQ Schema
   - Article Schema
8. The article is saved as a **Draft**. You can review, refine, and **Manually Publish** whenever you are ready.

---

## Email & WhatsApp Notifications Setup

### 1. Booking Email Dispatch (Hostinger Webmail / SMTP)
When a customer submits a booking, lead details are automatically formatted and emailed to the configured business inbox.

Configure in `.env.local` or Hostinger environment:
```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=service@acrepairservice.com
SMTP_PASS=YourHostingerEmailPassword
SMTP_FROM="AC Repair Service" <service@acrepairservice.com>
BUSINESS_EMAIL=service@acrepairservice.com
```

### 2. WhatsApp Integration
- Default WhatsApp Number: `+91 12345 67890` (Editable in Admin Panel under **Settings**).
- When a customer clicks the WhatsApp CTA or completes a booking, a pre-filled, readable WhatsApp lead message is created:

```text
New Service Booking

Booking ID: ACR-202609-2881
Name: Sudipto Ganguly
Mobile: 9830123456
Service: AC Repair
Brand: Voltas
Problem: Gas leakage and cooling stopped
Address: Flat 4B, Sector 2, Salt Lake, Kolkata - 700091
Preferred Date: 2026-09-26
Preferred Time: 09:00 AM - 12:00 PM
```

If you wish to route leads to an automated WhatsApp Business Cloud API webhook, simply set `WHATSAPP_WEBHOOK_URL` in your environment.

---

## Production Deployment to Hostinger

### Method: Hostinger VPS or Cloud Startup (Node.js Application Manager)

1. **Upload Files**:
   - Push your code to your private GitHub/GitLab repository or upload via FTP/SSH.
   - Do NOT upload `node_modules` or `.next`.

2. **Configure Node.js in Hostinger hPanel**:
   - Go to **Websites** → **Node.js**.
   - **Node.js Version**: Select `v20.x` (or `v18.x`).
   - **Application Root**: `/home/u123456789/domains/acrepairservice.com/public_html`
   - **Application Startup File**: `node_modules/next/dist/bin/next` (Arguments: `start -p 3000` or use custom `server.js`).
   - **Environment Variables**: Add all variables from `.env.example`.

3. **Install Dependencies & Build via SSH**:
   ```bash
   cd /home/u123456789/domains/acrepairservice.com/public_html
   npm install --production=false
   npm run db:init
   npm run build
   ```

4. **Uploads Directory Permissions**:
   Ensure write permissions for local media storage:
   ```bash
   chmod -R 755 public/uploads
   ```

5. **Start / Restart Application**:
   Click **Restart Application** in the Hostinger Node.js manager, or use PM2:
   ```bash
   pm2 start npm --name "acrepairservice" -- start
   pm2 save
   ```

---

## SEO & Bilingual URL Structure

| Page | English URL | Bangla (বাংলা) URL |
| :--- | :--- | :--- |
| **Homepage** | `https://acrepairservice.com/` | `https://acrepairservice.com/bn` |
| **AC Repair** | `https://acrepairservice.com/ac-repair` | `https://acrepairservice.com/bn/ac-repair` |
| **Fridge Repair** | `https://acrepairservice.com/fridge-repair` | `https://acrepairservice.com/bn/fridge-repair` |
| **Washing Machine Repair** | `https://acrepairservice.com/washing-machine-repair` | `https://acrepairservice.com/bn/washing-machine-repair` |
| **Microwave Oven Repair** | `https://acrepairservice.com/microwave-repair` | `https://acrepairservice.com/bn/microwave-repair` |
| **LED TV Repair** | `https://acrepairservice.com/led-tv-repair` | `https://acrepairservice.com/bn/led-tv-repair` |
| **Blog Index** | `https://acrepairservice.com/blog` | `https://acrepairservice.com/bn/blog` |
| **Blog Post** | `https://acrepairservice.com/blog/[slug]` | `https://acrepairservice.com/bn/blog/[slug]` |
| **Privacy Policy** | `https://acrepairservice.com/privacy-policy` | `https://acrepairservice.com/bn/privacy-policy` |
| **Terms of Service** | `https://acrepairservice.com/terms-of-service` | `https://acrepairservice.com/bn/terms-of-service` |
| **XML Sitemap** | `https://acrepairservice.com/sitemap.xml` | Included automatically |
| **Robots Exclusion** | `https://acrepairservice.com/robots.txt` | Blocks `/admin` and private APIs |

---

## Verification & Test Suite

Run the automated endpoint and booking verification suite:

```bash
node scripts/test-endpoints.mjs
```

### Verified Checks:
- [x] English & Bengali homepages return `200 OK`
- [x] All 5 category landing pages return `200 OK` in both English and Bengali
- [x] Blog index and individual article pages return `200 OK` with JSON-LD schema
- [x] Booking POST API validates payload, persists to MySQL, generates `ACR-YYYYMM-XXXX` ID, and triggers email
- [x] Admin login authentication & session verification
- [x] XML Sitemap & Robots.txt generation
- [x] Mobile responsive layout (375px) verified with no horizontal overflow
- [x] Zero external SaaS locks (No Cloudinary, No Supabase, No MongoDB)
