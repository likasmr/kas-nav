class DataManager {
    constructor() {
        this.settingsBtn = document.getElementById('settingsBtn');
        this.settingsModal = document.getElementById('settingsModal');
        this.exportBtn = document.getElementById('exportBtn');
        this.importInput = document.getElementById('importInput');
        this.backupStatus = document.getElementById('backupStatus');
        
        this.initEventListeners();
        this.startAutoBackup();
    }

    initEventListeners() {
        // 开关设置面板
        this.settingsBtn.addEventListener('click', () => {
            this.settingsModal.style.display = 'block';
        });

        // 关闭模态框
        this.settingsModal.addEventListener('click', (e) => {
            if (e.target === this.settingsModal) {
                this.settingsModal.style.display = 'none';
            }
        });

        // 导出数据
        this.exportBtn.addEventListener('click', () => {
            this.exportData();
        });

        // 导入数据
        this.importInput.addEventListener('change', (e) => {
            this.importData(e.target.files[0]);
        });
    }

    // 导出数据为JSON
    exportData() {
        const data = localStorage.getItem('linksData') || '[]';
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `navbackup_${new Date().toISOString().slice(0,10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showStatus('导出成功');
    }

    // 导入JSON数据
    importData(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                localStorage.setItem('linksData', JSON.stringify(data));
                this.showStatus('导入成功，即将刷新...');
                setTimeout(() => location.reload(), 1500);
            } catch (error) {
                this.showStatus('文件格式错误', true);
            }
        };
        reader.readAsText(file);
    }

    // 自动备份
    startAutoBackup() {
        setInterval(() => {
            const data = JSON.stringify(linksData); // 假设linksData是全局变量
            localStorage.setItem('linksData', data);
            this.updateBackupTime();
        }, 300000); // 每5分钟备份
    }

    // 更新备份状态
    updateBackupTime() {
        const time = new Date().toLocaleTimeString();
        this.backupStatus.querySelector('span').textContent = `最后备份: ${time}`;
    }

    showStatus(text, isError = false) {
        const status = document.createElement('div');
        status.className = `status-message ${isError ? 'error' : ''}`;
        status.textContent = text;
        
        document.body.appendChild(status);
        setTimeout(() => status.remove(), 2000);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new DataManager();
}); 