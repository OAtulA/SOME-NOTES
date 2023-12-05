const baseURL = 'http://localhost:5000'; // Replace with your backend URL

// Function to retrieve login info from local storage
const getLoginInfo = () => {
    return JSON.parse(localStorage.getItem('loginInfo'));
};

async function fetchNotes() {
    try {
        const loginInfo = getLoginInfo();

        if (!loginInfo || !loginInfo.email || !loginInfo.password) {
            // Redirect to login page if login info is not available
            window.location.href = 'login.html';
            return;
        }

        const response = await fetch(`${baseURL}/api/notes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            auth: {
                username: loginInfo.email,
                password: loginInfo.password,
            },
        });
        console.log(response);

        if (response.ok) {
            const notes = await response.json();

            // Display the notes headings on the homepage
            const notesList = document.getElementById('notesList');
            if (notes && notes.length > 0) {
                notes.forEach(note => {
                    const noteItem = document.createElement('div');
                    const noteHeading = document.createElement('h3');
                    noteHeading.textContent = note.heading;
                    noteItem.appendChild(noteHeading);
                    notesList.appendChild(noteItem);

                    // Event listener to open note text content in a new page
                    noteHeading.addEventListener('click', function () {
                        localStorage.setItem('selectedNote', JSON.stringify(note));
                        window.open('note-content.html', '_blank');
                    });
                });
            } else {
                notesList.innerHTML = 'No notes found';
            }
        } else {
            throw new Error('Failed to fetch notes');
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle network or other errors
        alert('Failed to fetch notes. Please try again later.');
    }
}

// Fetch notes when the homepage loads
fetchNotes();

document.getElementById('newNoteBtn').addEventListener('click', function () {
    // Redirect to the note creation page
    window.location.href = 'note.html';
});

document.getElementById('logoutBtn').addEventListener('click', function () {
    // Perform logout action, for example, clearing session, and redirecting to login page
    // You may need backend support to clear the session/token
    window.location.href = 'login.html';
});
