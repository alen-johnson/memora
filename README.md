# Social Media Web App

A scalable social media platform built with React, TypeScript, Firebase, and Zustand, enabling users to create profiles, share content, and interact with others through likes and comments. Firebase is used for authentication and real-time data synchronization, providing a smooth, dynamic user experience.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Existing Issues](#existing-issues)
- [Technologies Used](#technologies-used)
- [Contact](#contact)
- [Environment Variables](#environment-variables)

## Installation

1. Clone the repository:
   git clone https://github.com/yourusername/project-name.git
2. Navigate to the project directory:
   cd project-name
3. Install dependencies
   npm install
4. Create a .env file in the root directory and add the following
   VITE_FIREBASE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_FIREBASE_AUTH_DOMAIN=your-auth-domain
   VITE_FIREBASE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   VITE_FIREBASE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_FIREBASE_APP_ID=your-app-id
5. Start the development server:
   npm run dev

## Usage

->After starting the app, go to created http://localhost:port.
->Log in or create account using Firebase authentication.
->Create a profile, share posts, and interact with other users by liking post and sahring content.

## Features

->User Authentication: Sign in via email/password or social logins using ->Firebase Authentication.
->Post Creation: Users can create and share text or image posts.
->Real-time Posts: See new posts in real time without refreshing the page.
->Profile Management: Users can create, update, and view profiles.
->Follow/Unfollow: Follow and unfollow other users to see their posts in your feed.
->Like: Interact with posts by liking and sharing

## Existing Issues

->Bug: Sometimes the app fails to load video after succesful upload
->Feature: -Notifications for new followers are not implemented yet
           -Mutiple image post is currenlty limited to 2
->Improvement: Improve the UI for mobile devices.
->Enhancement: Add veiw of of posts separatively.

## Technologies Used

->Frontend: ReactJS, TypeScript, Zustand, Vite
->Backend: Firebase (Firestore, Authentication)
->Styling: CSS, Ant Design, CSS-in-JS
->State Management: Zustand
->Database: Firebase Firestore

## Contact

For details regarding the .env file or any questions about the project setup, feel free to contact me at [alenjohnson@gmail.com].

## Environment Variables

This project requires some environment variables for Firebase and other services. Please create a .env file in the root directory with the following fields:
VITE_FIREBASE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_FIREBASE_APP_ID=your-app-id

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
