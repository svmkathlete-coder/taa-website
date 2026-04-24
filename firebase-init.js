// firebase-init.js - Master Cloud, Storage & Communication Hub

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";

// NEW TAA-Portal-v3 Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfCxCbBdEXGZYWpmDN-8Q7-LxyrWJqqZE",
  authDomain: "taa-portal-v3.firebaseapp.com",
  projectId: "taa-portal-v3",
  storageBucket: "taa-portal-v3.firebasestorage.app",
  messagingSenderId: "50340039911",
  appId: "1:50340039911:web:e3a7667105605042136642"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// --- EmailJS Setup ---
import * as emailjsModule from 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';

const emailjs = emailjsModule.default || emailjsModule;

// Initialize EmailJS with your Public Key
if (emailjs && typeof emailjs.send === 'function') {
    if(emailjs.init) emailjs.init("X5jGzmGAoZ_0pnws8");
}

// Global Exposure for use across all portal pages
window.db = db;
window.auth = auth;
window.storage = storage;
window.emailjs = emailjs;

// Restored your specific EmailJS Keys
window.EMAIL_SERVICE_ID = "service_ah6bf6m";
window.EMAIL_TEMPLATE_ID = "template_j1rld3s";

console.log("🔥 TAA Portal v3: Cloud Database, Storage & Email Engine Online!");