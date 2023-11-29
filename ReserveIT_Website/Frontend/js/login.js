// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
    // Get the login form by ID
    const loginForm = document.querySelector('.form');

    // Add a submit event listener to the form
    loginForm.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the values of matrikelnr and password
        const matrikelnr = document.getElementById('login__matrikelnr').value;
        const password = document.getElementById('login__password').value;

        // Simulate a login request (replace this with your actual login logic)
        const success = Math.random() > 0.5; // Simulate success 50% of the time

        if (success) {
            // Redirect to index.html on successful login
            alert('successful login');
            window.location.href = 'index.html';
            alert('successful login');
        } else {
            // Display an alert for invalid credentials (replace this with your actual error handling)
            alert('Invalid login credentials');
        }
    });
});
