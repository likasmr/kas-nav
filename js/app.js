document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const contentDiv = document.getElementById('content');
    let linksData = {}; // 用于存储链接数据的全局变量

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
        } else {
            // 检查系统是否为深色模式
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.body.classList.add('dark-mode');
            }
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
    async function loadLinks() {
        try {
            const response = await fetch('data/links.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            linksData = await response.json();
            renderLinks();
        } catch (error) {
            console.error("Error loading links:", error);
            // 可以显示一个错误提示给用户
        }
    }

    // 渲染链接
    function renderLinks() {
        contentDiv.innerHTML = ''; // 清空现有内容

        linksData.categories.forEach(categoryData => {
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('category');

            const title = document.createElement('h2');
            title.classList.add('category-title');
            title.textContent = categoryData.name;
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
    }

    // 添加链接 (临时实现, 之后会与后端同步)
    function addLink(categoryName, linkName, linkUrl) {
        const category = linksData.categories.find(cat => cat.name === categoryName);
        if (category) {
            category.links.push({ name: linkName, url: linkUrl, icon: "" });
            renderLinks(); // 重新渲染
            // TODO: 将更改同步到后端 (例如, 发送请求到 Cloudflare Workers)
        } else {
            console.error("Category not found:", categoryName);
        }
    }

    // 示例: 添加一个链接
    // addLink("常用网站", "Example", "https://www.example.com");

    loadTheme();
    loadLinks();
    setIcon(); // 页面加载时设置初始图标
}); 