# Golden Dragon

## Project Description

Golden Dragon is a restaurant website for an authentic Chinese cuisine dining experience. The site features a full menu, gallery, about page, contact information, and an online table reservation system backed by a live database.

![Golden Dragon Preview](previews/Animation.gif)

## Features

1. Home — Hero section with navigation to menu and reservations
2. Menu — Full menu with categorized dishes and descriptions
3. Gallery — Photo gallery showcasing the restaurant and food
4. About — Restaurant story, team, and values
5. Contact — Location, hours, and contact form
6. Booking — Online table reservation form with database persistence

## Tech Stack

- React 19
- React Router DOM
- Vite
- Express
- Prisma (PostgreSQL)
- Framer Motion
- Font Awesome

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/Yousor0/week2-resturant.git
cd week2-resturant

# Install dependencies
npm install

# Set up your environment variables
cp .env.example .env
# Add your DATABASE_URL to .env

# Run Prisma migrations
npx prisma migrate dev

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Deployment

Golden Dragon can be deployed on [Vercel](https://vercel.com). The live site is available at:

<!-- Replace with your actual Vercel deployment URL -->

**[https://week2-resturant.vercel.app](https://week2-resturant.vercel.app)**

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/week2-resturant)

Or manually via the Vercel CLI:

```bash
npm install -g vercel
vercel
```

Vercel will auto-detect the Vite project and configure the build settings. Every push to `main` triggers a new production deployment. Make sure to add your `DATABASE_URL` environment variable in the Vercel project settings.
