# 💰 Project Cost Tracker

![Demo GIF](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcW0yNnRlY2Z5dWl6Z3RlZzB6Y2V6ZHF5ZzJ6eGZ6eGZ6eGZ6eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/your-demo-gif-url.gif)

A sleek, animated dashboard to track project expenses with Firebase integration. Features real-time updates, user authentication, and delightful UI animations.

## ✨ Features

- **🎨 Animated UI**  
  - Floating cards with hover effects  
  - Smooth gradient background  
  - Pulsing total cost counter  
  - Confetti celebrations on actions  

- **🔐 Secure Authentication**  
  - Firebase email/password login  
  - Private user data isolation  

- **📊 Expense Management**  
  - Add/Edit/Delete items & costs  
  - Real-time Firestore sync  
  - Automatic total calculation  

- **💅 Stylish Components**  
  - Chakra UI with custom animations  
  - Responsive design  

## 🛠️ Tech Stack

| Category       | Technology           |
|----------------|----------------------|
| Frontend       | React.js             |
| State Management | Redux Toolkit       |
| UI Framework   | Chakra UI            |
| Backend        | Firebase Firestore   |
| Authentication | Firebase Auth        |
| Animations     | CSS3, Framer Motion  |

## 🚀 Getting Started

### Prerequisites
- Node.js ≥16
- Firebase project (with Firestore enabled)

### Installation
```bash
git clone https://github.com/yourusername/project-cost-tracker.git
cd project-cost-tracker
npm install
```

Firebase Setup
Create .env file:
```
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_PROJECT_ID=your-project-id
REACT_APP_STORAGE_BUCKET=your-bucket.appspot.com
REACT_APP_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_APP_ID=your-app-id
```

Configure Firestore Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
Running the App
```
npm start
```
Happy budgeting! ✨
Built with ❤️ by Ujjwal Singh

