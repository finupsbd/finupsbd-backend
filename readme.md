## FinupsBD 

## Overview
-------------------------------------------

## Features

### User Roles
#### Admin:
- Created manually in the database with predefined credentials.
- Can delete any .
- Can block any user by updating the `isBlocked` property.
- Cannot update any blog.

#### User:
- Can register and log in.
- Can create blogs (only when logged in).
- Can update and delete their own blogs.
- Cannot perform admin-specific actions.

### Authentication & Authorization
#### Authentication:
- Users must log in to perform write, update, and delete operations.

#### Authorization:
- Differentiates between Admin and User roles to secure actions.
# Access the application at [http://localhost:5000](http://localhost:5000).
### API Endpoints
| Endpoint                             | Method   | Description                                      |
|--------------------------------------|----------|--------------------------------------------------|
| `/api/v1/auth/signUp`                | `POST`   | Sign up a new user.                              |
| `/api/v1/auth/login`                 | `POST`   | Authenticates a user and generates a token.      |
| `/api/v1/auth/validate-pin`          | `POST`   | Send email for validation pin                    |
| `/api/v1/auth/forget-password`       | `POST`   | user password forget with email                  |
| `/api/v1/auth/reset-password`        | `POST`   | reset password and notify user with email        |
|--------------------------------------|----------|--------------------------------------------------|
| `/api/v1/public/emi-calculator`      | `POST`   | Calculate Emi                                    |


## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: Postgres with Prisma
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Zod

## Setup Instructions

### Prerequisites
- Node.js and npm installed.
- Postgres database connection string.

### Steps
1. Clone the repository:
   ```bash
   git clone 
   ```
2. Navigate to the project directory:
   ```bash
   cd finupsbd-backend-system
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables in a `.env` file:
   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=<your_mongo_db_connection_string>
   SALT_ROUND_PASS=<number_of_salt_rounds>
   JWT_ACCESS_SECRET=<your_jwt_secret>
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. 

## Live Demo
[Live URL](Soon.......)


## Contact
For any queries feel free to contact:
- **Email**: [shamimrezaone@gmail.com](mailto:shamimrezaone@gmail.com)
- **What's app**: [+8801531297879](+8801531297879)

---
Thank you for checking out the Blog Management System! We hope it serves your blogging needs effectively./