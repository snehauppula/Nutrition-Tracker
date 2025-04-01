Here’s a simplified version of the README for your "Nutrition Tracker" project. It’s concise, easy to read, and covers the essentials.

---

# Nutrition Tracker

A MERN stack app to fetch and visualize nutrition data (calories, protein) for any product using the Gemini API.

---

## Features
- Input a product name (e.g., "apple").
- Fetches nutrition data via Gemini API.
- Stores data in MongoDB.
- Displays a bar chart with Chart.js.

---

## Tech Stack
- **Frontend**: React (Vite), Chart.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **API**: Google Gemini

---

## Setup
1. **Clone the Repo**:
   ```bash
   git clone https://github.com/snehauppula/nutrition-tracker.git
   cd nutrition-tracker
   ```

2. **Backend**:
   - Go to `backend`:
     ```bash
     cd backend
     npm install
     ```
   - Add `.env`:
     ```
     MONGO_URI=mongodb://localhost:27017/nutrition_tracker
     GEMINI_API_KEY=your_api_key
     PORT=5000
     ```
   - Start MongoDB (local): `mongod`
   - Run: `npm start`

3. **Frontend**:
   - Go to `frontend`:
     ```bash
     cd ../frontend
     npm install
     npm run dev
     ```
   - Open `http://localhost:3000`.

---

## Usage
- Enter a product name.
- See nutrition data in a chart.

---

## Structure
```
nutrition-tracker/
├── backend/    # Node.js, Express, MongoDB
├── frontend/   # React, Vite
└── README.md
```

---

## Troubleshooting
- **Port Issue**: Change `PORT` in `.env` if `5000` is taken.
- **MongoDB**: Ensure it’s running or use MongoDB Atlas.
- **API**: Verify your Gemini API key.

---

## License
MIT
