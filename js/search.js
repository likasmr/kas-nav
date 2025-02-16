document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = encodeURIComponent(e.target.value.trim());
        const engine = document.getElementById('engineSelect').value;
        if (query) {
            window.open(engine + query, '_self');
        }
    }
}); 