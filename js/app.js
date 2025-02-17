document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const contentDiv = document.getElementById('content');
    const exportDataBtn = document.getElementById('exportData');

    // 设置初始图标
    function setIcon() {
        const icon = document.createElement('i');
        icon.classList.add('fas'); // 使用 Font Awesome 图标库
        icon.classList.add(document.body.classList.contains('dark-mode') ? 'fa-sun' : 'fa-moon');
        themeToggle.innerHTML = ''; // 清空按钮内容
        themeToggle.appendChild(icon);
    }

    // 从 localStorage 加载主题, 如果没有, 则检测系统主题
    function loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.classList.add(savedTheme);
        }
    }

    // 切换主题
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // 可以在这里保存用户的主题偏好到 localStorage

        // 更新图标
        setIcon();
        // 保存主题到 localStorage
        const currentTheme = document.body.classList.contains('dark-mode') ? 'dark-mode' : '';
        localStorage.setItem('theme', currentTheme);
    });

    // 模拟从 JSON 加载数据
    function loadLinks() {
        const linksData = [
            {
                category: "常用网站",
                links: [
                    { name: "Google", url: "https://www.google.com", icon: "" },
                    { name: "GitHub", url: "https://github.com", icon: "" },
                    // 更多链接...
                ]
            },
            {
                category: "学习资源",
                links: [
                    { name: "MDN Web Docs", url: "https://developer.mozilla.org", icon: "" },
                    { name: "Stack Overflow", url: "https://stackoverflow.com", icon: "" },
                    // 更多链接...
                ]
            }
            // 更多分类...
        ];

        linksData.forEach(categoryData => {
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('category');

            const title = document.createElement('h2');
            title.classList.add('category-title');
            title.textContent = categoryData.category;
            categoryDiv.appendChild(title);

            const linksGrid = document.createElement('div');
            linksGrid.classList.add('links-grid');

            categoryData.links.forEach(link => {
                const linkItem = document.createElement('a');
                linkItem.classList.add('link-item');
                linkItem.href = link.url;
                linkItem.textContent = link.name;
                // 如果有图标，可以在这里添加 <img> 标签
                linksGrid.appendChild(linkItem);
            });

            categoryDiv.appendChild(linksGrid);
            contentDiv.appendChild(categoryDiv);
        });

        return linksData;
    }

    // 导出数据为 JSON 文件
    function exportData() {
        const linksData = loadLinks();
        const jsonData = JSON.stringify(linksData, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'links-data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    exportDataBtn.addEventListener('click', exportData);

    loadTheme();
    const initialLinksData = loadLinks();
    loadLinks(initialLinksData);
    setIcon(); // 页面加载时设置初始图标
}); 