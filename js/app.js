document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const contentDiv = document.getElementById('content');
    const addLinkBtn = document.createElement('button'); // 添加链接按钮

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

    // 从 JSON 文件加载数据
    async function loadLinks() {
        try {
            const response = await fetch('data/links.json');
            const linksData = await response.json();
            renderLinks(linksData);
          } catch (error) {
            console.error('Error loading links:', error);
            contentDiv.innerHTML = '<p>加载链接失败，请稍后重试。</p>';
          }
    }

    // 渲染链接
    function renderLinks(linksData) {
        contentDiv.innerHTML = ''; // 清空现有内容
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

    // 添加"添加链接"按钮
    addLinkBtn.textContent = '添加链接';
    addLinkBtn.classList.add('add-link-btn');
    document.querySelector('.container').appendChild(addLinkBtn); // 添加到 container

    // 模态框 (Modal) - 用于添加/编辑链接
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>添加链接</h2>
            <form id="addLinkForm">
                <label for="category">分类:</label>
                <input type="text" id="category" name="category" required>

                <label for="linkName">名称:</label>
                <input type="text" id="linkName" name="name" required>

                <label for="linkUrl">URL:</label>
                <input type="url" id="linkUrl" name="url" required>

                <label for="linkIcon">图标 URL:</label>
                <input type="text" id="linkIcon" name="icon">

                <button type="submit">添加</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    // 显示模态框
    addLinkBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // 关闭模态框
    modal.querySelector('.close-btn').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // 提交表单 (模拟)
    modal.querySelector('#addLinkForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newLink = Object.fromEntries(formData.entries());

        // 这里只是模拟添加到 linksData, 实际上需要发送到后端
        console.log('New link:', newLink);

        // 关闭模态框
        modal.style.display = 'none';

        // 清空表单
        event.target.reset();
    });

    loadTheme();
    loadLinks();
    setIcon(); // 页面加载时设置初始图标
}); 