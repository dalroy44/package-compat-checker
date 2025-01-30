# 📦 Package.json Dependency Compatibility Checker

## 🚀 Overview
This web app helps users analyze their `package.json` for dependency compatibility. Users can:
- Upload or paste a `package.json` file.
- Check outdated, deprecated, and breaking dependencies.
- Add new packages and verify compatibility.
- Auto-detect and modify Node.js/npm versions.
- Generate a compatibility report with upgrade recommendations.

## 🔧 Tech Stack
- **Frontend:** Next.js, Radix UI, TailwindCSS
- **Backend:** Cloudflare Workers / Vercel Functions
- **APIs:** npm Registry API
- **Hosting:** Vercel (Frontend), Cloudflare Workers (Backend)

## 📂 Project Structure
```
package-compat-checker/
│── frontend/       # Next.js frontend (UI & interactions)
│── backend/        # Serverless API (Cloudflare Workers/Vercel Functions)
│── README.md       # Documentation
│── LICENSE         # Open-source license (if applicable)
```

## 📌 Features
✅ Upload and parse `package.json`  
✅ Check for outdated, deprecated, and breaking dependencies  
✅ Add new packages and validate compatibility  
✅ Auto-detect Node.js/npm versions  
✅ Generate an upgrade plan with recommendations  
✅ Download formatted `package.json` and compatibility reports (PDF)  

## 🔧 Setup & Installation
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/package-compat-checker.git
cd package-json-compat-checker
```

### 2️⃣ Install Frontend Dependencies
```bash
cd frontend
npm install
npm run dev  # Starts Next.js frontend
```

### 3️⃣ Deploy Backend (Serverless API)
- Deploy backend via **Cloudflare Workers** or **Vercel Functions**.
- API endpoints will handle package.json parsing and compatibility checks.

## 🚀 Deployment
- **Frontend:** Deploy on **Vercel** (free tier)
- **Backend:** Use **Cloudflare Workers** or **Vercel Functions**

## 📜 License
MIT License

## 💡 Contributing
1. Fork the repo & clone it.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Added new feature"`
4. Push the branch: `git push origin feature-name`
5. Submit a pull request!

## 📬 Contact
For queries or contributions, reach out via [GitHub Issues](https://github.com/your-username/package-compat-checker/issues).

---
🚀 Happy coding! 🎯

