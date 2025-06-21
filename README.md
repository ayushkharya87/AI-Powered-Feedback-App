# 🧠 AI-Powered Feedback App

A full-stack AI-based application using **MERN** and **Vite** that allows users to submit sentences or messages and receive clear, constructive feedback powered by **Google Gemini**.

---

## 📦 Tech Stack

- **Frontend:** React + Vite, Bootstrap  
- **Backend:** Node.js, Express  
- **Database:** MongoDB (via Mongoose)  
- **AI:** Google Gemini API (`@google/generative-ai`)  
- **Other Tools:** dotenv, cors, axios  

---

## 🛠️ Setup Instructions

```bash
# 1. Clone the Repository
git clone https://github.com/ayushkharya87/AI-Powered-Feedback-App.git
cd AI-Powered-Feedback-App

# 2. Setup Backend
cd server
npm install

# Create a .env file in /server with the following:
# ----------------------------------
# PORT=
# MONGO_URI=
# GEMINI_API_KEY=your_gemini_api_key_here
# ----------------------------------

npm run dev

# 3. Setup Frontend
cd ../client
npm install
npm run dev
