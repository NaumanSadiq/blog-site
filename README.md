# DevBlog - A Modern Full-Stack Blog Platform

A beautiful, theme-aware blog platform built with React, TypeScript, and modern web technologies. Features three stunning visual themes (Morning, Evening, Night) and a component-based blog system for easy content management.

![DevBlog Preview](https://via.placeholder.com/1200x600/3B82F6/FFFFFF?text=DevBlog+Preview)

## ✨ Features

- **🎨 Three Beautiful Themes**: Morning (Fresh & Bright), Evening (Warm & Golden), Night (Dark & Cool)
- **📱 Fully Responsive**: Works perfectly on desktop, tablet, and mobile
- **⚡ Fast & Modern**: Built with Vite, React 18, and TypeScript
- **🔍 Search Functionality**: Find articles instantly with real-time search
- **📝 Component-Based Blogs**: Add new blogs by simply creating React components
- **🎯 Automatic Discovery**: New blogs automatically appear on the homepage
- **💅 Beautiful UI**: Modern design with smooth animations and transitions
- **🏷️ Tag System**: Organize content with tags and categories

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd devblog
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**

   Navigate to `http://localhost:8080` to see your blog in action!

## 🏗️ Project Structure

```
devblog/
├── client/                     # Frontend React application
│   ├── blogs/                  # 📝 Blog components and registry
│   │   ├── index.ts           # Blog registry (auto-discovery)
│   │   └── *.tsx              # Individual blog components
│   ├── components/             # Reusable UI components
│   │   ├── ui/                # Base UI components (shadcn/ui)
│   │   ├── BlogCard.tsx       # Blog preview card
│   │   ├── BlogLayout.tsx     # Blog detail page layout
│   │   └── ThemeSwitcher.tsx  # Theme selection component
│   ├── hooks/                 # Custom React hooks
│   │   ├── use-theme.tsx      # Theme management
│   │   └── use-toast.ts       # Toast notifications
│   ├── pages/                 # Page components
│   │   ├── Index.tsx          # Homepage with blog listing
│   │   ├── BlogDetail.tsx     # Individual blog view
│   │   └── NotFound.tsx       # 404 page
│   ├── types/                 # TypeScript type definitions
│   │   └── blog.ts            # Blog-related types
│   ├── global.css             # Global styles and theme variables
│   └── main.tsx               # App entry point
├── server/                     # Express backend (optional)
├── shared/                     # Shared types between client/server
└── README.md                   # This file
```

## 📝 Creating a New Blog Post

Adding a new blog to your site is incredibly simple! Follow these steps:

### Step 1: Create Your Blog Component

Create a new file in the `client/blogs/` directory:

```bash
# Example: creating a blog about React hooks
touch client/blogs/mastering-react-hooks.tsx
```

### Step 2: Write Your Blog Content

```tsx
// client/blogs/mastering-react-hooks.tsx
import { BlogMetadata } from "@/types/blog";

// Define your blog metadata
export const metadata: BlogMetadata = {
  id: "mastering-react-hooks",
  title: "Mastering React Hooks: A Complete Guide",
  description:
    "Learn how to use React hooks effectively in your applications with practical examples and best practices.",
  thumbnail: "/api/placeholder/800/400", // Or use a real image URL
  author: "Nauman Sadiq",
  date: "2024-01-20",
  readTime: "12 min read",
  tags: ["React", "Hooks", "JavaScript", "Frontend"],
  category: "Frontend Development",
};

// Create your blog component
export default function MasteringReactHooks() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-8 theme-surface rounded-xl shadow-lg">
      <header className="mb-8">
        <h1 className="text-4xl font-bold theme-text-primary mb-4">
          {metadata.title}
        </h1>
        <div className="flex items-center gap-4 theme-text-secondary mb-6">
          <span>By {metadata.author}</span>
          <span>•</span>
          <span>{metadata.date}</span>
          <span>•</span>
          <span>{metadata.readTime}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {metadata.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 theme-accent-bg/20 theme-accent rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <img
          src={metadata.thumbnail}
          alt={metadata.title}
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
      </header>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl theme-text-primary leading-relaxed mb-6">
          React hooks revolutionized how we write React components...
        </p>

        <h2 className="text-2xl font-semibold theme-text-primary mt-8 mb-4">
          What are React Hooks?
        </h2>
        <p className="theme-text-secondary leading-relaxed mb-6">
          React hooks are functions that let you "hook into" React state and
          lifecycle features...
        </p>

        {/* Add your blog content here */}
      </div>
    </article>
  );
}
```

### Step 3: Register Your Blog

Add your blog to the registry in `client/blogs/index.ts`:

```tsx
// client/blogs/index.ts
import { BlogPost } from "@/types/blog";

// Import existing blogs
import ManagingStateLaravelAngular, {
  metadata as managingStateLaravelAngularMeta,
} from "./managing-state-laravel-angular";

// Import your new blog
import MasteringReactHooks, {
  metadata as masteringReactHooksMeta,
} from "./mastering-react-hooks";

// Register all blogs here
export const allBlogs: BlogPost[] = [
  {
    metadata: managingStateLaravelAngularMeta,
    component: ManagingStateLaravelAngular,
  },
  // Add your new blog to this array
  {
    metadata: masteringReactHooksMeta,
    component: MasteringReactHooks,
  },
  // Add more blogs here as you create them
];

// Helper functions (don't modify these)
export function getBlogById(id: string): BlogPost | undefined {
  return allBlogs.find((blog) => blog.metadata.id === id);
}

export function getAllBlogMetadata() {
  return allBlogs.map((blog) => blog.metadata);
}
```

### Step 4: That's It! 🎉

Your blog will automatically appear on the homepage! The system will:

- ✅ Display your blog in the grid layout
- ✅ Make it searchable by title, description, and tags
- ✅ Create a dedicated URL at `/blog/your-blog-id`
- ✅ Apply the current theme styling
- ✅ Show it in the featured section if it's the first blog

## 🎨 Theme System

The blog supports three beautiful themes that users can switch between:

### 🌅 Morning Theme

- **Colors**: Fresh blues and whites
- **Mood**: Clean, energetic, professional
- **Best for**: Daytime reading

### 🌇 Evening Theme

- **Colors**: Warm oranges and golds
- **Mood**: Cozy, comfortable, inviting
- **Best for**: Relaxed browsing

### 🌙 Night Theme

- **Colors**: Deep purples and dark blues
- **Mood**: Focused, easy on the eyes
- **Best for**: Late-night coding sessions

### Using Theme Classes

When writing blog content, use these theme-aware CSS classes:

```tsx
// Text colors
<h1 className="theme-text-primary">Main headings</h1>
<p className="theme-text-secondary">Body text and descriptions</p>

// Backgrounds
<div className="theme-surface">Cards and containers</div>
<div className="theme-surface-hover">Interactive elements</div>

// Accent colors
<span className="theme-accent">Highlighted text</span>
<button className="theme-accent-bg">Accent backgrounds</button>

// Gradients
<div className="theme-gradient-bg">Full page backgrounds</div>
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run start        # Start production server

# Quality & Testing
npm run typecheck    # Run TypeScript type checking
npm test            # Run Vitest tests
npm run format.fix  # Format code with Prettier
```

## 🎯 Blog Metadata Guide

Each blog requires metadata to define how it appears on the homepage:

```tsx
export const metadata: BlogMetadata = {
  id: "unique-blog-id", // Used in URL: /blog/unique-blog-id
  title: "Your Amazing Blog Title", // Shown on cards and detail page
  description: "A compelling description", // Shown in preview cards
  thumbnail: "/path/to/image.jpg", // Featured image URL
  author: "Your Name", // Author attribution
  date: "2024-01-20", // Publication date (YYYY-MM-DD)
  readTime: "8 min read", // Estimated reading time
  tags: ["React", "TypeScript"], // Searchable tags
  category: "Web Development", // Blog category
};
```

## 📂 Image Management

For blog images, you can:

1. **Use placeholder images**: `/api/placeholder/800/400`
2. **Add images to public folder**: `/public/images/blog-image.jpg`
3. **Use external URLs**: `https://example.com/image.jpg`
4. **Use image hosting services**: Cloudinary, Imgur, etc.

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates optimized files in the `dist/` directory.

### Deploy Options

- **Netlify**: Connect your repo for automatic deployments
- **Vercel**: Zero-config deployments for React apps
- **Traditional hosting**: Upload `dist/` folder contents
- **Docker**: Use included Dockerfile

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 🔧 Customization

### Adding New Themes

1. Add theme colors to `client/global.css`
2. Update the theme switcher in `client/components/ThemeSwitcher.tsx`
3. Add the new theme to the `Theme` type in `client/hooks/use-theme.tsx`

### Customizing the Homepage

Edit `client/pages/Index.tsx` to modify:

- Hero section content
- Blog layout and styling
- Search functionality
- Featured blog logic

### Adding New UI Components

The project uses [shadcn/ui](https://ui.shadcn.com/) for base components. Add new ones with:

```bash
npx shadcn-ui@latest add [component-name]
```

## 📞 Support

If you encounter any issues or have questions:

1. Check the existing blog examples in `client/blogs/`
2. Review the component structure in `client/components/`
3. Look at the theme system in `client/global.css`

## 🎉 Happy Blogging!

You're all set to create amazing blog content! The system is designed to be simple yet powerful - focus on writing great content, and let the platform handle the rest.

---

**Built with ❤️ by [Nauman Sadiq](https://github.com/yourusername)**

_Full Stack Developer | 4+ Years Experience | Laravel | Angular | React | TypeScript_
