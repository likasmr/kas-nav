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
        fetch('data/links.json') // 使用 fetch API 获取 JSON 文件
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

    // 导出 JSON 数据
    function exportLinks() {
        fetch('data/links.json')
            .then(response => response.json())
            .then(data => {
                const jsonString = JSON.stringify(data, null, 2); // 格式化 JSON 字符串
                const blob = new Blob([jsonString], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const downloadLink = document.createElement('a');
                downloadLink.href = url;
                downloadLink.download = 'links.json'; // 下载的文件名
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                URL.revokeObjectURL(url); // 释放 URL 对象
            })
            .catch(error => {
                console.error('导出 JSON 数据失败:', error);
                alert('导出 JSON 数据失败，请重试。');
            });
    }

    // 初始化导出按钮
    function initExportButton() {
        exportButton.textContent = '导出数据';
        exportButton.classList.add('export-button'); // 添加 CSS 类
        exportButton.addEventListener('click', exportLinks);
        document.querySelector('header').appendChild(exportButton); // 将按钮添加到 header
    }

    loadTheme();
    loadLinks();
    setIcon();
    initExportButton(); // 初始化导出按钮
}); 