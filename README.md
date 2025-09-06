# CMS

A Content Management System (CMS) for managing clients, services, invoices, and user authentication. This system includes backend APIs for handling authentication, clients, services, settings, and reports.

---

## Backend API Overview & Explanation

### 1. **Authentication API** (`routes/auth.js`)
Handles user registration, login, dashboard access, and logout, using JWT for session management.

- **POST `/auth/register`**  
  Register a new user (admin). Hashes password, checks for duplicates, and stores in MongoDB.

- **POST `/auth/login`**  
  Authenticate user credentials. On success, generates JWT and stores it in a cookie.

- **GET `/dashboard` & `/navbar`**  
  Render dashboard and navbar for logged-in users (JWT protected).

- **GET `/auth/logout`**  
  Clears auth cookie and redirects to login.

**JWT Middleware:**  
Located in `Middleware/jwtmiddleware.js`. Checks for JWT in cookies, verifies, and attaches user to request. Redirects to login if invalid.

---

### 2. **Service Management API** (`routes/service.js`)
CRUD operations for services offered.

- **GET `/Add_service`**  
  Render page to add a new service.

- **POST `/Add_service`**  
  Add a new service if it doesn't already exist.

- **GET `/manageservice`**  
  List all existing services.

- **GET `/editservice/:id`**  
  Render edit form for a specific service.

- **POST `/editservice/:id`**  
  Update details for a specific service.

- **POST `/Delete`**  
  Delete a service by ID.

---

### 3. **Client Management API** (`routes/client.js`)
CRUD operations for clients and their associated services.

- **GET `/Add_client`**  
  Render form to add a new client.

- **POST `/Add_client`**  
  Add new client with hashed password, associated services, and generated account/invoice numbers.

- **GET `/Client_List`**  
  List all clients.

- **GET `/EditClient/:id`**  
  Render edit form for a specific client.

- **POST `/EditClient`**  
  Update client details.

- **POST `/delete/:id`**  
  Delete a client by ID.

- **GET `/Invoice`**  
  Display all client invoices.

- **GET `/view/:id`**  
  View invoice details for a client.

- **GET `/b/w_dates_report`**  
  Render report page for invoices between dates.

- **POST `/b/w_dates_report`**  
  Generate invoice report for a date range.

---

### 4. **Settings API** (`routes/setting.js`)
Allows admin to change their password.

- **GET `/setting`**  
  Render settings page (requires authentication).

- **POST `/setting`**  
  Update admin password after verifying current password and confirmation.

---

### 5. **Models**
- **User Model** (`models/user.js`):  
  Admin schema with name, email, number, hashed password.

- **Client Model** (`models/client.js`):  
  Client schema with account info, address, email, password, services, etc.

- **Service Model** (`models/service.js`):  
  Service schema with name, details, and price.

---

## Example API Usage (Node.js/Express)

```js
// Register User
fetch('/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, number, password })
});

// Add Service
fetch('/Add_service', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ service_name, details, price })
});
```

---

## Getting Started

1. **Clone Repo**  
   `git clone https://github.com/Avihdf/CMS.git && cd CMS`

2. **Install dependencies**  
   `npm install`

3. **Set up `.env`**  
   Add your MongoDB URI as `MONGO_URI`.

4. **Run the server**  
   `npm start`

---

## Contributing

Fork, create a branch, commit, and submit a pull request.


