🔍 Rekurso – Resource Finder Application
Rekurso is an intuitive and modern web application built to help users discover online resources based on keywords and related tags. It offers personalized recommendations, social engagement through popular resources, and even an integrated AI-powered chat support system.

🚀 Live Demo
👉 https://resourcefinderapp.vercel.app

📸 Screenshots
<img width="100%" alt="Rekurso Screenshot" src="https://github.com/user-attachments/assets/eff1339f-e52b-486e-bcdc-315dd327896f" />
🧠 Features
🔍 Search Resources: Search through a rich list of curated online resources using keywords and tags.

🔐 Social Login: Login securely using Google or GitHub.

👤 User Profile & Interests: Edit your profile and add interests after logging in.

🌟 Recommended Resources: Get personalized recommendations based on your interests.

❤️ Popular Resources: See what other users are liking.

📚 All Resources: Explore the full list of available resources.

💬 AI Chat Support: Integrated Gemini AI assists with search, filter, and navigation.

🚪 Logout Anytime: Securely logout whenever needed.

🛠 Tech Stack
Frontend
React.js

Tailwind CSS

Gemini AI API – for contextual chat support

Backend
Node.js

Express.js

MongoDB

Passport.js – for Google and GitHub authentication

📦 Installation
Clone the Repository
bash
Copy
Edit
git clone https://github.com/chingu-voyages/V55-tier3-team-31.git
Backend Setup
bash
Copy
Edit
cd resource-finder-backend
npm install
Create .env file with:
env
Copy
Edit
MONGODB_URI=
PORT=
SESSION_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_AUTH_API_KEY=
GITHUB_CLIENT_ID=
GITHUB_AUTH_API_KEY=
BACKEND_URL_LOCAL=
BACKEND_URL_PRODUCTION=
FRONTEND_URL=
Start Backend
bash
Copy
Edit
npm run start
Frontend Setup
bash
Copy
Edit
cd resource-finder
npm install
Create .env.development file with:
env
Copy
Edit
VITE_API_URL=
VITE_CLOUDFLARE_WORKER_URL=
Start Frontend
bash
Copy
Edit
npm run start
📁 Project Structure
bash
Copy
Edit
/resource-finder
  /components
  /pages
  /styles

/resource-finder-backend
  /routes
  /models
  /config
🙋‍♂️ Contributors
Dhemmy Hardy

Prakash

Jericho

Rangaraj

Suraj
