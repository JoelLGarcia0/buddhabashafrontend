# BuddhaBasha Frontend

A modern Next.js 14 e-commerce frontend for BuddhaBasha jewelry store, built with TypeScript, Tailwind CSS, and Clerk authentication.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Authentication**: Clerk-powered user authentication and management
- **Product Catalog**: Browse products with categories and search
- **Shopping Cart**: Add items, manage quantities, and checkout
- **Guest Checkout**: Allow users to purchase without creating an account
- **Order Management**: View order history for authenticated users
- **Stripe Integration**: Secure payment processing
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Payment**: Stripe
- **Icons**: Heroicons
- **Date Handling**: date-fns

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout flow
│   ├── orders/            # Order history (protected)
│   ├── products/          # Product catalog
│   ├── success/           # Stripe success page
│   ├── cancel/            # Stripe cancel page
│   ├── layout.tsx         # Root layout with navigation
│   └── page.tsx           # Landing page
├── components/            # Reusable components
│   ├── ProductCard.tsx    # Product display component
│   └── CartItem.tsx       # Cart item component
├── lib/                   # Utility functions
│   └── api.ts            # API client for Django backend
├── styles/               # Global styles
│   └── globals.css       # Tailwind and custom styles
└── middleware.ts         # Clerk middleware
```

## 🔌 API Integration

The frontend connects to a Django REST API backend at `http://localhost:8000/store/` with the following endpoints:

### Public Endpoints

- `GET /store/products/` - List all products
- `GET /store/categories/` - List all categories

### Authenticated Endpoints

- `GET /store/cart/` - Fetch user's cart
- `POST /store/cart-items/` - Add item to cart
- `GET /store/cart-items/` - List cart items
- `GET /store/orders/` - Fetch user's orders
- `POST /store/orders/` - Place order from cart

### Guest Endpoints

- `POST /store/guest-order/` - Place guest order

### Payment

- `POST /store/create-checkout-session/` - Create Stripe checkout session

## 🚀 Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file with your Clerk configuration:

   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Ensure your Django backend is running** at `http://localhost:8000`

## 🎨 Pages & Features

### Landing Page (`/`)

- Hero section with call-to-action
- Feature highlights
- Beautiful jewelry-focused design

### Products Page (`/products`)

- Grid layout of all products
- Category display
- Product cards with add-to-cart functionality

### Cart Page (`/cart`)

- Display cart items with quantity controls
- Remove items functionality
- Order summary with totals
- Link to checkout

### Checkout Page (`/checkout`)

- Email collection for order confirmation
- Order summary
- Guest checkout support
- Stripe payment integration

### Orders Page (`/orders`) - Protected

- Order history for authenticated users
- Order status tracking
- Detailed order information

### Success/Cancel Pages

- Post-payment user experience
- Clear next steps and navigation

## 🔐 Authentication Flow

- **Public Access**: Products, cart, and guest checkout
- **Protected Routes**: Orders page requires authentication
- **Guest Checkout**: Users can purchase without signing up
- **Clerk Integration**: Seamless sign-in/sign-up with user management

## 🎯 Key Components

### ProductCard

- Displays product information
- Quantity selector
- Add to cart functionality
- Stock status indication

### CartItem

- Cart item display with image
- Quantity adjustment controls
- Remove item functionality
- Price calculations

### Navigation

- Responsive navbar with auth buttons
- Cart icon with link
- Conditional order history link

## 🎨 Design System

- **Colors**: Blue primary (#3B82F6), gray scale
- **Typography**: Geist Sans font family
- **Spacing**: Consistent Tailwind spacing scale
- **Components**: Card-based layout with shadows
- **Responsive**: Mobile-first design approach

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for styling

## 🚀 Deployment

The frontend is ready for deployment to platforms like:

- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any static hosting service

## 🔗 Backend Integration

This frontend is designed to work with the Django REST API backend. Ensure your backend is running and accessible at the configured URL before testing the frontend functionality.

## 📝 Notes

- Guest cart functionality is currently placeholder (would need localStorage implementation)
- Cart item update/remove API calls are placeholder (would need backend endpoints)
- Email handling in checkout uses placeholder values (would need proper user email integration)

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Use TypeScript for all new code
3. Ensure responsive design for all new components
4. Test authentication flows thoroughly
5. Update this README for any new features
