🏥 SurgiCare

Surgical Equipment E-Commerce & Operation Appointment Management System

SurgiCare is a web-based application designed to simplify the purchase of surgical equipment and the management of doctor appointments for planned operations. It provides separate interfaces for patients/customers and administrators to make the overall process more organized, accessible, and efficient.

Project Status: Frontend Prototype — Backend integration and database connectivity are planned for future development.

📌 Project Overview

In traditional systems, managing surgical equipment orders, product inventory, and doctor appointments can involve manual processes and disconnected platforms. SurgiCare aims to bring these activities together in one centralized application.

The system provides a user-friendly interface for customers to access appointment-related features and explore the surgical equipment shopping experience, while administrators can view and manage appointments and orders.

✨ Features

👤 Patient / Customer Module

Login interface with input validation.

Patient/customer dashboard.

Appointment overview.

Sample order information.

Navigation to appointment and equipment-shopping features.

🛠️ Admin Module

Dedicated administrator login role.

Admin dashboard with summary statistics.

Appointment management interface.

Search and filter appointments.

Add demonstration appointments.

View appointment details.

Update appointment status.

Sample order and product activity.

📅 Appointment Management

View appointment records.

Search appointments by relevant details.

Filter appointments by status and doctor.

Add and update demonstration appointment records.

📱 User Interface

Responsive layout for desktop and smaller screens.

Reusable React components.

Client-side navigation.

Form input validation.

Demo data stored in browser local storage where applicable.

🧰 Technologies Used

Technology

Purpose

React.js

Frontend user interface

Vite

Development server and build tool

JavaScript

Application logic

React Router

Page navigation

Lucide React

Icons

HTML5

Page structure

CSS3

Styling and responsive layout

Local Storage

Temporary browser-side demo data

Git & GitHub

Version control and collaboration

📂 Project Structure

SurgiCare/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   │   ├── Login
│   │   ├── Dashboard
│   │   ├── Admin Dashboard
│   │   └── Appointments
│   ├── data/
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
├── index.html
├── package.json
├── vite.config.js
├── netlify.toml
├── .gitignore
└── README.md

Note: The exact folder and file names may vary slightly depending on the version of the project.

🔐 Demo Login

The current prototype uses a demonstration login flow.

Role

Demo Email

Patient / Customer

patient@example.com

Administrator

admin@example.com

Select the appropriate role on the login page and enter a valid email and any non-empty password.

Important: These are demonstration credentials, not real authenticated accounts. The current login flow does not provide production-grade authentication or authorization.

🗺️ Future Enhancements

The following features are planned for future development:

Backend API using Node.js and Express.js.

PostgreSQL database integration.

Secure registration, login, and role-based authorization.

Doctor profiles and appointment availability.

Appointment booking, rescheduling, and cancellation.

Surgical equipment catalog with categories and search.

Shopping cart, checkout, and order tracking.

Inventory and stock management.

Payment gateway integration.

Email and appointment notifications.

Reporting and analytics for administrators.

Automated testing and improved deployment workflows.

🏗️ Proposed Architecture

The planned full-stack application will use the following architecture:

Patient / Customer / Administrator
                 |
                 v
       React.js Frontend
                 |
                 v
       Node.js + Express API
                 |
                 v
          PostgreSQL

The current version implements the frontend prototype. The backend, database, and real integrations will be developed separately.

🧪 Testing

Initial testing focuses on frontend functionality, including:

Login form validation.

Page navigation.

Dashboard rendering.

Appointment searching and filtering.

Appointment status updates.

Responsive layout behavior.

Backend, database, security, and end-to-end testing will be added as those components are implemented.


🔒 Security and Privacy

Do not commit passwords, API keys, database credentials, or other secrets.

Do not use real patient information in the prototype.

Do not enter real payment details.

Implement proper authentication, authorization, input validation, and secure data handling before production use.

Ensure applicable requirements are met before selling regulated medical or surgical products.

⚠️ Disclaimer

SurgiCare is an educational software development project and is not a production-ready medical, appointment, or e-commerce platform. Appointment and order information may be demonstration data. The application does not provide medical advice or determine whether a patient is medically fit for an operation.

👨‍💻 Project Information

Project Name: SurgiCare
Project Type: Web Application
Domain: Healthcare Technology / E-Commerce
Current Stage: Frontend Prototype

