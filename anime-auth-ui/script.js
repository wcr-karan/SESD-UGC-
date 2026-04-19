/* Auth Logic & Form Switching - script.js */

// Form Switching Function
function switchForm(type) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const indicator = document.querySelector('.tab-indicator');

    if (type === 'login') {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        indicator.style.left = '20%';
        indicator.style.width = '15%';
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    } else {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        indicator.style.left = '60%';
        indicator.style.width = '20%';
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
    }
}

// Handle Login
document.getElementById('login-form-element').addEventListener('submit', function(e) {
    e.preventDefault();
    const user = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;
    const btn = this.querySelector('.primary-btn');

    if (user && pass) {
        handleSuccess(btn, 'LOGIN SUCCESSFUL', 'Welcome back, ' + user);
    }
});

// Handle Sign Up
document.getElementById('signup-form-element').addEventListener('submit', function(e) {
    e.preventDefault();
    const user = document.getElementById('signup-user').value;
    const email = document.getElementById('signup-email').value;
    const pass = document.getElementById('signup-pass').value;
    const btn = this.querySelector('.primary-btn');

    if (user && email && pass) {
        handleSuccess(btn, 'ACCOUNT CREATED', 'Welcome to the club!');
    }
});

// Common Success Handler
function handleSuccess(btn, successText, message) {
    const originalText = btn.innerText;
    btn.disabled = true;
    btn.innerText = 'PROCESSING...';

    // Simulate server delay
    setTimeout(() => {
        btn.innerText = successText;
        btn.style.background = '#10b981'; // Success green
        btn.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.4)';
        
        // Save session
        localStorage.setItem('isLoggedIn', 'true');
        
        // Redirect after delay
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1200);
    }, 1000);
}

// Check if already logged in
window.onload = () => {
    if (localStorage.getItem('isLoggedIn')) {
        window.location.href = 'dashboard.html';
    }
};
