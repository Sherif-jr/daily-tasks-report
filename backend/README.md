# Daily Tasks Report - Backend

## Overview

This is the backend of the **Daily Tasks Report** application, developed using **Node.js** and **Express.js**. It provides a RESTful API to manage tasks and employees, including validation for task duration and CRUD operations.

## Features

- **REST API** for managing tasks (CRUD operations).
- **Task Duration Validation**:
  - Each task must be between 1 and 8 hours.
  - Daily task hours cannot exceed 8 hours in total.

## Tech Stack

- **Node.js** (with Express)
- **MongoDB** (or PostgreSQL) for data storage

## Installation

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
