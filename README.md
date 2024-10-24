# Daily Tasks Report

## Overview

The **Daily Tasks Report** application is a task management system designed to handle CRUD operations for managing employee tasks. It demonstrates full-stack development with React (frontend) and Node.js (backend), focusing on providing a daily summary of tasks.

## Features

- **CRUD Operations for Tasks**:
  - Add, view, update, and delete tasks for each employee.
  - Each task includes a description and a time estimation (start and end times).
- **Task Duration Constraints**:
  - Maximum task duration of 8 hours per day per employee.
- **Daily Summary**:
  - Shows total hours allocated for the day.
  - Displays remaining hours available for new tasks.

## Tech Stack

- **Frontend**: React.js, Redux-toolkit (for state management), shadcn UI, Tailwind CSS, Typescript
- **Backend**: Node.js, Express.js (REST API), Typescript
- **Database**: MongoDB

## Installation

### Clone the repository:

```bash
git clone <repo-url>
cd daily-tasks-report
```

### Set up the frontend:

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
yarn
```

3. Start the frontend development server:

```bash
yarn dev
```

### Set up the backend:

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
yarn
```

3. Start the backend development server:

```bash
yarn dev
```

### Live Deployment

[Vercel](https://daily-tasks-report.vercel.app)
