// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    // 加载链接数据
    fetch('../data/links.json')
        .then(response => response.json())
        .then(data => renderLinks(data))
        .catch(error => console.error('Error loading links:', error));

    // 主题切换事件
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
});

function renderLinks(linksData) {
    const container = document.getElementById('categories-container');
    
    linksData.categories.forEach(category => {
        const categoryHTML = `
            <section class="category">
                <h2>${category.name}</h2>
                <div class="links-grid">
                    ${category.links.map(link => `
                        <a href="${link.url}" class="link-card" target="_blank">
                            ${link.icon ? `<img src="${link.icon}" alt="${link.name}图标" class="link-icon">` : ''}
                            <span>${link.name}</span>
                        </a>
                    `).join('')}
                </div>
            </section>
        `;
        container.insertAdjacentHTML('beforeend', categoryHTML);
    });
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
} 