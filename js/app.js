document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const contentDiv = document.getElementById('content');

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

    // 从 JSON 文件加载链接数据
    function loadLinks() {
        fetch('data/links.json')
            .then(response => response.json())
            .then(linksData => {
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
            })
            .catch(error => {
                console.error('加载链接数据失败:', error);
                contentDiv.innerHTML = '<p>加载链接数据失败，请检查 data/links.json 文件。</p>';
            });
    }

    loadTheme();
    loadLinks();
    setIcon(); // 页面加载时设置初始图标
}); 