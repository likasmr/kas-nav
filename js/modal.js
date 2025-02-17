// 获取模态框和按钮元素
const addLinkModal = document.getElementById('addLinkModal');
const addLinkBtn = document.getElementById('addLinkBtn');
const closeButton = document.querySelector('.close-button');
const addLinkForm = document.getElementById('addLinkForm');
const categorySelect = document.getElementById('categorySelect');

// 打开模态框
addLinkBtn.addEventListener('click', () => {
    addLinkModal.style.display = 'block';
    // 动态加载分类选项
    loadCategories();
});

// 关闭模态框
closeButton.addEventListener('click', () => {
    addLinkModal.style.display = 'none';
});

// 点击模态框外部时关闭
window.addEventListener('click', (event) => {
    if (event.target === addLinkModal) {
        addLinkModal.style.display = 'none';
    }
});

// 加载分类选项
function loadCategories() {
    categorySelect.innerHTML = ''; // 清空现有选项
    linksData.categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}

// 处理表单提交
addLinkForm.addEventListener('submit', (event) => {
    event.preventDefault(); // 阻止默认提交

    const categoryName = categorySelect.value;
    const linkName = document.getElementById('linkName').value;
    const linkUrl = document.getElementById('linkUrl').value;

    addLink(categoryName, linkName, linkUrl); // 调用 app.js 中的 addLink 函数

    // 清空表单并关闭模态框
    addLinkForm.reset();
    addLinkModal.style.display = 'none';
}); 