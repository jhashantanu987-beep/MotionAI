# KLARA CRM Backend

A complete, production-quality CRM Lead Management API built with Node.js, Express, and MongoDB.

## 🚀 Quick Start

```bash
# 1. Navigate into the backend folder
cd crm-backend

# 2. Install dependencies
npm install

# 3. Edit .env with your MongoDB URI (default is localhost)
# Already pre-configured for local MongoDB

# 4. Start the server
npm start        # production
npm run dev      # development with nodemon (auto-reload)
```

Server runs at: **http://localhost:5000**

---

## 📁 Folder Structure

```
crm-backend/
├── config/
│   └── db.js                  # Mongoose connection
├── controllers/
│   └── leadController.js      # Request handlers
├── middlewares/
│   ├── errorHandler.js        # Global error handler
│   └── validateLead.js        # Request validation
├── models/
│   └── Lead.js                # Mongoose schema
├── routes/
│   └── leadRoutes.js          # Express routes
├── services/
│   └── pipelineService.js     # Pipeline transition logic
├── .env                       # Environment variables
├── package.json
└── server.js                  # Entry point
```

---

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api/leads`

| Method | Endpoint         | Description                     |
|--------|------------------|---------------------------------|
| POST   | `/api/leads`     | Create a new lead               |
| GET    | `/api/leads`     | Get all leads (with filters)    |
| GET    | `/api/leads/:id` | Get a lead by ID                |
| PATCH  | `/api/leads/:id` | Update status, score, or notes  |
| DELETE | `/api/leads/:id` | Delete a lead                   |

---

## 📬 Postman Examples

### Create a Lead
```
POST http://localhost:5000/api/leads
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "source": "meta",
  "score": 75,
  "notes": "Interested in the Pro plan"
}
```

### Get Leads With Filters
```
GET http://localhost:5000/api/leads?status=new&source=google
```

### Update Lead Status (Pipeline)
```
PATCH http://localhost:5000/api/leads/<id>
Content-Type: application/json

{
  "status": "qualified",
  "score": 85,
  "notes": "Confirmed budget — moving to booked"
}
```

---

## 🔄 Pipeline Rules

Valid status transitions:
- `new` → `qualified`
- `qualified` → `booked`
- `booked` → `converted`
- any → `lost`

Invalid transitions return a `400` error with a clear message.

---

## 📦 Response Format

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## ⚙️ Environment Variables

| Variable   | Default                              | Description              |
|------------|--------------------------------------|--------------------------|
| PORT       | 5000                                 | Server port              |
| MONGO_URI  | mongodb://localhost:27017/klara_crm  | MongoDB connection string |
| JWT_SECRET | (optional)                           | For future auth features |
