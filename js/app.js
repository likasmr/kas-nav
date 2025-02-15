// 主题切换功能
const themeToggle = document.createElement('div');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = `
  <label>
    <input type="checkbox" id="theme-switch">
    <span class="slider"></span>
  </label>
`;
document.body.appendChild(themeToggle);

const themeSwitch = document.getElementById('theme-switch');
themeSwitch.addEventListener('change', function() {
  document.body.setAttribute('data-theme', this.checked ? 'dark' : 'light');
  localStorage.setItem('theme', this.checked ? 'dark' : 'light');
});

// 初始化主题
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', savedTheme);
themeSwitch.checked = savedTheme === 'dark'; 