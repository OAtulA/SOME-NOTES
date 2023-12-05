document.getElementById('signupForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, username, password })
        });

        if (response.ok) {
            // Signup successful, redirect to login page or perform other actions
            window.location.href = 'login.html';
        } else {
            // Handle signup failure
            const data = await response.json();
            alert(data.message); // Show error message to the user
        }
    } 
    catch (error) {
        console.log('Error:', error);
        // Handle network or other errors
        alert('Failed to signup. Please try again later.');
    }
});

document.getElementById('signupForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, username, password })
        });

        if (response.status ==201) {
            // Signup successful, save login info to localStorage and redirect to login page
            localStorage.setItem('loginInfo', JSON.stringify({ email, password }));
            window.location.href = 'login.html';
        } else {
            // Handle signup failure
            const data = await response.json();
            alert(data.message); // Show error message to the user
        }
    } catch (error) {
        console.log('Error:', error);
        // Handle network or other errors
        alert('Failed to signup. Please try again later.');
    }
});
