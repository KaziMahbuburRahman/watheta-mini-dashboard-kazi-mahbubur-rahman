# Watheta Mini Dashboard

A modern, responsive mini dashboard built with Next.js 14, featuring product and order management capabilities.

## 🚀 Features

### Product Management

- **Create Products**: Multi-step form with validation
- **Product List**: Advanced table with filtering, sorting, and search
- **Stock Management**: Visual stock indicators and status badges
- **Category Management**: Organized product categorization

### Order Management

- **Create Orders**: Dynamic order creation with product selection
- **Order List**: Comprehensive order tracking with status indicators
- **Customer Management**: Client information and delivery tracking
- **Progress Tracking**: Visual delivery progress indicators

### UI/UX Features

- **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **Dark/Light Mode**: Theme switching with system preference detection
- **Modern UI**: Clean, consistent design using ShadCN UI components
- **Interactive Elements**: Hover effects, animations, and smooth transitions
- **Form Validation**: Comprehensive validation with error handling
- **Toast Notifications**: User feedback for actions

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: ShadCN UI + Radix UI primitives
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **Tables**: TanStack Table (React Table v8)
- **State Management**: React Query (TanStack Query)
- **Icons**: Lucide React
- **Theme**: next-themes
- **Notifications**: Sonner

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd watheta-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── dashboard/
│   │   ├── layout.tsx          # Dashboard layout with sidebar
│   │   ├── page.tsx            # Dashboard home
│   │   ├── products/
│   │   │   ├── page.tsx        # Product list
│   │   │   └── create/
│   │   │       └── page.tsx     # Product creation
│   │   └── orders/
│   │       ├── page.tsx        # Order list
│   │       └── create/
│   │           └── page.tsx    # Order creation
│   ├── layout.tsx              # Root layout with theme provider
│   └── page.tsx                # Home redirect
├── components/
│   ├── ui/                     # ShadCN UI components
│   └── forms/                  # Form components
├── lib/
│   ├── types/                  # TypeScript type definitions
│   ├── mock-data/              # Mock data for development
│   └── utils.ts                # Utility functions
```

## 🎨 Design Decisions

### UI/UX Approach

- **Mobile-First**: Responsive design starting from mobile screens
- **Consistent Spacing**: Using Tailwind's spacing scale for uniformity
- **Color System**: Semantic color tokens for maintainability
- **Typography**: Clear hierarchy with appropriate font weights
- **Interactive States**: Hover, focus, and active states for better UX

### Component Architecture

- **Reusable Components**: ShadCN UI for consistent design system
- **Form Handling**: React Hook Form for performance and validation
- **Type Safety**: Full TypeScript implementation
- **Error Boundaries**: Proper error handling and user feedback

### Performance Optimizations

- **Code Splitting**: Next.js automatic code splitting
- **Image Optimization**: Next.js Image component for optimized loading
- **Lazy Loading**: Components loaded on demand
- **Memoization**: React.memo for expensive components

## 📱 Responsive Design

The dashboard is fully responsive across all device sizes:

- **Mobile (< 768px)**: Collapsible sidebar, stacked layouts
- **Tablet (768px - 1024px)**: Optimized spacing and touch targets
- **Desktop (> 1024px)**: Full sidebar, multi-column layouts

## 🎯 Key Features Implemented

### Product Management

- ✅ Multi-step product creation form
- ✅ Advanced product listing with filters
- ✅ Stock status indicators
- ✅ Category-based organization
- ✅ Image upload with preview
- ✅ Form validation with error messages

### Order Management

- ✅ Dynamic order creation with product selection
- ✅ Real-time total calculation
- ✅ Customer information management
- ✅ Order status tracking
- ✅ Delivery progress indicators
- ✅ Payment status management

### Advanced Table Features

- ✅ Sorting and filtering
- ✅ Search functionality
- ✅ Status indicators and badges
- ✅ Action menus
- ✅ Responsive design
- ✅ Pagination support

## 🚀 Deployment

The application is ready for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

## 📋 Requirements Met

### Technical Requirements ✅

- Next.js 14+ ✅
- ShadCN UI + Tailwind CSS ✅
- React Hook Form + Zod ✅
- TanStack Query ✅
- TanStack Table ✅
- Lucide Icons ✅
- Responsive Design ✅

### Core Features ✅

- Dashboard Layout ✅
- Product Create/List ✅
- Order Create/List ✅
- Advanced Tables ✅
- Form Validation ✅
- Status Indicators ✅
- Mobile Responsive ✅

### Design Quality ✅

- Modern UI/UX ✅
- Consistent Design ✅
- Interactive Elements ✅
- Loading States ✅
- Error Handling ✅
- Accessibility ✅

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Consistent naming conventions

## 📄 License

This project is created for the Watheta Frontend Developer assessment.

---

Built with ❤️ using Next.js, ShadCN UI, and modern web technologies.
