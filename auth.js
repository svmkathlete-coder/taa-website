// auth.js — TAA Portal Shared Authentication Module
//
// Include on every page AFTER firebase-init.js:
//   <script type="module" src="firebase-init.js"></script>
//   <script type="module" src="auth.js"></script>
//
// This is the ONLY place login/logout/session logic should live. Real
// Firebase Authentication (hashed passwords, server-verified sessions) —
// nothing here trusts a URL parameter, localStorage value, or a
// hardcoded password the way the old pages did.

import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const DASHBOARD_BY_ROLE = {
    "Admin": "taa-admin.html",
    "Technical Chairman": "technical-chairman.html",
    "District": "district-dashboard.html",
    "Coach": "coach-dashboard.html",
    "Official": "official-dashboard.html",
    "Athlete": "athlete-dashboard.html"
};

function dashboardFor(role) {
    return DASHBOARD_BY_ROLE[role] || "athlete-dashboard.html";
}

// firebase-init.js is also a deferred module script; this just guards
// against it not having finished setting window.auth/window.db yet.
function waitForFirebase() {
    return new Promise((resolve, reject) => {
        let tries = 0;
        const check = () => {
            if (window.auth && window.db) return resolve();
            if (++tries > 60) return reject(new Error("Could not connect to TAA secure servers. Please refresh the page."));
            setTimeout(check, 50);
        };
        check();
    });
}

function friendlyError(err) {
    const code = err && err.code;
    if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found") {
        return "Incorrect email or password.";
    }
    if (code === "auth/too-many-requests") {
        return "Too many failed attempts. Please wait a few minutes and try again.";
    }
    if (code === "auth/invalid-email") {
        return "Please enter a valid email address.";
    }
    return err && err.message ? err.message : "Something went wrong. Please try again.";
}

window.TAA_AUTH = {
    dashboardFor,
    friendlyError,

    // Returns { uid, ...profileFields } on success, throws on failure.
    async login(email, password) {
        await waitForFirebase();
        const cred = await signInWithEmailAndPassword(window.auth, email, password);
        const snap = await getDoc(doc(window.db, "users", cred.user.uid));
        if (!snap.exists()) {
            await signOut(window.auth);
            throw new Error("No profile is linked to this account. Please contact the TAA office.");
        }
        return { uid: cred.user.uid, ...snap.data() };
    },

    async logout() {
        if (window.auth) await signOut(window.auth);
        window.location.href = "login.html";
    },

    async resetPassword(email) {
        await waitForFirebase();
        await sendPasswordResetEmail(window.auth, email);
    },

    // Call at the top of every protected dashboard page:
    //   TAA_AUTH.guard(["Athlete"], (profile) => { ...render page using profile... });
    // Redirects to login if not signed in, or to the correct dashboard if
    // signed in under a different role than this page is for.
    guard(allowedRoles, onReady) {
        waitForFirebase().then(() => {
            onAuthStateChanged(window.auth, async (user) => {
                if (!user) {
                    window.location.href = "login.html";
                    return;
                }
                try {
                    const snap = await getDoc(doc(window.db, "users", user.uid));
                    if (!snap.exists()) {
                        await signOut(window.auth);
                        window.location.href = "login.html";
                        return;
                    }
                    const profile = { uid: user.uid, ...snap.data() };
                    if (!allowedRoles.includes(profile.role)) {
                        window.location.href = dashboardFor(profile.role);
                        return;
                    }
                    onReady(profile);
                } catch (err) {
                    console.error("Auth guard error:", err);
                    window.location.href = "login.html";
                }
            });
        }).catch((err) => {
            alert(err.message);
            window.location.href = "login.html";
        });
    }
};
