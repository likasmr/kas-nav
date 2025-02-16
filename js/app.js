document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const searchBar = document.getElementById('searchBar');
    const categoriesContainer = document.getElementById('categories');

    // 初始化主题
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });

    // 示例分类数据
    const categories = [
        {
            name: '社交',
            links: [
                { name: '微信', url: 'https://weixin.qq.com/' },
                { name: '微博', url: 'https://weibo.com/' }
            ]
        },
        {
            name: '学习',
            links: [
                { name: '知乎', url: 'https://www.zhihu.com/' },
                { name: 'Coursera', url: 'https://www.coursera.org/' }
            ]
        },
        {
            name: '娱乐',
            links: [
                { name: 'B站', url: 'https://www.bilibili.com/' },
                { name: 'Netflix', url: 'https://www.netflix.com/' }
            ]
        }
    ];

    // 渲染分类
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');

        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = category.name;
        categoryDiv.appendChild(categoryTitle);

        const linkList = document.createElement('ul');
        category.links.forEach(link => {
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.href = link.url;
            anchor.textContent = link.name;
            anchor.target = '_blank';
            listItem.appendChild(anchor);
            linkList.appendChild(listItem);
        });

        categoryDiv.appendChild(linkList);
        categoriesContainer.appendChild(categoryDiv);
    });

    // 搜索功能
    searchBar.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchBar.value.trim();
            if (query) {
                // 默认使用百度搜索
                window.open(`https://www.baidu.com/s?wd=${encodeURIComponent(query)}`, '_blank');
            }
        }
    });
}); 