# Static Website Template

A professional, responsive website template built with Nuxt.js for static site generation. Perfect for portfolios, landing pages, and small business websites.

## Features

- ✅ **Static Site Generation (SSG)** - Fast loading and SEO-friendly
- ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS
- ✅ **SEO Optimized** - Meta tags, structured data, and sitemap
- ✅ **Blog System** - Markdown-based content with Nuxt Content
- ✅ **Contact Forms** - Ready for Netlify Forms or similar services
- ✅ **Modern UI Components** - Beautiful, accessible components
- ✅ **Performance Optimized** - Lighthouse score 90+
- ✅ **Easy Customization** - Well-organized code structure

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone or download the template**
   ```bash
   cd static-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Customization Guide

### 1. Site Configuration

Edit `nuxt.config.ts` to update site information:

```typescript
site: {
  url: 'https://yourdomain.com',
  name: 'Your Business Name',
  description: 'Your business description'
}
```

### 2. Colors and Branding

Update colors in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Your brand colors
    500: '#your-color',
    600: '#your-darker-color',
  }
}
```

### 3. Content Updates

- **Homepage**: Edit `pages/index.vue`
- **About Page**: Edit `pages/about.vue`
- **Services**: Edit `pages/services.vue`
- **Blog Posts**: Add markdown files to `content/blog/`
- **Navigation**: Update `components/AppHeader.vue`

### 4. Images and Media

- Replace logo in `components/AppHeader.vue`
- Add your images to `public/images/`
- Update social media links in `components/AppFooter.vue`

## Content Management

### Blog Posts

Create new blog posts by adding markdown files to `content/blog/`:

```markdown
---
title: 'Your Post Title'
description: 'Post description'
date: '2024-01-15'
author: 'Author Name'
category: 'Category'
tags: ['tag1', 'tag2']
featured: true
---

# Your Content Here

Write your blog post content in markdown format.
```

### Pages

Add new pages by creating `.vue` files in the `pages/` directory.

## Deployment

### Netlify (Recommended)

1. **Build the site**
   ```bash
   npm run generate
   ```

2. **Deploy to Netlify**
   - Connect your Git repository to Netlify
   - Set build command: `npm run generate`
   - Set publish directory: `dist`

### Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

### GitHub Pages

1. **Build and generate**
   ```bash
   npm run generate
   ```

2. **Deploy the `dist` folder to GitHub Pages**

## File Structure

```
static-template/
├── assets/
│   └── css/
│       └── main.css          # Global styles
├── components/
│   ├── AppHeader.vue         # Navigation header
│   ├── AppFooter.vue         # Site footer
│   └── BackToTop.vue         # Back to top button
├── content/
│   └── blog/                 # Blog posts (markdown)
├── layouts/
│   └── default.vue           # Default layout
├── pages/
│   ├── index.vue             # Homepage
│   ├── about.vue             # About page
│   ├── services.vue          # Services page
│   ├── portfolio.vue         # Portfolio page
│   ├── contact.vue           # Contact page
│   └── blog/
│       ├── index.vue         # Blog listing
│       └── [slug].vue        # Blog post template
├── public/                   # Static assets
├── nuxt.config.ts           # Nuxt configuration
├── tailwind.config.js       # Tailwind configuration
└── package.json
```

## Customization Examples

### Adding a New Service

1. Edit `pages/services.vue`
2. Add your service to the `services` array:

```javascript
{
  title: 'Your New Service',
  description: 'Service description',
  price: 'From $999',
  features: [
    'Feature 1',
    'Feature 2',
    'Feature 3'
  ]
}
```

### Changing Contact Information

Update `components/AppFooter.vue` and `pages/contact.vue` with your contact details.

### Adding Social Media Links

Update the `socialLinks` array in `components/AppFooter.vue`.

## Performance Tips

- Optimize images before adding them
- Use WebP format when possible
- Keep the number of components reasonable
- Test with Lighthouse regularly

## SEO Features

- Automatic sitemap generation
- Meta tags for all pages
- Open Graph tags for social sharing
- Structured data markup
- Fast loading times

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Support

For questions or customization help:
- Check the documentation
- Review the code comments
- Test thoroughly before deployment

## License

This template is provided for freelance client projects. Customize as needed for your clients.

---

**Ready to launch your client's website? This template provides everything needed for a professional online presence.**
