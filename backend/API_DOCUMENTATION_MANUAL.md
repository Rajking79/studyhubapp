# 📖 StudyHub AI Backend — Complete API Reference & Working Manual

This comprehensive documentation details the architecture, working logic, inputs, and response behavior of every API endpoint in the StudyHub AI Backend (`d:\studyhubapp\backend`).

---

## 📁 Table of Contents
1. [Module 1: Authentication & Onboarding (Auth)](#-module-1-authentication--onboarding-auth)
2. [Module 2: User Profile & Preferences (User)](#-module-2-user-profile--preferences-user)
3. [Module 3: Academic Hierarchy Directory](#-module-3-academic-hierarchy-directory)
4. [Module 4: Study Materials Library](#-module-4-study-materials-library)
5. [Module 5: Student Productivity Tools](#-module-5-student-productivity-tools)
6. [Module 6: AI Assistant & Learning Tools](#-module-6-ai-assistant--learning-tools)
7. [Module 7: Bookmarks, Downloads & Dashboard](#-module-7-bookmarks-downloads--dashboard)
8. [Module 8: Web Admin Management Panel](#-module-8-web-admin-management-panel)

---

## 🔐 Module 1: Authentication & Onboarding (Auth)

Provides secure multi-method authentication (Email/Password, Google OAuth 2.0, Guest Mode, Dev 1-Click Login) with dual JWT tokens (15-minute Access Token + 7-day HTTP-Only Refresh Token Cookie) and timing-safe password validation.

### Endpoints Detail:

1. **`POST /api/v1/auth/register` — Student Registration**
   - **Kya Karta Hai**: Naye student ko register karta hai (Name, Email, Password, College, Course, Semester). Password ko `bcrypt` se 10 rounds salt ke saath hash karta hai.
   - **Response**: User Object + `accessToken` (15m) + Sets `refreshToken` HTTP-Only Cookie.

2. **`POST /api/v1/auth/login` — Email & Password Login**
   - **Kya Karta Hai**: Registered student ko login karta hai. Email ko sanitize & lowercase karke timing-safe password comparison karta hai. Device ID, IP Address, aur User-Agent audit log me record hote hain.

3. **`POST /api/v1/auth/dev-login` — Fast 1-Click Testing Login**
   - **Kya Karta Hai**: Development environment me bina password type kiye instant JWT access token generate karta hai fast testing ke liye.

4. **`POST /api/v1/auth/guest-login` — Guest Session Access**
   - **Kya Karta Hai**: Unregistered guests ko temporary access token deta hai jisse woh search aur materials preview kar sakein (with upload/AI usage limits).

5. **`POST /api/v1/auth/google-login` — Google One-Tap OAuth Login**
   - **Kya Karta Hai**: Google ID Token verify karta hai. Agar new student hai toh auto-register karke tokens issue karta hai.

6. **`POST /api/v1/auth/forgot-password` — Send 6-Digit OTP**
   - **Kya Karta Hai**: Student ke email par 6-digit dynamic OTP generate karke bhejta hai (valid for 10 minutes).

7. **`POST /api/v1/auth/resend-otp` — Resend OTP Code**
   - **Kya Karta Hai**: Expiry time reset karke naya 6-digit OTP resend karta hai.

8. **`POST /api/v1/auth/verify-otp` — Verify 6-Digit OTP**
   - **Kya Karta Hai**: OTP code verify karta hai aur 15-minute validity wala secure Password Reset Token return karta hai.

9. **`POST /api/v1/auth/reset-password` — Password Reset Confirmation**
   - **Kya Karta Hai**: Reset Token ya Verified OTP ke saath naya password receive karke user account ka password hash update karta hai.

10. **`POST /api/v1/auth/refresh-token` — Refresh Access Token**
    - **Kya Karta Hai**: Expired 15-minute access token ko renewal karta hai 7-day refresh token cookie/body se without re-login.

11. **`GET /api/v1/auth/me` — Get Current Authenticated User**
    - **Kya Karta Hai**: Active JWT bearer token decode karke current student/admin profile payload return karta hai.

12. **`POST /api/v1/auth/logout` — End Session**
    - **Kya Karta Hai**: Refresh Token cookie clear karke session terminate karta hai.

13. **`POST /api/v1/auth/logout-all-devices` — Terminate All Sessions**
    - **Kya Karta Hai**: User ke sabhi active devices se refresh tokens revoke karke hard logout karta hai.

---

## 👤 Module 2: User Profile & Preferences (User)

Manages student profile metadata, academic affiliation, app preferences, data privacy (GDPR export), referral rewards, and soft account deletion.

### Endpoints Detail:

1. **`GET /api/v1/user/profile` — Get Student Profile**
   - **Kya Karta Hai**: Student ki personal details, college, course, semester, profile picture, reward coins, aur stats load karta hai.

2. **`PUT /api/v1/user/profile` — Update Student Profile**
   - **Kya Karta Hai**: Student name, phone, college, course, semester, aur bio update karta hai with input validation.

3. **`GET /api/v1/user/uploads` — Get My Uploaded Materials**
   - **Kya Karta Hai**: Student dawara app me share/upload kiye gaye notes aur study materials ki list download counts ke saath dikhata hai.

4. **`GET /api/v1/user/settings` — Get App Settings**
   - **Kya Karta Hai**: User ki Dark Mode preference, Notification alerts, Email notifications, Language settings fetch karta hai.

5. **`PATCH /api/v1/user/settings` — Update App Settings**
   - **Kya Karta Hai**: Dark mode toggle, email alerts toggle ko save karta hai.

6. **`GET /api/v1/user/referral` — Get Referral Code & Rewards**
   - **Kya Karta Hai**: Student ka unique referral code (e.g. `STUDY_6A685D`), shareable invite URL, total invited friends, aur earned bonus coins fetch karta hai.

7. **`POST /api/v1/user/referral/apply` — Apply Friend Referral Code**
   - **Kya Karta Hai**: Friend ka referral code apply karke both users ko +50 bonus coins award karta hai with self-referral protection.

8. **`GET /api/v1/user/me/export` — Export User Data (GDPR Compliance)**
   - **Kya Karta Hai**: Student ka poora profile data, uploads, favorites, and settings ek JSON file report me export karke deta hai (GDPR Article 20).

9. **`DELETE /api/v1/user/me` — Soft Delete Account**
   - **Kya Karta Hai**: Confirmation text check karke account ko `isDeleted: true` mark karta hai safety ke liye (no hard data wipe).

---

## 🏛️ Module 3: Academic Hierarchy Directory

Provides hierarchical navigation across Universities, Colleges, Courses, Semesters, and Subjects.

### Endpoints Detail:

1. **`GET /api/v1/colleges` — List All Colleges & Universities**
   - **Kya Karta Hai**: App me registered colleges/universities ki list returns karta hai with search filtering and pagination.

2. **`GET /api/v1/courses` — List All Degree Courses**
   - **Kya Karta Hai**: Available degrees (B.Tech CS, BCA, B.Sc, MBA) filterable by college fetch karta hai.

3. **`GET /api/v1/semesters` — List Academic Semesters**
   - **Kya Karta Hai**: Course ke according Semesters (Semester 1 to Semester 8) ki options list deta hai.

4. **`GET /api/v1/subjects` — List Subjects**
   - **Kya Karta Hai**: Specific semester and course ke saare subjects (Operating Systems, DBMS, DSA) with subject codes and credit points list karta hai.

---

## 📚 Module 4: Study Materials Library

The core engine for searching, filtering, reading, and downloading curated academic resources.

### Endpoints Detail:

1. **`GET /api/v1/materials` — Global Materials Search & Filter**
   - **Kya Karta Hai**: Category, subject, semester, course, college, aur search query params ke saath materials fetch karta hai with pagination.

2. **`GET /api/v1/pyqs` — Previous Year Question Papers**
   - **Kya Karta Hai**: Exam mid-term & end-term Previous Year Question Papers with solutions filter karta hai.

3. **`GET /api/v1/notes` — Handwritten & Faculty Lecture Notes**
   - **Kya Karta Hai**: High quality lecture revision notes fetch karta hai.

4. **`GET /api/v1/books` — Reference Textbooks**
   - **Kya Karta Hai**: Recommended textbooks and reference ebooks list करता hai.

5. **`GET /api/v1/videos` — Curated Video Lectures**
   - **Kya Karta Hai**: Unit-wise YouTube/hosted video lecture links and playlist info return karta hai.

6. **`GET /api/v1/question-bank` — Practice Question Banks**
   - **Kya Karta Hai**: Unit-wise important questions & answer keys list karta hai.

7. **`POST /api/v1/materials/upload` — Student Material Contribution**
   - **Kya Karta Hai**: Student dawara share kiye gaye notes/PYQs submit karta hai admin moderation approval queue me.

---

## 🛠️ Module 5: Student Productivity Tools

Calculators and tools tailored for academic performance tracking.

### Endpoints Detail:

1. **`GET /api/v1/tools/cgpa` & `GET /api/v1/tools/gpa-calculator` — Fetch Saved CGPA Records**
   - **Kya Karta Hai**: Student ke past semester SGPA aur CGPA calculation history fetch karta hai.

2. **`POST /api/v1/tools/cgpa/calculate` — Calculate CGPA**
   - **Kya Karta Hai**: Multiple semester SGPA & credits input lekar weighted CGPA calculate karta hai.

3. **`POST /api/v1/tools/cgpa/save` — Save CGPA Calculation**
   - **Kya Karta Hai**: Calculated CGPA, Target CGPA, and semester breakdown record save karta hai.

4. **`GET /api/v1/tools/attendance-tracker` — Attendance Overview**
   - **Kya Karta Hai**: Sabhi subjects ki attended vs total classes, percentage, aur 75% criteria status load karta hai.

5. **`POST /api/v1/tools/attendance/subject` — Add Attendance Subject**
   - **Kya Karta Hai**: Naya subject target percentage (e.g. 75%) ke saath attendance tracker me add karta hai.

6. **`PATCH /api/v1/tools/attendance/mark` — Quick Mark Attendance**
   - **Kya Karta Hai**: 1-Tap Present / Absent log karta hai aur instant percentage recalculate karta hai.

7. **`POST /api/v1/tools/attendance/log` — History Attendance Log**
   - **Kya Karta Hai**: Specific date par class status (Present/Absent/Cancelled) log karta hai.

8. **`POST /api/v1/tools/attendance/recalculate` — Recalculate Bunk Margin**
   - **Kya Karta Hai**: Calculate karta hai ki student kitni classes bunk kar sakta hai ya kitni attend karni hongi 75% target ke liye.

9. **`GET/POST /api/v1/tools/resume-builder` — ATS Resume Builder**
   - **Kya Karta Hai**: Student resume templates list karta hai aur professional PDF resume generate karta hai.

10. **`GET/POST /api/v1/tools/plagiarism-checker` — Assignment Similarity Checker**
    - **Kya Karta Hai**: Text assignment content check karke similarity vs unique percentage report return karta hai.

---

## 🤖 Module 6: AI Assistant & Learning Tools

AI powered study tools for instant doubt solving and automated study aid generation.

### Endpoints Detail:

1. **`POST /api/v1/ai/chat` — AI Tutor Chat Prompt**
   - **Kya Karta Hai**: Student context and subject ke according AI Doubt Solver response generate karta hai.

2. **`POST /api/v1/ai/summarize` — AI Text Summarizer**
   - **Kya Karta Hai**: Long textbook paragraphs ko bulleted key summary points me condense karta hai.

3. **`POST /api/v1/ai/explain` — AI Concept Explainer**
   - **Kya Karta Hai**: Complex technical topics ko ELI5 (Explain Like I'm 5) simple language me explain karta hai with real-world analogies.

4. **`POST /api/v1/ai/flashcards` — AI Flashcards Generator**
   - **Kya Karta Hai**: Topic input se instant Question-Answer revision flashcards generate karta hai.

5. **`POST /api/v1/ai/quiz` — AI Quiz Generator**
   - **Kya Karta Hai**: Subject or topic se multiple-choice practice quiz questions (MCQs) generate karta hai with answer keys.

6. **`POST /api/v1/ai/snap-solve` — Snap & Solve OCR Problem Solver**
   - **Kya Karta Hai**: Uploaded math problem photo/text se step-by-step solution output generate karta hai.

7. **`GET /api/v1/ai/history` — Get AI Chat History**
   - **Kya Karta Hai**: Student ke past AI conversations and prompts load karta hai.

8. **`DELETE /api/v1/ai/history/clear` — Clear AI History**
   - **Kya Karta Hai**: Student ka AI interaction history delete/reset karta hai.

---

## 📊 Module 7: Bookmarks, Downloads & Dashboard

Personalized student dashboard feed, offline download manager, bookmarks, and search.

### Endpoints Detail:

1. **`GET /api/v1/dashboard/home` — Student Home Feed**
   - **Kya Karta Hai**: Trending notes, recent uploads, daily study stats, and banner slider load karta hai.

2. **`GET /api/v1/dashboard/continue-reading` — Continue Reading Resume**
   - **Kya Karta Hai**: Student dawara aadhay chhode gaye PDFs aur last read page number load karta hai.

3. **`POST /api/v1/dashboard/update-progress` — Save PDF Reading Progress**
   - **Kya Karta Hai**: Material ID, last page read, and percentage completed store करता hai.

4. **`GET /api/v1/dashboard/search` — Universal Global Search**
   - **Kya Karta Hai**: Single search query se subjects, notes, PYQs, and books across colleges find karta hai.

5. **`GET /api/v1/favorites` — Get Bookmarks List**
   - **Kya Karta Hai**: Student dawara saved/starred study materials list load karta hai.

6. **`POST /api/v1/favorites/toggle` — Toggle Bookmark**
   - **Kya Karta Hai**: Material ko favorite add ya remove karta hai with instant counter update.

7. **`GET /api/v1/downloads/my-downloads` — Offline Downloads History**
   - **Kya Karta Hai**: Device par offline saved materials history show karta hai.

8. **`POST /api/v1/downloads/sync` — Sync Offline Downloads**
   - **Kya Karta Hai**: Offline downloaded files count and sync state update karta hai.

9. **`GET /api/v1/notifications` — Student Notification Center**
   - **Kya Karta Hai**: Exam alerts, new notes upload notices, and global broadcasts display karta hai.

10. **`PATCH /api/v1/notifications/mark-all-read` — Mark Notifications Read**
    - **Kya Karta Hai**: Unread badge count ko reset/zero karta hai.

11. **`POST /api/v1/support/feedback` — Submit Support Ticket**
    - **Kya Karta Hai**: Bug reports, feature suggestions, or feedback messages send karta hai.

---

## 👑 Module 8: Web Admin Management Panel

Full executive management and content moderation endpoints for system administrators.

### Endpoints Detail:

1. **`POST /api/v1/admin/login` & `POST /api/v1/admin/register` — Admin Auth**
   - **Kya Karta Hai**: Admin login and new sub-admin registration with strict role authorization guards.

2. **`GET /api/v1/admin/stats` — Executive System Metrics**
   - **Kya Karta Hai**: Total students count, online active users, total colleges, total courses, materials count, and server health overview render karta hai.

3. **`GET /api/v1/admin/health` — Infrastructure Health Check**
   - **Kya Karta Hai**: Node.js server uptime, memory usage, and MongoDB database ping response time check karta hai.

4. **`GET /api/v1/admin/audit-logs` — Audit Logs Tracker**
   - **Kya Karta Hai**: Admins and users dawara kiye gaye critical administrative actions ka audit log load karta hai.

5. **`GET/PUT /api/v1/admin/colleges` — Colleges CRUD Manager**
   - **Kya Karta Hai**: Naye colleges add, edit, featured badge toggle, or soft delete karne ki permission deta hai.

6. **`GET/POST/PUT/DELETE /api/v1/admin/courses` — Courses CRUD Manager**
   - **Kya Karta Hai**: Degree programs add/edit/delete karne ke endpoints.

7. **`GET/POST/PUT/DELETE /api/v1/admin/subjects` — Subjects CRUD Manager**
   - **Kya Karta Hai**: Subjects, subject codes, and semester assignments modify karne ke endpoints.

8. **`GET/POST/PUT/DELETE /api/v1/admin/materials` — Materials Moderation Engine**
   - **Kya Karta Hai**: Uploaded materials review, publish approve, metadata edit, or remove karne ke endpoints.

9. **`GET/PATCH/DELETE /api/v1/admin/users` — Student Account Moderation**
   - **Kya Karta Hai**: Registered student directory list, block/unblock spam accounts with reason, or soft delete student account.

10. **`POST /api/v1/admin/notifications/send` — Broadcast System Notice**
    - **Kya Karta Hai**: Sabhi mobile app users ko instant global push announcement/notice broadcast karta hai.

11. **`GET/POST/PUT/DELETE /api/v1/admin/banners` — Banner Slider Manager**
    - **Kya Karta Hai**: Mobile App Home Screen banner sliders create, link, toggle active status, and delete karta hai.

12. **`GET /api/v1/admin/referrals` — Referral Leaderboard & Analytics**
    - **Kya Karta Hai**: Top student referrers, total invites generated, and coin rewards distribution analytics show karta hai.

13. **`GET /api/v1/admin/feedbacks` — Student Feedback Inbox**
    - **Kya Karta Hai**: Students dawara bheje gaye bug reports and feedback messages process & respond karne ki permission deta hai.
