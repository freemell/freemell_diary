document.addEventListener('DOMContentLoaded', function() {
    const entryForm = document.getElementById('entryForm');
    const titleInput = document.getElementById('title');
    const contentTextarea = document.getElementById('content');
    const boldButton = document.querySelector('.bold');
    const italicButton = document.querySelector('.italic');
    const underlineButton = document.querySelector('.underline');

    // Initialize FullCalendar
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }
    });
    calendar.render();

    // Add entry
    entryForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = titleInput.value;
        const content = contentTextarea.value;

        fetch('/api/add_entry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.status);
        });
    });

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
});
