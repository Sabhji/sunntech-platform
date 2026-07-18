# Deployment Guide for sunntech.in

## Option 1: Vercel (Recommended - Free)

Vercel is the best option for Next.js applications and offers free hosting with custom domains.

### Step 1: Push to GitHub

1. Create a GitHub repository for your project
2. Initialize git in your project folder:
   ```bash
   cd "c:\Users\sidha\Downloads\SUNNTECH"
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Push to GitHub (replace with your repository URL):
   ```bash
   git remote add origin https://github.com/your-username/sunntech-platform.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New Project" 
3. Import your GitHub repository
4. Vercel will automatically detect Next.js and configure settings
5. Click "Deploy"

### Step 3: Add Custom Domain

1. After deployment, go to your project settings in Vercel
2. Navigate to "Domains"
3. Add `sunntech.in`
4. Vercel will provide DNS records to add to your domain registrar

### Step 4: Configure DNS

Log into your domain registrar (where you bought sunntech.in) and add these DNS records:

**If using sunntech.in as main domain:**
```
Type: A
Name: @
Value: 76.76.21.21 (Vercel's IPv4)

Type: AAAA  
Name: @
Value: 2606:4700:4700::1111 (Vercel's IPv6)
```

**If using www.sunntech.in:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 5: Verify

Wait 5-30 minutes for DNS propagation, then visit sunntech.in

---

## Option 2: Netlify (Free Alternative)

### Step 1: Build Locally First

Since npm commands are blocked, you'll need to enable script execution or use an alternative method.

### Step 2: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and sign up
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add custom domain in site settings

---

## Option 3: Traditional Hosting (cPanel/Plesk)

If you have traditional hosting with cPanel:

### Step 1: Build the Project

1. Enable PowerShell script execution (as Administrator):
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

2. Install dependencies and build:
   ```bash
   cd "c:\Users\sidha\Downloads\SUNNTECH"
   npm install
   npm run build
   ```

### Step 2: Export Static Files

Add to `next.config.js`:
```javascript
module.exports = {
  output: 'export',
  images: { unoptimized: true }
}
```

Build again:
```bash
npm run build
```

### Step 3: Upload to Hosting

1. Upload contents of `out/` folder to your hosting public directory
2. Configure domain in hosting control panel

---

## Quick Start with Vercel (Easiest)

Since you have PowerShell execution issues, Vercel is the best option because:

1. **No local build required** - Vercel builds automatically from GitHub
2. **Free SSL certificates** - HTTPS included automatically
3. **Automatic deployments** - Updates when you push to GitHub
4. **Custom domain support** - Easy sunntech.in setup
5. **Global CDN** - Fast loading worldwide

## Troubleshooting

### PowerShell Execution Policy
If you need to run npm commands locally:
```powershell
# Run as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Build Errors
- Ensure all dependencies are in package.json
- Check Node.js version (requires 18+)
- Verify TypeScript configuration

### DNS Propagation
- DNS changes can take 5-30 minutes
- Use [whatsmydns.net](https://www.whatsmydns.net/) to check propagation
- Clear browser cache if site doesn't load

## Recommended Next Steps

1. **Create GitHub repository** for your project
2. **Deploy to Vercel** using GitHub integration
3. **Add sunntech.in domain** in Vercel settings
4. **Configure DNS** at your domain registrar
5. **Test deployment** by visiting your domain

## Support

- Vercel Documentation: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- Domain Issues: Contact your domain registrar support
