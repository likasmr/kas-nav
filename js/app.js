document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const exportBtn = document.getElementById('exportBtn'); // 获取导出按钮
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
        // 更新图标
        setIcon();
        // 保存主题到 localStorage
        const currentTheme = document.body.classList.contains('dark-mode') ? 'dark-mode' : '';
        localStorage.setItem('theme', currentTheme);
    });

    // 导出数据功能
    exportBtn.addEventListener('click', () => {
        const linksData = getLinksData();
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(linksData, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "links_data.json");
        document.body.appendChild(downloadAnchorNode); // 需要添加到DOM才能触发点击
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    });

    // 获取当前链接数据
    function getLinksData() {
        const categories = document.querySelectorAll('.category');
        const data = [];

        categories.forEach(category => {
            const categoryTitle = category.querySelector('.category-title').textContent;
            const links = [];
            const linkItems = category.querySelectorAll('.link-item');

            linkItems.forEach(link => {
                links.push({
                    name: link.textContent,
                    url: link.href,
                    icon: link.querySelector('img') ? link.querySelector('img').src : ""
                });
            });

            data.push({
                category: categoryTitle,
                links: links
            });
        });

        return data;
    }

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
    }

    loadTheme();
    loadLinks();
    setIcon(); // 页面加载时设置初始图标
}); 