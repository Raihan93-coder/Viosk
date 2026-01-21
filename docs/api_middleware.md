# API & Middleware Documentation

This document details the API architecture, endpoints, and middleware layers used in the Viosk application.

## 1. API Architecture

The application uses a **Layered Architecture** for API communication.

1.  **Backend (FastAPI)**: Exposes RESTful endpoints.
2.  **Frontend Config (`config.js`)**: Centralizes configuration limits and endpoint paths.
3.  **HTTP Client (`client.js`)**: A wrapper around `fetch` that handles configuration, headers, and global error handling.
4.  **Service Modules (`kiosk.js`, `admin.js`)**: Domain-specific API methods called by UI components.

---

## 2. Frontend API Configuration
**File**: `Frontend/src/services/config.js`

-   **Base URL**: `http://localhost:8000` (Default)
-   **Kiosk ID**: `K-IND-TN-CH-01` (Hardcoded identifier sent with requests)
-   **Defined Endpoints**:
    -   `COMPLAINT`: `/complaints`
    -   `PHOTO_SESSION_INIT`: `/upload/session/init`
    -   `PHOTO_SESSION_STATUS`: `/upload/session/:id/status`
    -   `SERVICES`: `/services`
    -   `PAYMENT`: `/payments`

---

## 3. Middleware & Interceptors

### A. Frontend (Client Client)
**File**: `Frontend/src/services/api/client.js`

The custom `apiClient` wrapper acts as frontend middleware processing every request/response.

**Request Interception**:
-   **Headers**: Automatically injects:
    -   `Content-Type: application/json`
    -   `X-Kiosk-ID`: The unique Kiosk ID from config.

**Response Interception (Global Error Handling)**:
-   **401 Unauthorized**: Logs "Session expired", dispatches `auth:unauthorized` event to window (triggering app-wide logout/lock).
-   **403 Forbidden**: Throws "Access Forbidden" error.
-   **Non-2xx Responses**: Extracts error message from response body (`data.message` or `data.error`) and throws it as a standardized Javascript Error.

### B. Backend (FastAPI)
**File**: `Backend/user.py`, `Backend/auth.py`

**CORS Middleware**:
-   Configured to allow requests from `http://localhost:5173`.
-   Allows all methods (`*`) and headers (`*`).
-   `allow_credentials=True` (Supports cookie-based auth in future).

**Auth Middleware (Logic)**:
-   `is_user_allowed(email)`: Checks if the authenticated user's email belongs to the allowed list (`ALLOWED_EMAIL` set).
-   If not allowed, raises `HTTP 403 Access denied`.

---

## 4. API Endpoints Reference

### Kiosk Services (`src/services/api/kiosk.js`)

| Method (JS) | URI (Backend) | Description | Payload |
| :--- | :--- | :--- | :--- |
| `getServices()` | `GET /services` | Fetch list of available services | None |
| `getServiceDetails(id)` | `GET /services/{id}` | Get details for specific service | None |
| `submitPayment(data)` | `POST /payments` | Initiate a payment | Payment Data |
| `submitComplaint(data)` | `POST /complaints` | **Register a new complaint** | `{ department, description, kioskId, ... }` |
| `initPhotoSession(kId)` | `POST /upload/session/init` | Start QR photo upload session | `{ kioskId }` |
| `checkUploadStatus(sId)`| `GET .../{id}/status` | Poll for upload completion | None |

### Backend Routes Implementation Status (`Backend/`)
| Method | Route | File | Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/quickpay` | `user.py` | Active | Returns static URL |
| `POST` | `/consumercomplaint` | `user.py` | Active | **Validation**: desc length > 5 words. Inserts to DB. |
| `GET` | `/login` | `auth.py` | Active | Google OAuth start |
| `GET` | `/callback` | `auth.py` | Active | Google OAuth callback |

> **Note**: There is a divergence between Frontend `ENDPOINTS.COMPLAINT` (`/complaints`) and Backend route (`/consumercomplaint`). **This needs unification.**
