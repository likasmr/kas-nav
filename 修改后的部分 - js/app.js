import dataManager from './data-manager.js';

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const contentDiv = document.getElementById('content');
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const closeBtn = document.querySelector('.close-btn');

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

    // 打开设置模态窗口
    settingsBtn.addEventListener('click', () => {
        settingsModal.style.display = 'block';
    });

    // 关闭设置模态窗口
    closeBtn.addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });

    // 点击模态窗口外部关闭
    window.addEventListener('click', (event) => {
        if (event.target == settingsModal) {
            settingsModal.style.display = 'none';
        }
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
    }

    // 添加数据管理相关的事件监听
    const exportBtn = document.getElementById('exportBtn');
    const importFile = document.getElementById('importFile');

    exportBtn.addEventListener('click', () => {
        dataManager.exportData();
        showToast('数据导出成功');
        settingsModal.style.display = 'none';
    });

    importFile.addEventListener('change', async (e) => {
        if (e.target.files.length > 0) {
            const success = await dataManager.importData(e.target.files[0]);
            if (success) {
                showToast('数据导入成功');
                settingsModal.style.display = 'none';
                location.reload(); // 刷新页面以显示新数据
            } else {
                showToast('数据导入失败', 'error');
            }
        }
    });

    // 添加提示toast
    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toastContainer.removeChild(toast);
            }, 300);
        }, 3000);
    }

    loadTheme();
    loadLinks();
    setIcon(); // 页面加载时设置初始图标
}); 