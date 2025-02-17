document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const contentDiv = document.getElementById('content');
    const exportButton = document.createElement('button'); // 创建导出按钮

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

    // 加载链接数据
    function loadLinks() {
        fetch('data/links.json') // 使用 fetch 加载 JSON 文件
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
                // 可以添加错误处理逻辑，例如显示错误信息
            });
    }

    // 添加导出按钮到 header
    const header = document.querySelector('header');

    exportButton.textContent = '导出数据';
    exportButton.classList.add('export-button'); // 添加 class 方便样式控制
    header.appendChild(exportButton);

    // 导出数据功能
    exportButton.addEventListener('click', () => {
        fetch('data/links.json') // 重新获取数据，确保导出最新数据
            .then(response => response.json())
            .then(data => {
                const jsonData = JSON.stringify(data, null, 2); // 格式化 JSON
                const blob = new Blob([jsonData], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'links.json'; // 下载的文件名
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url); // 释放 URL
            })
            .catch(error => {
                console.error('导出数据失败:', error);
            });
    });

    loadTheme();
    loadLinks();
    setIcon(); // 页面加载时设置初始图标
}); 