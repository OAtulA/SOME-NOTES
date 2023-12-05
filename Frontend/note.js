document.getElementById('noteForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const noteHeading = document.getElementById('noteHeading').value;
    const noteContent = document.getElementById('noteContent').value;

    try {
        const response = await fetch('http://localhost:5000/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ heading: noteHeading, text: noteContent })
        });

        if (response.ok) {
            // Note creation successful, redirect to homepage or perform other actions
            window.location.href = 'homepage.html';
        } else {
            // Handle note creation failure
            const data = await response.json();
            alert(data.message); // Show error message to the user
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle network or other errors
        alert('Failed to create/update note. Please try again later.');
    }
});

document.getElementById('backBtn').addEventListener('click', function () {
    // Redirect back to the homepage
    window.location.href = 'homepage.html';
});
