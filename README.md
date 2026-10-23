# SurgiCare — Surgical Care & Medical Supply Platform (Ongoing Project)

> **Milestone Status:** Phase 1 Working Prototype (Client-Side Core Models)  
> **Target Academic Project:** MCA Master's Practical Project  
> **Framework:** React 18, Vite, React Router 6, Lucide Icons  

---

## 3 Core Working Models

SurgiCare has been engineered with 3 core functional, interactive working models:

### 1. Model 1: Doctor Consultations & Appointment Scheduling Module
- **Patient Portal**:
  - Interactive appointment booking modal (Select Surgeon & Specialty, Date, Time Slot, Symptoms/Reason).
  - Instant booking confirmation and sync with local browser storage.
  - Active consultation tracking and cancellation workflow.
- **Admin Workspace**:
  - Clinical appointment review and filter table (Filter by status: `Pending`, `Confirmed`, `Cancelled`, or filter by Doctor).
  - Search by patient, doctor, or consultation ID.
  - Appointment details modal with one-click status updates (`Pending` → `Confirmed` → `Cancelled`).
  - Quick "Add Demo Appointment" generator.

### 2. Model 2: Surgical Equipment Store & Order Management Module
- **Product Store Catalog**:
  - Medical-grade surgical equipment and disposable supplies categorized into *Disposables, Instruments, PPE Supplies, Surgical Kits, Diagnostics, and Antiseptics*.
  - Live pricing in Indian Rupees (`₹`), stock quantity, and units sold indicators.
- **Requisition & Ordering Workflow**:
  - Interactive "Order Supply" modal with dynamic quantity calculation and delivery location/ward selection.
  - Demo payment options (Hospital Billing / Cash on Delivery).
- **Shipment & Delivery Tracking**:
  - Real-time visual progress stepper: `[Order Placed] → [Processing] → [Dispatched] → [Delivered]`.
  - Admin fulfillment status controller.

### 3. Model 3: Surgical Care & Procedure Workflow Tracker ("My Surgeries")
- **Procedure Lifecycle & OT Tracker**:
  - Procedure details: Lead Surgeon, Operation Theater Suite (e.g. `OT-2 Laparoscopy Suite`), Hospital, Date & Time.
  - 5-Stage Visual Progress Bar: `Pre-Op Evaluation` → `OT Scheduled` → `Surgery In Progress` → `Post-Op Recovery` → `Discharged`.
- **Interactive Pre-Operative Readiness Checklist**:
  - Real-time interactive checkboxes (Fasting/Nil by mouth, PAC clearance, Blood reports, Surgical consent signed).
  - Dynamic % readiness calculation.
- **Clinical Instructions & Safety Guidelines**:
  - Surgeon-specific pre-surgery dietary and medication guidelines.
- **Admin / Staff Controls**:
  - Advance or change surgical stage on the fly.
  - Schedule new surgical cases with designated OT suites.

---

## Ongoing Project Banner
Every authenticated screen features a responsive **"Ongoing Project Milestone"** header banner detailing the active working models and upcoming milestones (Node.js REST API, PostgreSQL, and payment gateways), ensuring project evaluators can easily understand the project phase.

---

## Demo Accounts
To explore the system, start the app and sign in with any valid email format:
- **Patient Portal**: Select `Patient / Customer` (Pre-loaded with sample records for Amit Kumar).
- **Administrator Portal**: Select `Administrator` to access clinical management and hospital inventory controls.

---

## Run Locally
1. Open the project folder in terminal or VS Code:
   ```bash
   cd SurgiCare_Frontend
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
