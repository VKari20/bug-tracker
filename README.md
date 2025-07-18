##🐞 Bug Tracker App
A full-stack bug tracking application built using React (Vite), Express, and MongoDB. It supports creating and viewing bugs, with built-in error handling, testing, and debugging tools.

##🚀 Features
Add and view bugs

Frontend + backend validation

Loading indicators and error messages

Error boundaries for React errors

Fully tested with Vitest + React Testing Library

Debug logs and Node.js Inspector support

##📦 Tech Stack
Layer	Technology
Frontend	React + Vite
Backend	Express.js
Database	MongoDB
Testing	Vitest + React Testing Library
Debugging	Chrome DevTools, Node Inspector

##🛠️ Installation & Running
1. Clone the Repo
bash
Copy
Edit
git clone https://github.com/your-username/bug-tracker.git
cd bug-tracker

2. Install Dependencies
Backend (Express):
bash
cd server
npm install

Frontend (React + Vite):
bash
cd client
npm install

3. Start Development Servers
Backend (port 5000):
bash
npm run dev

Frontend (port 5173):
bash
npm run dev
The Vite dev server proxies /api calls to Express.

##🧪 Running Tests
Frontend Unit Tests (Vitest + RTL):
bash
cd client
npm run test
All tests are located in client/src/_tests_/

Tests cover:

Form submission behavior

Loading state

Error message rendering

Callback invocations

##b✅ Testing Strategy & Coverage
We follow a component-level unit testing approach using:

@testing-library/react

vitest

Key Behaviors Covered:
Component	Test Case	Coverage ✅
BugForm	Submits bug and clears form	✅
Shows loading state during submission	✅
Displays error if API call fails	✅
Triggers callback on successful create	✅

➡ You can extend coverage using Vitest coverage:

bash

npx vitest run --coverage
This will generate a coverage/ folder.

##🐞 Debugging Techniques
🔍 Frontend
Chrome DevTools:

Inspect component state

Watch API network calls

View console.log() outputs

Added logs in BugForm.jsx:

js
console.log('📤 Submitting:', { title, description });
console.log('✅ Submission response:', res.data);

🧠 Backend
Node Inspector:

bash
node --inspect server/index.js
Visit: chrome://inspect

Add breakpoints to debug API routes

Express Error Middleware:

js
app.use((err, req, res, next) => {
  console.error('❌ Backend Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});
🧱 Folder Structure
pgsql
Copy
Edit
client/
  ├── components/
  ├── _tests_/          # ✅ Vitest + RTL tests
  ├── App.jsx
  └── main.jsx

server/
  ├── routes/
  ├── models/
  └── index.js
📌 Notes
Vite proxy is configured in vite.config.js to forward /api to the Express server.

Use ErrorBoundary.jsx to catch unexpected React rendering errors.

📃 License
MIT © Vennesa Njuguna# bug-tracker
