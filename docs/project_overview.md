# Viosk Project Documentation

> **Note**: This document provides a detailed overview of the Viosk (Virtual Kiosk) project as of current development state.

## 1. Project Overview
**Viosk** is a Virtual Kiosk application designed to digitize government and utility services. The system consists of a touch-friendly Frontend interface for kiosk hardware and a Backend API for service management and data processing.

### Tech Stack
- **Frontend**: React 19 (Vite), JavaScript
- **Styling**: Vanilla CSS, `lucide-react` for icons, `framer-motion` for animations.
- **Backend**: Python (FastAPI)
- **Database**: MySQL (inferred from `mysql-connector` usage)
- **Authentication**: Google OAuth 2.0 (for Admin/Staff)

---

## 2. Directory Structure

### Frontend (`/Frontend`)
The frontend is built with Vite and follows a modular structure.

- **`src/assets`**: Static assets like images and icons.
- **`src/components`**: Reusable UI components.
- **`src/context`**: React Context definitions (e.g., global state).
- **`src/layouts`**: Layout wrappers (e.g., MainLayout, AdminLayout).
- **`src/pages`**: Application views.
    - **`kiosk/`**: Screens specific to the Kiosk user interface.
        - `ComplaintBox.jsx`: Main complaint registration form.
        - `IdleScreen.jsx`: Screen saver/attract mode.
        - `LanguageSelect.jsx`: Initial language selection screen.
        - `ServiceMenu.jsx`: Grid menu of available services.
        - `ServiceDetail.jsx`: Individual service handling.
    - **`admin/`**: Administrative dashboards.
- **`src/services`**: Business logic and API communication.
    - **`api/`**: API definition and HTTP client.
- **`src/styles`**: Global CSS files.

### Backend (`/Backend`)
The backend is a FastAPI application serving as the core logic handler.

- **`auth.py`**: Handles Google OAuth 2.0 authentication flows (`/login`, `/callback`).
- **`user.py`**: Main application entry point for user/kiosk facing endpoints (`/consumercomplaint`, `/quickpay`).
- **`DB/`**: Database connection handlers (`conn.py` imports implied).
- **`models.py`**: Pydantic models for request validation.

---

## 3. Features & Functionality

### A. Kiosk Interface
Designed for touch screens with large touch targets and simplified navigation.
1.  **Idle Screen**: Displays attract loop or welcome message.
2.  **Language Selection**: Supports English, Hindi, Malayalam, Tamil.
3.  **Service Menu**:
    -   Displays grid of services (e.g., Quick Pay, Register Complaint).
    -   **Quick Pay**: Redirects/Shows QR for KSEB Quickpay.
    -   **Register Complaint**: Feature-rich complaint form.

### B. Complaint Registration
Located in `ComplaintBox.jsx`.
-   **Fields**:
    -   **Department**: Dropdown selection (Revenue, Health, etc.).
    -   **Description**: Text area with validation (min 5 words, max 300 words).
        -   *Validation*: Shows "Please provide more details" if under 5 words. Prevents submission.
    -   **Phone Number**: Optional input.
    -   **Photo Attachment**: Optional.
        -   **Workflow**: User clicks "Scan to Upload" -> Generates QR Code -> User scans with mobile -> Uploads photo -> Photo appears on Kiosk.
        -   *Current State*: QR code generation and polling logic is implemented in frontend (`initPhotoSession`, `checkUploadStatus`), waiting for backend implementation.

### C. Authentication (Admin)
-   Implemented via Google OAuth.
-   **Endpoints**:
    -   `/login`: Redirects to Google Login.
    -   `/callback`: Exchanges code for token.
-   **Access Control**: restricted to specific email domains (e.g., `@iiitdm.ac.in`) defined in `auth.py`.

### D. Localization
-   The application is designed with i18n in mind (`LanguageSelect.jsx`).
-   Selected language preference is stored and passed to subsequent screens to render appropriate text.

---

## 4. Setup & Installation

### Prerequisites
-   Node.js & npm
-   Python 3.8+
-   MySQL Database

### Running Frontend
```bash
cd Frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### Running Backend
```bash
cd Backend
# Install dependencies (requirements.txt expected)
pip install fastapi uvicorn requests mysql-connector-python
uvicorn user:app --reload --port 8000
# Runs on http://localhost:8000
```
