✨ Author

Shaik Kudhan


---

# ✅ **FRONTEND README.md**


# 🎨 TinyLink Frontend — React + Vite + Tailwind

TinyLink Frontend is a modern web UI built with **React** and **Vite**, styled with a custom Tailwind-based palette.

It allows users to:
- Register / Login
- Create short URLs
- View analytics
- Search & filter links
- Delete links
- Navigate to per-link stats page


---

# 🌐 Live App
Frontend (Vercel):  
**[https://tiny-link-frontend-beta.vercel.app/]**

---

# 🛠️ Tech Stack
- **React (Vite)**
- **TailwindCSS**
- **Axios**
- **Day.js**
- **Vercel Deployment**

---

# 📦 Install


cd frontend
npm install

⚙️ Environment Variables

Create .env:

VITE_API_BASE_URL=https://your-backend.onrender.com

---

▶️ Run Locally
npm run dev


Visit:

http://localhost:5173

---

🗂️ Project Structure
frontend/
 ├── src/
 │   ├── pages/
 │   │   ├── Login.jsx
 │   │   ├── Register.jsx
 │   │   ├── Dashboard.jsx
 │   │   └── Stats.jsx
 │   ├── components/
 │   │   ├── Navbar.jsx
 │   │   └── LinkCard.jsx
 │   ├── lib/
 │   │   ├── api.js
 │   │   └── dayjs.js
 │   ├── App.jsx
 │   └── main.jsx
 ├── index.css
 ├── package.json
 └── vite.config.js


 ---

🌟 UI Features

Modern card design

Gradient buttons

Icon-based actions (copy, open, delete)

2-column responsive grid

Stats page (clicks, lastClicked, target)

Hero section for URL creation

Smooth shadows & transitions

Fully mobile responsive

🔌 API Integration

Requests automatically include the JWT token:

API.get("/api/links")
API.post("/api/links", { target })
API.delete(`/api/links/${code}`)

---

Authentication:

API.post("/api/auth/login", { email, password })

---

🧪 Manual Testing

After setting VITE_API_BASE_URL, test the UI by:

Registering a user

Logging in

Creating short links

Clicking short URL to track stats

Checking updated clicks in Dashboard

Deleting a link

---

🌐 Deployment (Vercel)

Push frontend repo to GitHub

Import project into Vercel

Select Vite framework

Add env variable:

VITE_API_BASE_URL=https://your-backend.onrender.com


Deploy


---

🪪 License

MIT

---

✨ Author

Shaik Kudhan


