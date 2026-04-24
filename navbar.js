// navbar.js - Master Layout Component (Navbar + Footer)

const layoutHTML = `
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
            text-transform: uppercase; display: block; white-space: nowrap; 
        }
        .nav-menu a:hover { color: #FF8C00; }
        
        /* Standard Dropdowns */
        .dropdown-content { display: none; position: absolute; background-color: #ffffff; min-width: 220px; box-shadow: 0 8px 16px rgba(0,0,0,0.1); z-index: 1000; top: 100%; left: 0; border-top: 3px solid #FF8C00; }
        .dropdown-content a { color: #333; padding: 12px 16px; text-transform: none; font-size: 0.85em; border-bottom: 1px solid #f1f5f9; white-space: normal; }
        .dropdown:hover .dropdown-content { display: block; }

        /* ORS Portal Button */
        .ors-btn { background: #0056b3 !important; color: white !important; padding: 10px 22px !important; border-radius: 50px; margin-left: 10px; box-shadow: 0 4px 12px rgba(0, 86, 179, 0.2); }
        .ors-dropdown-content { display: none; position: absolute; background-color: #ffffff; min-width: 220px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); z-index: 1000; right: 0; top: 100%; border-top: 3px solid #FF8C00; border-radius: 0 0 8px 8px; overflow: hidden; }
        .ors-dropdown:hover .ors-dropdown-content { display: block; }
        .ors-dropdown-content a { color: #333 !important; padding: 14px 20px !important; text-decoration: none; display: block !important; text-transform: none !important; font-size: 0.85em !important; border-bottom: 1px solid #f1f5f9; font-weight: 700 !important; }
        .ors-dropdown-header { padding: 10px 20px; background: #f1f5f9; font-size: 0.7em; font-weight: 800; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; }

        /* --- Master Footer Styles --- */
        footer { background: #001a35; color: white; padding: 60px 20px 20px; border-top: 5px solid #FF8C00; font-family: 'Open Sans', sans-serif; margin-top: 40px;}
        .footer-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 40px; }
        .footer-col h3 { font-family: 'Montserrat'; color: #FF8C00; margin-bottom: 20px; font-size: 1.1em; text-transform: uppercase; }
        .footer-links { list-style: none; }
        .footer-links li { margin-bottom: 10px; }
        .footer-links a { color: white; text-decoration: none; opacity: 0.8; transition: 0.3s; font-size: 0.9em;}
        .footer-links a:hover { opacity: 1; color: #FF8C00; padding-left: 5px; }
        .footer-bottom { text-align: center; margin-top: 40px; opacity: 0.6; font-size: 0.85em; }

        @media (max-width: 768px) { .nav-menu { display: none; } }

        /* =========================================
           NEW: GLOBAL MOBILE RESPONSIVENESS FIXES
           ========================================= */
        /* Mobile Hamburger Button */
        .mobile-toggle { display: none; font-size: 1.8em; color: #0056b3; background: none; border: none; cursor: pointer; padding: 5px; }

        @media (max-width: 900px) {
            /* Mobile Navbar */
            .mobile-toggle { display: block; }
            .nav-menu { 
                display: none !important; /* Overrides the previous rule cleanly */
                flex-direction: column; 
                width: 100%; 
                position: absolute; 
                top: 100%; 
                left: 0; 
                background: white; 
                box-shadow: 0 10px 20px rgba(0,0,0,0.15); 
                padding: 10px 0 20px 0;
                align-items: flex-start;
                max-height: 80vh;
                overflow-y: auto;
            }
            .nav-menu.active { display: flex !important; }
            .nav-menu li { width: 100%; }
            .nav-menu a { padding: 15px 20px; border-bottom: 1px solid #f1f5f9; width: 100%; }
            .ors-btn { margin: 15px 20px; width: calc(100% - 40px); text-align: center; }
            
            /* Mobile Dropdowns */
            .dropdown-content, .ors-dropdown-content { position: static; box-shadow: none; border-top: none; background: #f8fafc; width: 100%; display: none; }
            .dropdown.active .dropdown-content, .ors-dropdown.active .ors-dropdown-content { display: block; }
            
            /* Global Layout Fixes for ALL pages */
            .hero-content { flex-direction: column; text-align: center; gap: 20px; }
            .hero { padding: 50px 15px; }
            .hero-text h1 { font-size: 1.8em; }
            .reg-banner { flex-direction: column; text-align: center; gap: 15px; }
            .grid { grid-template-columns: 1fr !important; } /* Forces forms to 1 column */
            .news-header, .gallery-header { flex-direction: column; gap: 15px; text-align: center; }
            .btn-row { flex-direction: column-reverse; gap: 15px; }
            .btn-row .btn { width: 100%; }
            .stepper-container { max-width: 100%; padding: 0 10px; }
            
            /* --- FOOTER MOBILE FIX (Smart 2-Column Grid) --- */
            .footer-grid { grid-template-columns: 1fr 1fr; text-align: left; gap: 25px; }
            .footer-col:first-child { grid-column: span 2; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; }
        }
    </style>

    <div id="nav-injection">
        <nav class="navbar">
            <div class="nav-container">
                <a href="index.html" class="nav-logo">
                    <img src="LOGO.jfif" alt="TAA Logo">
                    <div class="logo-text">
                        <span class="main-title">TELANGANA ATHLETICS</span>
                        <span class="sub-title">ASSOCIATION</span>
                    </div>
                </a>

                <button class="mobile-toggle" id="mobileMenuBtn">☰</button>

                <ul class="nav-menu" id="navMenu">
                    <li><a href="index.html">HOME</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-trigger">ABOUT TAA ▾</a> <div class="dropdown-content">
                            <a href="about.html">History & Constitution</a>
                            <a href="executive-body.html">Executive Body</a>
                            <a href="member-associations.html">Member Associations</a>
                            <a href="contact.html">Contact Us</a>
                        </div>
                    </li>
                    <li><a href="circulars.html">CIRCULARS</a></li>
                    <li><a href="events.html">EVENTS</a></li>
                    <li><a href="results.html">RESULTS</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-trigger">MEDIA ▾</a> <div class="dropdown-content">
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
                        <a href="#" class="ors-btn dropdown-trigger">ORS PORTAL ▾</a> <div class="ors-dropdown-content">
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
    </div>

    <div id="footer-injection">
        <footer>
            <div class="footer-grid">
                <div class="footer-col">
                    <h3>Telangana Athletics</h3>
                    <p>Room No : 12, First Floor, Block-2,<br>Lal Bahadur Stadium,<br>Hyderabad, 500001.</p>
                    <p style="margin-top: 15px;">📞 040 2324 0228<br>✉ telanganaathletics@gmail.com</p>
                </div>
                <div class="footer-col">
                    <h3>Quick Links</h3>
                    <ul class="footer-links">
                        <li><a href="about.html">About Association</a></li>
                        <li><a href="executive-body.html">Executive Body</a></li>
                        <li><a href="circulars.html">Circulars & Notices</a></li>
                        <li><a href="press-releases.html">Press Articles</a></li>
                        <li><a href="photo-gallery.html">Photo Gallery</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h3>Competition</h3>
                    <ul class="footer-links">
                        <li><a href="events.html">Events Calendar</a></li>
                        <li><a href="results.html">Meet Results</a></li>
                        <li><a href="rankings.html">State Rankings</a></li>
                        <li><a href="profiles.html">Athlete Profiles</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h3>ORS Portals</h3>
                    <ul class="footer-links">
                        <li><a href="login.html">Athlete Login</a></li>
                        <li><a href="coach-registration.html">Coach Portal</a></li>
                        <li><a href="official-registration.html">Technical Officials</a></li>
                        <li><a href="login.html">Register New Profile</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                &copy; 2026 Telangana Athletics Association. All Rights Reserved. Designed for Excellence.
            </div>
        </footer>
    </div>
`;

document.addEventListener('DOMContentLoaded', () => {
    // We parse the layoutHTML to find the specific injection pieces
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = layoutHTML;

    // Inject Styles
    const styleTag = tempDiv.querySelector('style');
    document.head.appendChild(styleTag);

    // Inject Navbar
    const navIn = document.getElementById('navbar-container');
    if (navIn) {
        navIn.innerHTML = tempDiv.querySelector('#nav-injection').innerHTML;
    }

    // Inject Footer
    const footIn = document.getElementById('footer-container');
    if (footIn) {
        footIn.innerHTML = tempDiv.querySelector('#footer-injection').innerHTML;
    }

    // --- NEW: Setup Mobile Navigation Interactivity ---
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileBtn && navMenu) {
        // Toggle Main Menu
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileBtn.innerText = navMenu.classList.contains('active') ? '✕' : '☰';
        });

        // Toggle Sub-menus on mobile
        const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
        dropdownTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                if (window.innerWidth <= 900) {
                    e.preventDefault(); // Prevent link from navigating immediately
                    // Toggle the parent <li> class 'active' to show the nested dropdown
                    trigger.parentElement.classList.toggle('active');
                }
            });
        });
    }
});