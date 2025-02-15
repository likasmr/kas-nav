// 初始化示例数据
document.addEventListener('DOMContentLoaded', () => {
    const categories = [
        {
            name: "开发工具",
            links: [
                { name: "GitHub", url: "https://github.com" },
                { name: "CodePen", url: "https://codepen.io" }
            ]
        },
        {
            name: "学习资源",
            links: [
                { name: "MDN Web Docs", url: "https://developer.mozilla.org" },
                { name: "Stack Overflow", url: "https://stackoverflow.com" }
            ]
        }
    ];

    const container = document.querySelector('.container');
    
    categories.forEach(category => {
        const categoryDiv = document.createElement('section');
        categoryDiv.className = 'category';
        categoryDiv.innerHTML = `
            <h2 class="category-title">${category.name}</h2>
            <div class="links">
                ${category.links.map(link => `
                    <a href="${link.url}" class="link" target="_blank">
                        <span class="favicon"></span>
                        ${link.name}
                    </a>
                `).join('')}
            </div>
        `;
        container.appendChild(categoryDiv);
    });
}); 