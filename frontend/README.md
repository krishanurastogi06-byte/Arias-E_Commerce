# Clothing Brand Frontend - Analysis & Overview

## Project Overview
This is a modern, high-performance e-commerce frontend built for a premium clothing brand. The application is developed using **Next.js 16** (utilizing the App Router) and **React 19**, ensuring a seamless and interactive user experience.

## Tech Stack
*   **Core Framework:** [Next.js 16.2.3](https://nextjs.org/) (App Router)
*   **UI Library:** [React 19.2.4](https://react.dev/)
*   **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **State Management:** React Context API (with localStorage persistence)
*   **Testing:** [Playwright](https://playwright.dev/)

## Key Features
*   **Dynamic Shopping Experience:** Fully functional shop page with product filtering and category browsing.
*   **Cart System:** Real-time cart management (add/remove/update) with persistence using `localStorage`.
*   **User Management:** Mock authentication flow and user profile management.
*   **Interactive Home Page:** Includes Hero Banners, Brand Sections, New Arrivals, and Popular Products.
*   **Mobile-First Design:** Optimized for all screen sizes with a dedicated mobile Bottom Navigation bar.
*   **Rich Content:** Includes a dedicated Blog section and Lookbook for brand storytelling.
*   **Order Tracking:** Post-purchase experience with Order Summary and Tracking features.

## Project Structure
```
frontend/
├── src/
│   ├── app/                # Next.js App Router (Pages & Routes)
│   │   ├── shop/           # Product listing & search
│   │   ├── cart/           # Shopping cart management
│   │   ├── checkout/       # Order processing
│   │   ├── profile/        # User dashboard
│   │   ├── blog/           # Brand articles
│   │   └── ...             # Support pages (Contact, Track, Sale)
│   ├── components/         # Reusable UI Components
│   │   ├── common/         # Navbar, Footer, BottomNav
│   │   ├── home/           # Home-page specific sections (Hero, CTA, etc.)
│   │   └── ...             # Shared UI elements (ProductCard, EmptyState)
│   ├── context/            # Global State (StoreContext)
│   ├── data/               # Static data (Products, Categories)
│   └── globals.css         # Global styles & Tailwind directives
├── public/                 # Static assets (Images, Fonts)
├── tests/                  # Playwright E2E tests
└── package.json            # Dependencies & Scripts
```

## Main Components Analysis
1.  **StoreContext.js:** The heart of the application's state. It manages the shopping cart, user authentication status, and profile information, syncing everything with `localStorage` for a persistent session.
2.  **Navbar & BottomNav:** Context-aware navigation that provides easy access to the cart, shop, and profile across all devices.
3.  **ProductCard:** A highly reusable component with hover effects and quick-add-to-cart functionality.
4.  **HeroBanner & Sections:** Designed using Framer Motion for high-quality, smooth animations that enhance the premium feel of the brand.

## Getting Started

### Prerequisites
*   Node.js (LTS version recommended)
*   npm or yarn

### Installation
1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Run the development server:
    ```bash
    npm run dev
    ```

3.  Build for production:
    ```bash
    npm run build
    ```

## Development Patterns
*   **Responsive Utilities:** Built using Tailwind CSS 4 for rapid and consistent styling.
*   **Component-Based:** Logic is decoupled into reusable components and hooks.
*   **Stateful UI:** Hooks into `useStore` to access global state effortlessly anywhere in the component tree.
