const searchInput = document.getElementById('searchInput');
const clearButton = document.getElementById('clearButton');
const items = document.querySelectorAll('#itemsList li');

searchInput.addEventListener('input', function(e) {
    const searchText = e.target.value.toLowerCase();
    items.forEach(item => {
        const itemText = item.textContent.toLowerCase();
        if (itemText.includes(searchText)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
});

clearButton.addEventListener('click', function() {
    searchInput.value = '';
    items.forEach(item => {
        item.classList.remove('hidden');
    });
    searchInput.focus();
});
