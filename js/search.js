// 搜索引擎切换
document.querySelectorAll('.engine-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelector('.engine-btn.active').classList.remove('active');
        this.classList.add('active');
    });
});

// 搜索处理
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (!query) return;
        
        const activeEngine = document.querySelector('.engine-btn.active').dataset.engine;
        window.open(`${activeEngine}${encodeURIComponent(query)}`, '_self');
    }
}); 