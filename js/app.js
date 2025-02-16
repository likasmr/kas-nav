// 链接加载与渲染
async function loadLinks() {
    try {
        const response = await fetch('data/links.json');
        const data = await response.json();
        renderLinks(data.categories);
    } catch (error) {
        console.error('加载链接失败:', error);
    }
}

function renderLinks(categories) {
    const container = document.getElementById('links-container');
    container.innerHTML = categories.map(category => `
        <section class="link-card">
            <h2>${category.name}</h2>
            <ul class="link-list">
                ${category.links.map(link => `
                    <li>
                        <a href="${link.url}" target="_blank">${link.name}</a>
                    </li>
                `).join('')}
            </ul>
        </section>
    `).join('');
}

// 初始化加载
document.addEventListener('DOMContentLoaded', loadLinks); 