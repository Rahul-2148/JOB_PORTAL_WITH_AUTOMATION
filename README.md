# Full-Fledge Job Portal with Automation

## Overview
This is a **full-fledged Job Portal Website** where **Job Seekers** can explore various job opportunities, apply for jobs, and manage their profiles, including a password change feature. **Employers** can post job listings and manage applications, including viewing resumes.

One of the key highlights of this portal is the **automation feature** – when a job is posted in a specific domain, users who have preferred that job domain receive an automated email notification.

---
## Features
### **For Job Seekers:**
✅ Browse all available jobs
✅ Apply for jobs
✅ View and update their profile
✅ Change password
✅ Upload and manage resumes
✅ Receive automated email notifications when new jobs in preferred domains are posted
✅ Toast message Speak Voice Feature

### **For Employers:**
✅ Post job listings
✅ View applications
✅ Download and review resumes
✅ Receive applications directly
✅ Toast message Speak Voice Feature

### **Automation Features:**
🔹 Job seekers receive email notifications for new jobs in their preferred domains.
🔹 Employers receive alerts when new applications are submitted.

---
## Tech Stack
- **Frontend:** React.js, Redux, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **File Storage:** Cloudinary (for resumes and profile pictures)
- **Email Notifications:** Nodemailer
- **Third Part Package used: SweetAlert2 ( for beautiful alert)

---
## Installation Guide
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Rahul-2148/JOB_PORTAL_WITH_AUTOMATION.git
cd JOB_PORTAL_WITH_AUTOMATION
```

### 2️⃣ Install Dependencies
```bash
npm install
cd client  # Navigate to frontend folder
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

### 4️⃣ Start the Server
```bash
npm run dev
```

### 5️⃣ Start the Frontend
```bash
cd client
npm start
```

---
## Future Enhancements
🚀 Implement real-time chat between employers and job seekers  
🚀 Add a subscription-based model for premium job listings  
🚀 Introduce AI-based job recommendations  

---
## Contributors
👨‍💻 **Rahul Raj Modi**  
📧 Email: rahulrajmodi24523@gmail.com  
🔗 LinkedIn: https://www.linkedin.com/in/rahul-raj-11a946224/

---
## License
📜 This project is **open-source** and available under the MIT License.

