# 🎓 SDJPS Modern School Management App

A **modern SaaS-style School Management System** designed to digitize and automate school operations including academic management, attendance tracking, communication, analytics, and financial management.

This platform provides **role-based dashboards** for students, teachers, parents, and administrators with secure authentication and scalable architecture.

---

# 🔐 Role-Based Authentication System

The system supports multiple roles with **secure JWT-based authentication** and strict permission control.

### User Roles

👨‍🎓 Student  
👩‍🏫 Teacher  
👨‍👩‍👧 Parent  
🏫 Admin  
💰 Accountant  

Each role has:

- Dedicated dashboard
- Controlled permissions
- Data isolation
- Secure login system

---

# 👨‍🎓 Student Panel

Students can manage their academic activities through a dedicated dashboard.

### Core Features

- Attendance tracking (Daily & Monthly)
- Homework and Assignments
- Online Tests
- Marks & Report Cards
- Study Materials Download
- Timetable
- Notifications

### 🗨 Class Announcement Chat

Controlled classroom communication system.

Permissions:

- ✅ Class Teacher → Can send messages
- ✅ Class Monitor → Can send messages
- ❌ Students → View only
- ❌ Parents → View only

Features:

- Text announcements
- File sharing
- Pinned messages
- Message deletion (Teacher only)
- Announcement style (No replies)

---

# 🏆 Student Leaderboard

Students can view academic rankings within their class.

Leaderboard includes:

- Rank
- Student Name
- Percentage
- Class

Students can:

- View their personal rank
- See Top 10 students
- Compare performance with class average
- Filter by class
- Filter by exam term (Half-Yearly / Annual)

This feature promotes **healthy academic competition**.

---

# 👩‍🏫 Teacher Panel

Teachers manage classroom activities and student progress.

### Core Features

- Mark Attendance
- Upload Homework
- Upload Study Materials
- Create Tests
- Enter Marks
- Timetable Management

### Class Chat Management

Teachers can:

- Post announcements
- Pin important messages
- Remove messages
- Assign class monitor
- View chat history

### 🏆 Teacher Leaderboard View

Teachers can:

- View Top 10 students per class
- Identify subject-wise toppers
- Filter by exam
- Download leaderboard reports (PDF / Excel)

---

# 👨‍👩‍👧 Parent Panel

Parents can monitor their child’s academic progress.

Features:

- View attendance
- Track academic marks
- Fee payment
- School notices
- Leave requests
- Read class announcements (view-only)

---

# 🏫 Admin Panel

The Admin dashboard manages the entire school system.

---

## 📚 Academic Management

Admin can:

- Add classes
- Assign class teachers
- Select class monitors
- Promote students
- Manage exams

---

## 👥 User Management

Admin can:

- Add / remove students
- Add teachers
- Manage roles
- Bulk import users

---

## 💰 Financial Management

- Fee structure setup
- Payment tracking
- Teacher salary management

---

# 📊 Attendance Analytics

Admins get powerful insights into attendance trends.

Metrics include:

- Total students per class
- Average attendance %
- Students with 90%+ attendance
- Students below 75%

Charts available:

- Bar charts
- Line charts
- Pie charts

---

# 🏆 School Leaderboard (Admin)

Admin can view:

- Top 10 students across the school
- Top 10 per class
- Subject-wise toppers

Filters:

- Class
- Exam
- Academic year

Admin can also:

- Export leaderboard reports
- Compare year-to-year performance
- Enable/disable public leaderboard visibility
- Configure ranking logic

---

# 🧮 Leaderboard Ranking Logic

Ranking can be calculated using:

### Option 1: Percentage Based

Total Percentage =  
(sum of subject marks / total maximum marks) × 100

### Option 2: Advanced Scoring

Includes:

- Weighted subjects
- Attendance bonus points
- Extra-curricular bonus

Admin controls ranking configuration.

---

# 💰 Online Fee Payment System

Integrated payment gateways:

- Razorpay
- Stripe

Supported features:

- UPI
- Card
- Net Banking
- Auto-generated receipts
- Late fee calculation
- Installment payments
- Payment reports

---

# 📢 Communication System

The platform provides multiple communication channels.

Features include:

- School-wide announcements
- Push notifications
- SMS alerts
- Email notifications
- Emergency broadcasts

---

# 📅 Smart Attendance System

Advanced attendance tracking methods.

Supported options:

- QR Code attendance
- RFID attendance
- Face recognition
- Geo-location attendance (for transport tracking)

---

# 🚌 Transport Module

Transportation management system.

Features:

- Live bus tracking
- Route management
- Pickup/drop notifications

---

# 📊 Reports & Analytics

Advanced analytics to monitor school performance.

Reports include:

- Class performance charts
- Student growth analytics
- Subject weakness analysis
- Attendance trends
- Financial reports
- Leaderboard analytics

Export options:

- Excel
- PDF

---

# 📱 Modern UX Features

- Dark Mode
- Progressive Web App (PWA)
- Offline support
- Multi-language support
- Mobile-first responsive design
- Interactive data charts

---

# 🔐 Security System

Security is a core focus of the platform.

Features include:

- JWT Authentication
- Role-based access control
- Secure API architecture
- Audit logs
- Database backups
- Encrypted passwords

---

# 🛠 Tech Stack

### Frontend
- React
- TailwindCSS
- React Router
- Axios
- Recharts

### Backend
- Node.js
- Express.js

### Database
- Supabase (PostgreSQL)

### Authentication
- Supabase Auth
- JWT

### Tools
- Git & GitHub
- Vite
- VS Code

---

# 👨‍💻 Author

**Vaibhav Yadav**

Computer Science Student  
IIT Patna

---

⭐ If you like this project, please **star the repository**.
