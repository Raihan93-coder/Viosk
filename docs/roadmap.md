# Future Roadmap & Upcoming Services

This document outlines the planned updates, missing features, and services to be enabled in the near future for Viosk.

## 1. Immediate Action Items (High Priority)

### A. Endpoint Unification
-   **Issue**: Frontend expects `/complaints` but Backend serves `/consumercomplaint`.
-   **Action**: Update `Backend/user.py` route to match Frontend or update `Frontend/src/services/config.js`.

### B. Photo Upload Service
-   **Current State**: Frontend has UI for "Scan to Upload" and polling logic (`initPhotoSession`, `checkUploadStatus`). Backend specific endpoints are missing.
-   **Required Backend Work**:
    1.  Create `POST /upload/session/init`: Generate a unique session ID and temporary upload URL.
    2.  Create `GET /upload/session/{id}/status`: Return status (`WAITING`, `COMPLETED`) and file URL if done.
    3.  Create an upload page/endpoint for the Mobile user (the target of the QR code).

### C. Service List Implementation
-   **Current State**: `getServices` in frontend calls `/services`. Backend has no `/services` endpoint.
-   **Action**: Create `GET /services` in Backend to return dynamic list of active services from Database.

---

## 2. Near Future Updates

### A. Authentication & Security
-   **JWT Implementation**: As noted in `auth.py`, move from simple session/redirect to full JWT (JSON Web Token) implementation for secure, stateless authentication.
-   **RBAC (Role Based Access Control)**: Differentiate between `Super Admin`, `Department Staff`, and `Kiosk Maintenance` roles.

### B. Admin Dashboard
-   **Goal**: Enable officials to view and manage complaints.
-   **Features**:
    -   Dashboard with stats (Total complaints, Pending, Resolved).
    -   Detail view for complaints (including viewing attached photos).
    -   Status update capability (Open -> In Progress -> Closed).

### C. Database Enhancements
-   **Schema**:
    -   Add `created_at` and `updated_at` timestamps to all tables.
    -   Add `kiosk_health` table to track heartbeats from kiosks.
    -   Add `photo_url` column to `consumercomplaint` table (if not exists).

---

## 3. Services to be Enabled

### A. Bill Payments (Integration)
-   Integrate with KSEB and Water Authority APIs for real-time bill fetching and payment.
-   Replace current "Quick Pay" (redirect) with native UI flow.

### B. Application Status Tracking
-   Enable users to check status of previous applications by entering Application Number.

### C. Video Conferencing (The "Video" in Viosk)
-   Implement WebRTC based video support functionality.
-   "Call Support" button to connect user with a live agent.
