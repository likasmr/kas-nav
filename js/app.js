// 初始化主题
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// 切换主题
document.getElementById('themeToggle').addEventListener('change', function() {
    const newTheme = this.checked ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// 动态生成分类区块
function generateCategories() {
    const mockData = [
        { name: '常用工具', links: ['Github', 'MDN Docs', 'CodePen'] },
        { name: '动漫资源', links: ['Bangumi', '哔哩哔哩', 'Pixiv'] },
        { name: '开发社区', links: ['V2EX', '掘金', 'StackOverflow'] }
    ];

    const container = document.querySelector('.grid-container');
    container.innerHTML = mockData.map(cat => `
        <div class="category-card">
            <h3 style="color: var(--primary-color)">${cat.name}</h3>
            <ul class="link-list">
                ${cat.links.map(link => `
                    <li>
                        <a href="#" class="neon-link">
                            <span class="mdi mdi-link-variant"></span>
                            ${link}
                        </a>
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    generateCategories();
    
    // 快捷键支持
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            document.querySelector('.neon-input').focus();
        }
    });
}); 