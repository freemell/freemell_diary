document.addEventListener('DOMContentLoaded', function() {
    const entryForm = document.getElementById('entryForm');
    const titleInput = document.getElementById('title');
    const contentDiv = document.getElementById('content');
    const boldButton = document.querySelector('.bold');
    const italicButton = document.querySelector('.italic');
    const underlineButton = document.querySelector('.underline');
    const entriesList = document.getElementById('entries-list');

    // Digital Clock
    function updateTime() {
        const now = new Date();
        const date = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const time = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        document.getElementById('date').innerText = date;
        document.getElementById('time').innerText = time;
    }
    setInterval(updateTime, 1000);
    updateTime();

    // Add entry
    if (entryForm) {
        entryForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const title = titleInput.value;
            const content = contentDiv.innerHTML;  // Get the HTML content from the div

            fetch('/add_entry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.status);
                titleInput.value = '';
                contentDiv.innerHTML = '';  // Clear the content div
                fetchEntries();
            });
        });
    }

    // Fetch entries
    function fetchEntries() {
        fetch('/entries')
        .then(response => response.json())
        .then(entries => {
            entriesList.innerHTML = '';
            entries.forEach(entry => {
                const entryDiv = document.createElement('div');
                entryDiv.className = 'entry';
                entryDiv.innerHTML = `
                    <h3>${entry.title}</h3>
                    <p>${entry.content}</p>
                    <p>${entry.date}</p>
                `;
                entryDiv.addEventListener('click', function() {
                    this.classList.toggle('active');
                });
                entriesList.appendChild(entryDiv);
            });
        });
    }

    if (entriesList) {
        fetchEntries();
    }

    // Toolbar buttons
    boldButton.addEventListener('click', function() {
        document.execCommand('bold');
    });

    italicButton.addEventListener('click', function() {
        document.execCommand('italic');
    });

    underlineButton.addEventListener('click', function() {
        document.execCommand('underline');
    });

    // Prevent default behavior in the contenteditable div (like new lines)
    contentDiv.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });
});
