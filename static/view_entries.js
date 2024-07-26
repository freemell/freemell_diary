document.addEventListener('DOMContentLoaded', function() {
    const entriesDiv = document.getElementById('entries');

    function fetchEntries() {
        fetch('/api/get_entries')
        .then(response => response.json())
        .then(entries => {
            entriesDiv.innerHTML = '';
            entries.forEach(entry => {
                const entryDiv = document.createElement('div');
                entryDiv.className = 'entry';
                entryDiv.innerHTML = `
                    <h2>${entry.title}</h2>
                    <p>${entry.content}</p>
                    <p>${entry.date}</p>
                    <a href="/update_entry/${entry.id}">Edit</a>
                `;
                entriesDiv.appendChild(entryDiv);
            });
        });
    }

    fetchEntries();
});
