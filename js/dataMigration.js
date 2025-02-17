function exportData() {
  // 获取当前的链接数据
  const linksData = JSON.parse(localStorage.getItem('linksData') || '[]');

  // 将数据转换为JSON字符串
  const dataStr = JSON.stringify(linksData, null, 2);

  // 创建一个Blob对象,并设置其MIME类型为JSON
  const blob = new Blob([dataStr], { type: 'application/json' });

  // 创建一个链接元素
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'linksData.json';

  // 模拟点击链接以触发下载
  link.click();
} 