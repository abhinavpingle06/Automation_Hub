# 🔎 Automation Hub - A simplified way to find & share automation ideas 🚀

Unlike other webpages which provides automation codes for dedicated automation tool - We focused more on centralizing this, letting the users to share variety of automations ideas using different automation tools such as n8n, Blue Prism, Zapier, and many more...

We are live - https://automation-hub-tawny.vercel.app/

## 🚀 Features

### 🛠️ Explore Automations
- Diversity of ideas
- One-click to copy workflows
- Options to share ideas on a variety of automation tools  

### 🔐 Authentication System
- JWT-based authentication  
- Secure user registration with email verification and Authorization 
- Profile management with ability to clear user's data  

### 🔍 Advanced Search & Discovery
- Multi-source search across different automation tools.
- Real-time filtering by title and use-case.

### ⚡ UI/UX
- User-friendly and intuitive experience  
- Beautiful loading skeletons for handling blocking requests
  
## 🛠️ Tech Stack

### Full Stack
- **Next.js** - Full-stack React framework (frontend + backend APIs)  
- **NeonDB** - Serverless PostgreSQL database  
- **Simple JWT** - Authentication system    

### UI & Styling
- **React 18** - UI library (used within Next.js)  
- **TailwindCSS** - Utility-first styling

# 🚀 Getting Started & Quick Set-ups

### Project Structure 

'''bash
'''

### ⚙️ Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/abhinavpingle06/automation-hub.git
cd automation-hub
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**

Create a `.env` file in the root directory:
```env
DATABASE_URL=your-neondb-url
JWT_SECRET=your-secret-key
ROLE=normaluser
CLOUD_NAME=your-cloudinary-name
CLOUD_API_KEY=your-cloudinary-api-key
CLOUD_SECRET_KEY=your-cloudniary-secret-key
PUBLIC_URL=http://127.0.0.1:3000
```

4. **Run the development server**
```bash
npm run dev
```

#### 🌐 Access the Application

- Next.js App: http://localhost:3000
- Live App: https://automation-hub-tawny.vercel.app/
- Check out **sitemap.xml** for endpoints

### 👤 User Guide

1. **Register an account** using your email 
2. **Log in** to access the platform  
3. **Explore automation ideas** across different tools  
4. **Search and filter** automations based on your needs  
5. **Share your own automation ideas** with the community  
6. **Manage your profile** and clear your data if needed

## 🤝 Contributing

Contributions are welcome! 🚀  

1. Fork the repository
2. Clone the repo in your local machine
   ```bash
   git clone
   https://github.com/your-username/automation-hub.git
   ```
4. Create a new branch  
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. Make your changes  
6. Commit your changes  
   ```bash
   git commit -m "Add your message"
   ```
7. Push to your branch  
   ```bash
   git push origin feature/your-feature-name
   ```
8. Open a Pull Request 

Please ensure your **Pull Requests (PRs)** and **Issues** follow a clean, detailed approach, adhere to good coding practices, and are properly tested.

***Happy Coding 🌿***
