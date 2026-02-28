# 🤝 VolunteerHub (Frontend)

## 📖 Project Description
VolunteerHub is a modern web application designed to connect passionate volunteers with meaningful community opportunities. Our platform bridges the gap between individuals looking to make a difference and organizations driving real-world impact. Whether you're looking to mentor a student, clean up a local park, or provide professional pro-bono services, VolunteerHub makes giving back easy and rewarding.

## ✨ Features
- **Authentication & Roles**: Secure login with roles for Volunteers, Organizations, and Administrators.
- **Smart Opportunity Matching**: Find opportunities that align perfectly with your skills and interests.
- **Community Groups**: Join forces with like-minded individuals in your area to tackle larger initiatives together.
- **Volunteer Dashboard**: Track your hours served, past opportunities, and profile statistics.
- **Events Calendar**: Browse and organize upcoming volunteer events.
- **Resource Center**: Access guides and materials to aid your volunteer work.
- **Modern UI**: Fully responsive design with dual theme support (Dark/Light).

## 🛠️ Tech Stack Used
- **Frontend Framework**: React 18, Vite
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Styling**: Vanilla CSS with CSS Variables
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Build Tool**: Vite

## 🚀 Installation Steps

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cdvolunteer-hub-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables (if applicable):**
   Create a `.env` file in the root directory based on `.env.example`.
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to the URL provided in the terminal (usually `http://localhost:5173`).

## 🌐 Deployment Link
https://volunteerhub0607.netlify.app/

### Deploying to Netlify
This repository is pre-configured for seamless deployment to Netlify! A `netlify.toml` file is already included with the necessary build commands and routing rules.

**To deploy:**
1. Fork or upload this repository to your GitHub account.
2. Log in to [Netlify](https://app.netlify.com/) and click **Add new site** > **Import an existing project**.
3. Connect your GitHub account and select your `VolunteerHub` repository.
4. Netlify will automatically detect the settings:
   - **Base directory:** `volunteer-hub-frontend` (if inside a monorepo, otherwise leave blank or handle accordingly)
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Show advanced** and add your Environment Variables (e.g., `VITE_API_URL`).
6. Click **Deploy site**!

## 🔌 Backend API Link
https://api-volunteer-opportunity-hub-backend.onrender.com

## 🔑 Login Credentials (if applicable)
**Admin Tester Account:**
- **Email:** *[To be provided]*
- **Password:** *[To be provided]*

*Note: General volunteer and organization accounts can be created directly via the registration page.*

## 📸 Screenshots
*(Add screenshots of the application here showing the Dashboard, Opportunities, and Calendar)*
![Screenshot](https://i.ibb.co/dsbnv2WS/Screenshot-2026-02-28-224050.png)
![Screenshot](https://i.ibb.co/99KZMGDY/Screenshot-2026-02-28-224030.png)
![Screenshot](https://i.ibb.co/wNxGcHb0/Screenshot-2026-02-28-223952.png)
![Screenshot](https://i.ibb.co/FLMv8ggt/Screenshot-2026-02-28-223856.png)
![Screenshot](https://i.ibb.co/GfswtQhL/Screenshot-2026-02-28-223810.png)
![Screenshot](https://i.ibb.co/5h87qZhK/Screenshot-2026-02-28-223754.png)
![Screenshot](https://i.ibb.co/FbxXw2nC/Screenshot-2026-02-28-223730.png)
![Screenshot](https://i.ibb.co/SX01w5j8/Screenshot-2026-02-28-223704.png)
![Screenshot](https://i.ibb.co/J9kT8Fd/Screenshot-2026-02-28-223613.png)
![Screenshot](https://i.ibb.co/0Sh9xgc/Screenshot-2026-02-28-223548.png)

## 🎥 Video Walkthrough Link
*(Add link to video walkthrough here)*
https://drive.google.com/file/d/17dQ-QKoplJbla-JyFuLEgvgRaVnOpvHT/view?usp=sharing
