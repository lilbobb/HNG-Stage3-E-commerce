# Audiophile E-commerce Website

A sophisticated, pixel-perfect e-commerce platform for high-end audio equipment built with Next.js, TypeScript, and Convex.

![Audiophile Screenshot](/public/assets/preview.jpg)

##  Live Demo
[Live Demo Link](https://your-deployed-app.vercel.app)

## Project Overview

Audiophile is a full-stack e-commerce application featuring a complete shopping experience with product catalog, cart management, and secure checkout with email confirmations.

## Features

### Core Functionality
- **Product Catalog** - Browse headphones, speakers, and earphones
- **Shopping Cart** - Add, remove, and update product quantities
- **Checkout Process** - Complete order form with validation
- **Order Management** - Save orders to database with confirmation emails
- **Responsive Design** - Perfect across all device sizes

### Technical Features
- **Next.js 14** - App Router with React Server Components
- **TypeScript** - Full type safety
- **Convex Backend** - Real-time database and server functions
- **Resend** - Transactional email delivery
- **Tailwind CSS** - Modern, utility-first styling
- **Responsive Images** - Optimized loading with Next.js Image

## Project Structure

audiophile/
├── app/ # Next.js App Router\
│ ├── [category]/ # Dynamic category pages\
│ ├── checkout/ # Checkout flow\
│ ├── product/[slug]/ # Product detail pages\
│ └── api/orders/ # Order processing API\
├── components/ # React components\
│ ├── cart/ # Shopping cart components\
│ ├── checkout/ # Checkout-specific components\
│ ├── layout/ # Header, Footer, Navigation\
│ └── ui/ # Reusable UI components\
├── convex/ # Backend schema and functions\
└── lib/ # Utilities and configurations


##  Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Convex account
- Resend account (for emails)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/audiophile.git
   cd audiophile

   Install dependencies

bash
npm install
Environment Setup
Create a .env.local file:

Environment Setup
Create a .env.local file:

# Convex
CONVEX_DEPLOYMENT=your-convex-deployment-url

# Resend (for email confirmations)
RESEND_API_KEY=re_your_api_key_here

# Setup Convex Backend

bash
npx convex dev
This will guide you through Convex setup and deploy your schema.

# Run the development server

bash
npm run dev

Open your browser
Navigate to http://localhost:3000

# Key Implementation Details

# Checkout Flow

User fills out checkout form with shipping and payment details

Form validation ensures all required fields are completed

Order data is sent to /api/orders endpoint

Order is saved to Convex database

Confirmation email is sent via Resend

Success modal displays order confirmation

Database Schema

// Products
{
  name: string
  slug: string
  category: 'headphones' | 'speakers' | 'earphones'
  price: number
  description: string
  images: { desktop, mobile, tablet }
  features: string
  includes: Array<{ quantity, item }>
}

// Orders
{
  customer: { name, email, phone }
  shipping: { address, city, zip, country }
  items: Array<{ id, name, price, quantity }>
  totals: { subtotal, shipping, taxes, grandTotal }
  status: string
  createdAt: number
}

# Email Templates
Responsive HTML emails with order summaries

Customer and shipping information

Professional branding matching the site design

Built With
Frontend: Next.js 14, React, TypeScript, Tailwind

Backend: Convex (Database & Server Functions)

Email: Resend

# Deployment: 

Responsive Breakpoints
Mobile: < 768px

Tablet: 768px - 1024px

Desktop: > 1024px

# Design System
Primary Color: #D87D4A (Orange)

Secondary Color: #101010 (Dark)

Background: #FAFAFA (Light)

Text: #000000 & #FFFFFF

# Development Scripts

npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npx convex dev       # Develop Convex backend

# License
This project is built for educational purposes as part of the Frontend Wizards Stage 3 task.