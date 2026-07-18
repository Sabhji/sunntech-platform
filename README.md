# SunnTech - Cybersecurity Freelance Platform

A modern platform connecting cybersecurity professionals with freelance projects. Built with Next.js, React, and TailwindCSS.

## 🚀 Features

- **Project Listings**: Browse cybersecurity projects across various categories
- **Advanced Filtering**: Filter projects by category, skill level, and search by keywords
- **Project Details**: View detailed information about each project including budget, duration, and required skills
- **Responsive Design**: Fully responsive UI that works on all devices
- **Modern UI**: Clean, professional interface built with TailwindCSS and shadcn/ui components
- **Beginner Friendly**: Projects categorized by difficulty level (Beginner, Intermediate, Advanced)

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm

## 🛠️ Installation

1. **Navigate to the project directory**
   ```bash
   cd "c:\Users\sidha\Downloads\SUNNTECH"
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
SUNNTECH/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   ├── projects/          # Projects pages
│   │   │   ├── [id]/         # Individual project detail page
│   │   │   └── page.tsx      # Projects listing page
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx          # Homepage
│   │   └── globals.css       # Global styles
│   ├── components/            # React components
│   │   ├── ui/               # UI components (Button, Card, Badge, Input)
│   │   ├── Navbar.tsx        # Navigation bar
│   │   └── Footer.tsx        # Footer component
│   ├── data/                 # Data files
│   │   └── projects.ts       # Sample project data
│   └── lib/                  # Utility functions
│       └── utils.ts          # Helper functions
├── public/                   # Static assets
├── package.json              # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # TailwindCSS configuration
├── next.config.js           # Next.js configuration
└── README.md                # This file
```

## 🎨 Pages

### Homepage (`/`)
- Hero section with platform introduction
- Featured projects showcase
- Platform benefits and features
- Call-to-action buttons

### Projects Page (`/projects`)
- Complete project listing
- Search functionality
- Filter by category (Penetration Testing, Security Auditing, etc.)
- Filter by skill level (Beginner, Intermediate, Advanced)
- Project cards with key information

### Project Detail Page (`/projects/[id]`)
- Detailed project information
- Required skills and technologies
- Budget and duration details
- Application functionality
- Related information

### About Page (`/about`)
- Platform mission and vision
- Features and benefits
- Company values
- Call-to-action

### Contact Page (`/contact`)
- Contact form
- Contact information
- Support options
- Project posting information

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory for environment-specific variables:

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url
```

### TailwindCSS Configuration

The project uses TailwindCSS with custom color schemes and component styles. Configuration is in `tailwind.config.ts`.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Digital Ocean App Platform

### Build Command

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Customization

### Adding New Projects

Edit `src/data/projects.ts` to add new projects:

```typescript
{
  id: "unique-id",
  title: "Project Title",
  description: "Project description",
  category: "Category Name",
  budget: "$500-$800",
  duration: "2-3 weeks",
  level: "Beginner" | "Intermediate" | "Advanced",
  skills: ["Skill1", "Skill2"],
  postedBy: "Company Name",
  postedDate: "2024-01-15",
  status: "Open" | "In Progress" | "Closed"
}
```

### Modifying Styles

- Global styles: `src/app/globals.css`
- Component styles: Use TailwindCSS classes directly in components
- Theme colors: Modify `tailwind.config.ts`

## 🤝 Contributing

This is a personal project for sunntech.in. For suggestions or improvements, please contact the maintainer.

## 📧 Contact

- Website: [sunntech.in](https://sunntech.in)
- Email: contact@sunntech.in

## 📄 License

This project is proprietary and owned by SunnTech.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com)
- Icons by [Lucide](https://lucide.dev)
- Styling with [TailwindCSS](https://tailwindcss.com)

---

**Note**: Due to PowerShell execution policy restrictions, you may need to enable script execution or use an alternative method to run npm commands. You can enable script execution by running PowerShell as Administrator and executing:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Or use Node.js directly with the `node` command instead of npm scripts.
