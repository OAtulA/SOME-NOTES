document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        console.log(resposnse);
        if (response.ok) {
            // Login successful, save login info to localStorage and redirect to homepage
            localStorage.setItem('loginInfo', JSON.stringify({ email, password }));
            window.location.href = 'homepage.html';
        } else {
            // Handle login failure
            const data = await response.json();
            alert(data.message); // Show error message to the user
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle network or other errors
        alert('Failed to login. Please try again later.');
    }
});
