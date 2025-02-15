// 初始化数据
const sampleData = {
    categories: [
        {
            name: "开发工具",
            links: [
                { name: "GitHub", url: "https://github.com", icon: "fab fa-github" },
                { name: "CodePen", url: "https://codepen.io", icon: "fab fa-codepen" }
            ]
        },
        {
            name: "设计资源",
            links: [
                { name: "Dribbble", url: "https://dribbble.com", icon: "fab fa-dribbble" },
                { name: "Figma", url: "https://figma.com", icon: "fab fa-figma" }
            ]
        }
    ]
};

// 初始化页面
function initApp() {
    renderCategories();
    setupEventListeners();
    loadTheme();
}

// 渲染分类
function renderCategories() {
    const container = document.getElementById('categories');
    container.innerHTML = sampleData.categories.map(category => `
        <div class="category">
            <h2>${category.name}</h2>
            <div class="links">
                ${category.links.map(link => `
                    <a href="${link.url}" class="link-item" target="_blank">
                        <i class="${link.icon}"></i>
                        <span>${link.name}</span>
                    </a>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// 事件监听
function setupEventListeners() {
    // 主题切换
    document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);
    
    // 搜索引擎切换
    document.querySelectorAll('.engine-switch i').forEach(icon => {
        icon.addEventListener('click', () => switchSearchEngine(icon.dataset.engine));
    });
    
    // 搜索建议
    document.getElementById('searchInput').addEventListener('input', handleSearchInput);
}

// 主题功能
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// 搜索功能
function switchSearchEngine(engine) {
    const form = document.getElementById('searchForm');
    form.action = engine === 'google' 
        ? 'https://www.google.com/search' 
        : 'https://www.bing.com/search';
        
    document.querySelectorAll('.engine-switch i').forEach(icon => {
        icon.classList.toggle('active', icon.dataset.engine === engine);
    });
}

function handleSearchInput(e) {
    // 后续实现搜索建议
}

// 启动应用
document.addEventListener('DOMContentLoaded', initApp); 