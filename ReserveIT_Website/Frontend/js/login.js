const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const matrikelnr = document.getElementById('matrikelnr').value;
    const password = document.getElementById('password').value;

    // Simulate login request to the server
    const success = Math.random() > 0.5; // Randomly simulate login success

    if (success) {
        // Redirect to Google homepage
        window.location.href = "https://www.google.com";
    } else {
        alert('Invalid login credentials');
    }
});