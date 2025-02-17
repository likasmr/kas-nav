async function backupToGithub() {
  const accessToken = localStorage.getItem('githubAccessToken');
  if (!accessToken) {
    console.log('未提供GitHub访问令牌,跳过备份');
    return;
  }

  const linksData = JSON.parse(localStorage.getItem('linksData') || '[]');
  const dataStr = JSON.stringify(linksData, null, 2);

  const response = await fetch('https://api.github.com/repos/:owner/:repo/contents/linksData.json', {
    method: 'PUT',
    headers: {
      'Authorization': `token ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'Backup links data',
      content: btoa(dataStr)
    })
  });

  if (response.ok) {
    console.log('数据已备份到GitHub');
  } else {
    console.error('备份到GitHub失败:', response.statusText);
  }
} 