# Taskify

![Taskify](public/logo.svg)

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748)
![MySQL](https://img.shields.io/badge/MySQL-8-00758F)

Taskify is a collaborative task management application inspired by Trello, built with Next.js 14, React, Prisma, Tailwind and more.

## ✨ Features

- 🎨 Modern and responsive user interface
- 👥 Organizations and teams management
- 📋 Customizable kanban boards
- 🔄 Drag and drop cards and lists
- 🎯 Detailed task descriptions
- 🌅 Dynamic backgrounds via Unsplash
- 💳 Pro subscription system
- 🔐 Secure authentication with Clerk
- 📱 Responsive design

## 🚀 Technologies Used

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MySQL with Prisma
- **Authentication**: Clerk
- **State Management**: Zustand
- **UI Components**: shadcn/ui
- **Drag & Drop**: @hello-pangea/dnd
- **Payments**: Stripe

## 🛠️ Installation

1. Clonez the repository

```bash
git clone https://github.com/SHOOTSTV/trello-clone.git
```

2. Install the dependencies

```bash
npm install
```

3. Configure the environment variables .env

```bash

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXX
CLERK_SECRET_KEY=sk_test_XXXXXXXXXXXX
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/


DATABASE_URL=XXXXXXXXXXXXX

NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=XXXXXXXXXXXXX

STRIPE_API_KEY=sk_test_XXXXXXXXXXXXXX

NEXT_PUBLIC_APP_URL=http://localhost:3000

STRIPE_WEBHOOK_SECRET=XXXXXXXXXX
```

4. Setup Database

```bash
# Generate Prisma Client
npx prisma generate

# Push the database schema
npx prisma db push

# If you want to see the database in Prisma Studio
npx prisma studio
```

5. Start the development server

```bash
npm run dev
```

## 🌐 Project Structure

taskify/
├── app/ # Next.js routes and components
├── components/ # Reusable components
├── lib/ # Utilities and configurations
├── prisma/ # Schema and migrations
├── public/ # Static assets
└── actions/ # Server actions

## 👏 Acknowledgements

- CodeWithAntonio: https://codewithantonio.com/

## 🔗 Links

- [Web app live](https://trello-clone-weld-tau.vercel.app/)
