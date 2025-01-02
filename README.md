# Social Media Web App

A scalable social media platform built with React, TypeScript, Firebase, and Zustand, enabling users to create profiles, share content, and interact with others through likes. Firebase is used for authentication and real-time data synchronization, providing a smooth, dynamic user experience.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Existing Issues](#existing-issues)
- [Technologies Used](#technologies-used)
- [Contact](#contact)
- [Environment Variables](#environment-variables)

1. Clone the repository:
   git clone https://github.com/alen-johnson/vibesnap.git
2. Navigate to the project directory:
   cd vibesnap
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

->User Authentication: Sign in via email/password or sign in with google using Firebase Authentication.
->Post Creation: Users can create and share image or video posts.
->Real-time Posts: See new posts in real time without refreshing the page.
->Profile Management: Users can create, update, and view profiles.
->Follow/Unfollow: Follow and unfollow other users to see their posts in your feed.
->Like: Interact with posts by liking and sharing

## Existing Issues

->Bug: Popular page allignment 
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
