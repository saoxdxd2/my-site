/**
 * Global type definitions for static template
 */

export interface SiteConfig {
  siteUrl: string
  siteName: string
  contactEmail: string
  googleAnalytics?: string
}

export interface BlogPost {
  _path: string
  title: string
  description: string
  date: string
  author: string
  category: string
  tags: string[]
  image?: string
  readingTime?: number
  draft?: boolean
}

export interface PortfolioItem {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  image: string
  gallery?: string[]
  url?: string
  github?: string
  featured: boolean
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  price?: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  social: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  image?: string
  rating: number
}

export interface ContactForm {
  name: string
  email: string
  subject?: string
  message: string
  phone?: string
  company?: string
}

export interface NavigationItem {
  label: string
  href: string
  children?: NavigationItem[]
}

export interface SEOMeta {
  title: string
  description: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  author?: string
  publishedTime?: string
  modifiedTime?: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta
}
