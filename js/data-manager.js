class DataManager {
    constructor() {
        this.defaultSettings = {
            theme: 'auto',
            layout: 'grid',
            searchEngine: 'google',
            fontSize: 'medium'
        };
    }

    // 导出数据为JSON文件
    exportData() {
        const exportData = {
            links: this.getAllLinks(),
            settings: this.getSettings(),
            timestamp: new Date().toISOString()
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = `nav-backup-${new Date().toISOString().slice(0,10)}.json`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
    }

    // 导入JSON数据
    async importData(file) {
        try {
            const text = await file.text();
            const data = JSON.parse(text);
            
            // 验证数据格式
            if (!this.validateImportData(data)) {
                throw new Error('无效的数据格式');
            }

            // 保存数据
            localStorage.setItem('links', JSON.stringify(data.links));
            localStorage.setItem('settings', JSON.stringify(data.settings));
            
            return true;
        } catch (error) {
            console.error('导入失败:', error);
            return false;
        }
    }

    // 获取所有链接
    getAllLinks() {
        const linksStr = localStorage.getItem('links');
        return linksStr ? JSON.parse(linksStr) : [];
    }

    // 获取设置
    getSettings() {
        const settingsStr = localStorage.getItem('settings');
        return settingsStr ? JSON.parse(settingsStr) : this.defaultSettings;
    }

    // 保存设置
    saveSettings(settings) {
        localStorage.setItem('settings', JSON.stringify({
            ...this.getSettings(),
            ...settings
        }));
    }

    // 验证导入的数据格式
    validateImportData(data) {
        return data 
            && Array.isArray(data.links) 
            && typeof data.settings === 'object'
            && data.timestamp;
    }
}

// 导出实例
const dataManager = new DataManager();
export default dataManager; 