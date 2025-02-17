document.addEventListener('DOMContentLoaded', () => {
    // 全局设置对象
    const defaultSettings = {
        theme: 'auto', // 'auto', 'light', 'dark'
        layout: 'grid', // 'grid', 'list'
        gridSize: 'medium', // 'small', 'medium', 'large'
        searchEngine: 'google' // 'google', 'bing', 'baidu'
    };

    // 加载设置
    function loadSettings() {
        const savedSettings = localStorage.getItem('settings');
        return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
    }

    // 保存设置
    function saveSettings(settings) {
        localStorage.setItem('settings', JSON.stringify(settings));
    }

    // 导出数据
    window.exportData = function() {
        const data = {
            settings: loadSettings(),
            links: JSON.parse(localStorage.getItem('links') || '[]'),
            lastBackup: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `navigation-backup-${new Date().toISOString().slice(0,10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // 导入数据
    window.importData = function(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                if (data.settings) {
                    saveSettings(data.settings);
                }
                if (data.links) {
                    localStorage.setItem('links', JSON.stringify(data.links));
                }
                location.reload();
            } catch (err) {
                alert('导入失败：文件格式错误');
            }
        };
        reader.readAsText(file);
    };
}); 