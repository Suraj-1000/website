# Suraj Portfolio - Professional Full-Stack Showcase

This repository contains the source code for my professional portfolio, featuring a modern React frontend and a robust Express/Node.js backend.

## Project Structure

```text
.
├── client/          # React + Vite frontend application
├── server/          # Node.js + Express backend API
├── docker-compose.yml # Container orchestration for development
└── package.json     # Root project configuration
```

## Key Features

- **Dynamic Content:** Managed via a custom CRM backend.
- **Modern UI:** Built with Tailwind CSS and Framer Motion.
- **Secure Authentication:** JWT-based auth with refresh token rotation.
- **Optimized Deployment:** Fully containerized using Docker.
- **Responsive Design:** Premium aesthetics across all device sizes.
- **Improved Stability:** Enhanced error handling and standardized UI feedback.

## Recent Stability Improvements

- **Global Error Handling:** Refined API interceptors for more descriptive error logging.
- **UI Consistency:** Standardized loading states and component-wide button styles.
- **Flexible Configuration:** Implemented dynamic CORS origins via environment variables.
- **Bug Fixes:** Resolved icon mapping inconsistencies and data model field mismatches.

## Getting Started

### Prerequisites

- Node.js (v18+)
- Docker & Docker Compose (for containerized setup)
- PostgreSQL (if running locally without Docker)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Suraj-1000/website.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create `.env` files in both `client/` and `server/` based on the provided `.env.example` files.

### Running the Project

#### Using Docker (Recommended)
```bash
docker-compose up --build
```

#### Manual Development
1. Start the server:
   ```bash
   npm run server:dev
   ```

2. Start the client:
   ```bash
   npm run client:dev
   ```

## API Documentation

The server exposes several RESTful endpoints under `/api/v1`:
- `/auth`: User authentication and token management.
- `/profile`: Portfolio owner information.
- `/projects`: Showcase of completed works.
- `/skills`: Technical proficiencies.
- `/health`: System status and database connectivity.

## Technology Stack

- **Frontend:** React, Vite, Tailwind CSS, Lucide React, Axios.
- **Backend:** Node.js, Express, Sequelize ORM, PostgreSQL.
- **DevOps:** Docker, Husky, Prettier, ESLint.

## License

This project is licensed under the ISC License.
