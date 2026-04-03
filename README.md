# Smart Medicine Reminder and Tracker

A full-stack, responsive web application designed to help users manage their medication schedules, track doses, and receive real-time reminders. This project features a modern medical-themed UI inspired by a Figma design.

## 🔗 Original Design
The UI design was originally created on Figma: [Smart Medicine Reminder App UI](https://www.figma.com/design/H81dwTk3U5qrvQYgSdkt6L/Smart-Medicine-Reminder-App-UI).

---

## 🚀 Key Features
- **Medication Management**: Add, update, and delete medicine details including dosage and frequency.
- **Schedule Tracking**: Visualize daily and weekly medication schedules.
- **Dose Logging**: Keep track of taken doses to monitor adherence.
- **Dashboard Analytics**: View medication history and compliance metrics.
- **Secure Authentication**: JWT-based user login and registration.
- **Emergency SOS**: Quick access to emergency contacts and SOS triggers.
- **Responsive Design**: Optimized for desktops, tablets, and mobile devices.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 (Vite-powered)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Vanilla CSS
- **State Management**: Zustand
- **Navigation**: React Router DOM v6
- **UI Components**: Radix UI, Lucide React (Icons), Framer Motion (Animations)
- **Charts**: Recharts
- **Forms**: React Hook Form

### Backend
- **Server**: Node.js, Express
- **ORM**: Prisma
- **Language**: TypeScript
- **Authentication**: JWT (JSON Web Tokens), Bcryptjs
- **Validation**: Zod
- **API Documentation**: Built-in health checks and structured routes.

### Database
- **Type**: PostgreSQL

---

## ⚙️ Prerequisites
- **Node.js**: v18.x or later
- **npm**: v9.x or later
- **PostgreSQL**: A running instance (Local or Remote)

---

## 📦 Installation and Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/gokul028h/Smartmedicinereminderappui.git
cd Smartmedicinereminderappui
```

### 2. Backend Configuration
Navigate to the `server` directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file from the example:
```bash
cp .env.example .env
```
Update the `DATABASE_URL` in `.env` with your PostgreSQL credentials:
`postgresql://USER:PASSWORD@localhost:5432/smart_medicine_db?schema=public`

#### Setup Database with Prisma:
```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Seed the database
npm run db:seed
```

### 3. Frontend Configuration
Go back to the root directory and install dependencies:
```bash
cd ..
npm install
```

---

## 🏃 Running Locally

### Start Backend
```bash
cd server
npm run dev
```
*Backend runs on: `http://localhost:3001`*

### Start Frontend
```bash
# In the root directory
npm run dev
```
*Frontend runs on: `http://localhost:5173`*

---

## 📂 Project Structure
```text
├── server/            # Express Backend
│   ├── prisma/        # Database schema and migrations
│   └── src/           # API routes, controllers, and services
├── src/               # React Frontend
│   ├── components/    # Reusable UI components
│   ├── features/      # Feature-based modular pages
│   ├── services/      # API communication layer
│   └── store/         # Zustand state management
└── package.json       # Root dependencies
```

## 📄 License
This project is for educational and portfolio purposes.