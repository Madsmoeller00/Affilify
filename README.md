This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project Structure

```
affiliate-aggregator/
├── src/
│   ├── app/                    # Next.js app router pages and layouts
│   │   ├── (auth)/            # Authentication related routes
│   │   ├── (dashboard)/       # Protected dashboard routes
│   │   ├── api/               # API routes
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   ├── forms/            # Form-related components
│   │   ├── layout/           # Layout components
│   │   └── dashboard/        # Dashboard-specific components
│   ├── lib/                   # Utility functions and shared logic
│   │   ├── utils/            # Helper functions
│   │   └── constants/        # Constants and configuration
│   ├── services/             # External service integrations
│   │   ├── api/             # API service functions
│   │   └── auth/            # Authentication services
│   ├── types/                # TypeScript type definitions
│   │   ├── api.ts           # API related types
│   │   └── common.ts        # Shared types
│   └── middleware.ts         # Next.js middleware
├── public/                   # Static files
│   ├── images/              # Image assets
│   └── icons/               # Icon assets
├── styles/                  # Global styles
├── .env.local              # Local environment variables
├── .env.example            # Example environment variables
├── next.config.js          # Next.js configuration
└── tsconfig.json           # TypeScript configuration
```

### Directory Descriptions

- `src/app/`: Contains all the Next.js pages using the App Router
- `src/components/`: Reusable React components organized by purpose
- `src/lib/`: Utility functions, helpers, and shared logic
- `src/services/`: External service integrations and API calls
- `src/types/`: TypeScript type definitions and interfaces
- `public/`: Static assets like images and icons
- `styles/`: Global CSS and style configurations

## API Documentation

### Affiliate Networks
- [Adtraction API Documentation](https://adtractionapi.docs.apiary.io/#) - Documentation for the Adtraction affiliate network API
