// navbar.js - Master Navigation Component for TAA Portal

const navbarHTML = `
    <style>
        /* --- Master Navbar Styles --- */
        .navbar { background: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.15); position: sticky; top: 0; z-index: 9999; padding: 5px 0; font-family: 'Open Sans', sans-serif; }
        .nav-container { max-width: 1300px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 0 20px; }
        
        /* Logo Styles */
        .nav-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
        .nav-logo img { width: 55px; height: 55px; object-fit: contain; }
        .logo-text { display: flex; flex-direction: column; }
        .main-title { color: #0056b3; font-weight: 800; font-size: 1.1em; line-height: 1; font-family: 'Montserrat', sans-serif; }
        .sub-title { color: #64748b; font-weight: 600; font-size: 0.75em; letter-spacing: 1px; font-family: 'Montserrat', sans-serif; }
        
        /* Main Menu */
        .nav-menu { display: flex; list-style: none; gap: 15px; align-items: center; margin: 0; padding: 0; }
        .nav-menu li { position: relative; } 
        .nav-menu a { 
            text-decoration: none; color: #1a1a1a; font-weight: 700; font-size: 0.82em; 
            transition: 0.3s; padding: 15px 5px; font-family: 'Montserrat', sans-serif; 
            text-transform: uppercase; display: block; 
            white-space: nowrap; /* THIS FIXES THE TWO-LINE GLITCH */
        }
        .nav-menu a:hover { color: #FF8C00; }
        
        /* Standard Dropdowns */
        .dropdown-content { display: none; position: absolute; background-color: #ffffff; min-width: 220px; box-shadow: 0 8px 16px rgba(0,0,0,0.1); z-index: 1000; top: 100%; left: 0; border-top: 3px solid #FF8C00; }
        .dropdown-content a { color: #333; padding: 12px 16px; text-transform: none; font-size: 0.85em; border-bottom: 1px solid #f1f5f9; white-space: normal; }
        .dropdown:hover .dropdown-content { display: block; }
        .dropdown-content a:hover { background-color: #f8fafc; color: #0056b3; }

        /* ORS Portal Button & Dropdown */
        .ors-dropdown { position: relative; display: inline-block; }
        .ors-btn { background: #0056b3 !important; color: white !important; padding: 10px 22px !important; border-radius: 50px; margin-left: 10px; box-shadow: 0 4px 12px rgba(0, 86, 179, 0.2); }
        .ors-btn:hover { background: #004494 !important; }
        .ors-dropdown-content {
            display: none; position: absolute; background-color: #ffffff;
            min-width: 220px; box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            z-index: 1000; right: 0; top: 100%;
            border-top: 3px solid #FF8C00; border-radius: 0 0 8px 8px; overflow: hidden;
        }
        .ors-dropdown:hover .ors-dropdown-content { display: block; }
        .ors-dropdown-content a {
            color: #333 !important; padding: 14px 20px !important; text-decoration: none;
            display: block !important; text-transform: none !important; font-size: 0.85em !important;
            border-bottom: 1px solid #f1f5f9; font-weight: 700 !important; transition: 0.2s;
            white-space: normal !important;
        }
        .ors-dropdown-content a:hover { background-color: #f8fafc; color: #0056b3 !important; padding-left: 24px !important; }
        .ors-dropdown-header { 
            padding: 10px 20px; background: #f1f5f9; font-size: 0.7em; 
            font-weight: 800; color: #64748b; text-transform: uppercase; 
            letter-spacing: 1px; border-bottom: 1px solid #e2e8f0;
        }

        @media (max-width: 768px) { .nav-menu { display: none; } }
    </style>

    <nav class="navbar">
        <div class="nav-container">
            <a href="index.html" class="nav-logo">
                <img src="LOGO.jfif" alt="TAA Logo">
                <div class="logo-text">
                    <span class="main-title">TELANGANA ATHLETICS</span>
                    <span class="sub-title">ASSOCIATION</span>
                </div>
            </a>
            <ul class="nav-menu">
                <li><a href="index.html">HOME</a></li>
                <li class="dropdown">
                    <a href="#">ABOUT TAA ▾</a>
                    <div class="dropdown-content">
                        <a href="office-bearers.html">Executive Body</a>
                        <a href="member-associations.html">Member Associations</a>
                        <a href="about.html">History & Constitution</a>
                        <a href="contact.html">Contact Us</a>
                    </div>
                </li>
                <li><a href="circulars.html">CIRCULARS</a></li>
                <li><a href="events.html">EVENTS</a></li>
                <li><a href="results.html">RESULTS</a></li>
                
                <li class="dropdown">
                    <a href="#">MEDIA ▾</a>
                    <div class="dropdown-content">
                        <a href="photo-gallery.html">Photo Gallery</a>
                        <a href="videos.html">Videos</a>
                        <a href="press-releases.html">Press Releases</a>
                        <a href="press-articles.html">Press Articles</a>
                    </div>
                </li>
                
                <li><a href="rankings.html">RANKINGS</a></li>
                <li><a href="profiles.html">PROFILES</a></li>
                <li><a href="education.html">EDUCATION</a></li>
                
                <li class="ors-dropdown">
                    <a href="login.html" class="ors-btn">ORS PORTAL ▾</a>
                    <div class="ors-dropdown-content">
                        <a href="login.html">🔑 Secure Login</a>
                        <div class="ors-dropdown-header">New Registrations</div>
                        <a href="athlete-registration.html">🏃 Athlete Registration</a>
                        <a href="coach-registration.html">📋 Coach Registration</a>
                        <a href="official-registration.html">⏱️ Official Registration</a>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
`;

// Inject the HTML into the page when it loads
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('navbar-container');
    if (container) {
        container.innerHTML = navbarHTML;
    } else {
        console.error("Navbar container not found! Make sure you added <div id='navbar-container'></div> to your HTML.");
    }
});