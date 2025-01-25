# Singa Metro Fare Calculator

The **Singa Metro Fare Calculator** is a backend service for the Singa Metro Authority that calculates public transport fares based on journey lines and time periods. It supports peak and non-peak pricing, fare caps, and multiple metro lines.

---

## Features

### Core Features
- **Dynamic Fare Calculation**
  - Detects peak/non-peak hours
  - Calculates fares based on metro lines and journey types
- **Fare Capping**
  - Ensures daily and weekly fare caps are applied
  - Supports line-specific caps
- **Time-based Pricing**
  - Adjusts pricing based on predefined peak hours

### API Features
- RESTful endpoints for fare calculation
- Bulk journey processing
- Error handling and validation
- CSV file support for journey data

---

## Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Frontend**: React.js, Tailwind CSS, Shadcn UI

---

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/royaals/peakflo-assignment.git

cd peakflo-assignment
```

#### 2. Backend setup

```bash
# Navigate to backend directory
cd server

# Install dependencies
npm install

# Start the server
npm start
```

#### 2. Frontend setup

```bash

# Navigate to frontend directory
cd client

# Install dependencies
npm install

# run the development server
npm run dev
```
---

## API Documentation

### Calculate Fares

#### HTTP POST `/api/fares/calculate`

**Request Body**
```json
{
  "journeys": [
    {
      "fromLine": "Green",
      "toLine": "Red",
      "dateTime": "2023-12-11T09:00:00"
    }
  ]
}
```

**Response**
```json
{
  "results": [
    {
      "fare": 4,
      "isPeak": true,
      "dailyTotal": 4,
      "weeklyTotal": 4,
      "reachedDailyCap": false,
      "reachedWeeklyCap": false,
      "journey": {
        "fromLine": "Green",
        "toLine": "Red",
        "dateTime": "2023-12-11T09:00:00"
      }
    }
  ]
}
```



## Contact

For any inquiries, please contact [royalsalins.dev@gmail.com](mailto:royalsalins.dev@gmail.com).
