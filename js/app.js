// 初始化加载链接数据
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('../data/links.json');
        const data = await response.json();
        renderCategories(data.categories);
    } catch (error) {
        console.error('加载数据失败:', error);
    }
});

function renderCategories(categories) {
    const container = document.getElementById('categoriesContainer');
    
    categories.forEach(category => {
        const categoryHTML = `
            <div class="category-card">
                <h2>${category.name}</h2>
                <div class="links">
                    ${category.links.map(link => `
                        <a href="${link.url}" target="_blank" class="link-item">
                            ${link.name}
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', categoryHTML);
    });
} 