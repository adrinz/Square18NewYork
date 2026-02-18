# Square18 New York

A modern, elegant e-commerce website for Square18 New York LLC - your premier destination for quality general merchandise.

![Square18 New York](public/assets/logo.png)

## About

Square18 New York is an online retail store (e-commerce) established in 2021, specializing in general merchandise. Based in Suffolk County, New York, we are committed to providing curated, quality products with exceptional customer service.

**Business Information:**
- **Entity:** Square18 New York LLC
- **Location:** 160 Walt Whitman Rd, Huntington Station, NY 11746
- **Established:** 2021

## Features

- **Modern UI/UX**: Contemporary, elegant design with smooth user experience
- **Responsive Design**: Optimized for all devices - desktop, tablet, and mobile
- **Product Catalog**: Organized categories with filtering and search functionality
- **Brand Story**: Compelling about page with business credentials
- **Wholesale Portal**: Dedicated partnership application for brands and suppliers
- **Contact System**: Easy-to-use contact forms and support information
- **Shipping Info**: Clear shipping options and return policy details

## Pages

1. **Home** - Hero section, value proposition, featured products, testimonials
2. **Products** - Full catalog with filtering, sorting, and search
3. **About** - Brand story, values, business credentials
4. **Wholesale** - Partnership information and application form
5. **Contact** - Contact form, FAQ, and support information
6. **Shipping** - Shipping options and return policy

## Technology Stack

- **React 18** - Modern React with hooks
- **React Router 6** - Client-side routing
- **CSS Variables** - Design system with custom properties
- **Lucide React** - Beautiful, customizable icons

## Project Structure

```
Square18NewYork/
├── public/
│   ├── index.html
│   └── assets/
│       └── logo.png
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── Header.css
│   │   │   ├── Footer.jsx
│   │   │   ├── Footer.css
│   │   │   └── index.js
│   │   └── products/
│   │       ├── ProductCard.jsx
│   │       ├── ProductCard.css
│   │       └── index.js
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── HomePage.css
│   │   ├── ProductsPage.jsx
│   │   ├── ProductsPage.css
│   │   ├── AboutPage.jsx
│   │   ├── AboutPage.css
│   │   ├── WholesalePage.jsx
│   │   ├── WholesalePage.css
│   │   ├── ContactPage.jsx
│   │   ├── ContactPage.css
│   │   ├── ShippingPage.jsx
│   │   ├── ShippingPage.css
│   │   └── index.js
│   ├── data/
│   │   └── products.js
│   ├── styles/
│   │   ├── variables.css
│   │   └── globals.css
│   ├── App.jsx
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd Square18NewYork
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm eject` - Ejects from Create React App (one-way operation)

## Design System

### Colors

- **Primary:** #1a1a1a (Elegant Black)
- **Secondary:** #c9a962 (Warm Gold)
- **Neutrals:** Full grayscale palette
- **Semantic:** Success, Warning, Error, Info

### Typography

- **Primary Font:** Inter (Sans-serif)
- **Display Font:** Playfair Display (Serif)

### Components

All components follow a consistent design language with:
- Smooth transitions and hover effects
- Accessible focus states
- Responsive breakpoints
- CSS custom properties for theming

## Contributing

This is a private project for Square18 New York LLC. For partnership inquiries, please contact:
- **Email:** partners@square18ny.com
- **Phone:** (123) 456-7890

## License

Copyright © 2025 Square18 New York LLC. All rights reserved.
