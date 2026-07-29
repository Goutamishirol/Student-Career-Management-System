# Internship Skill Tracker

A production-ready full-stack web application designed to help students and aspiring professionals manage their career journey in one place. The platform enables users to securely track their technical skills, internships, certifications, and overall career progress through a personalized dashboard.

Built using React, Spring Boot, and MySQL, the application follows a RESTful architecture and provides complete user-specific data isolation, ensuring every user's information remains private. It offers an intuitive interface for organizing career achievements, monitoring growth, and maintaining a professional portfolio.

## Key Features

- 🔐 Secure User Registration & Login
- 👤 Personalized User Dashboard
- 📚 Skills Management (Add, Edit, Delete)
- 🏆 Certificate Management with File Upload Support
- 👁️ View & Download Uploaded Certificates
- 💼 Internship Tracking with Status Management
- 📊 Dynamic Career Score Calculation
- 👤 Personalized Profile Page
- 🔒 User-specific Data Isolation
- 📱 Responsive Modern UI
- ☁️ Ready for Cloud Deployment

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- Bootstrap
- CSS3

### Backend
- Spring Boot (Java 17)
- Spring Data JPA
- REST APIs
- Hibernate

### Database
- MySQL

### Tools & Technologies
- Git & GitHub
- Postman
- VS Code

## Project Architecture

The application follows a layered architecture based on the MVC design pattern.

- **Frontend:** React-based Single Page Application responsible for the user interface.
- **Backend:** Spring Boot REST APIs handling business logic and data processing.
- **Database:** MySQL for persistent storage.
- **Communication:** Axios consumes REST endpoints exposed by the backend.

Every skill, certificate, and internship record is associated with its respective user, ensuring complete personalization throughout the application.

## Career Score

The application automatically calculates a dynamic Career Score based on user achievements, providing a quick overview of career progress through an interactive dashboard.

## Highlights

- Full Stack Development
- RESTful API Design
- CRUD Operations
- File Upload & File Serving
- User Authentication
- Personalized Data Management
- Responsive UI
- Production-ready Architecture

## Screenshots

*(navigate to screenshots folder.)*

## Installation

### Backend

```bash
cd backend
./gradlew bootRun
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Future Scope

Potential enhancements include:

- Email Verification
- Password Reset
- JWT Authentication
- Notification System
- Resume Builder
- AI-based Career Recommendations


## Author

**Goutami Shirol**


