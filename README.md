# 个人导航站项目

## 🌐 项目简介
一个简洁高效的个性化导航网站，支持自定义分类、快速搜索、常用链接管理，可直接部署在Cloudflare Pages。

- 核心特点：
  - 私有化部署：数据完全自主控制
  - 轻量级认证：基于Cloudflare Workers的零服务器认证
  - 分级权限：访客/管理员双角色体系
  - 云端同步：跨设备实时同步数据
  - 数据自治：支持跨平台迁移/本地备份

## 🚀 功能规划
### 开发优先级排序（从高到低）

1. **核心基础功能**
   - [x] 基础布局：顶部搜索栏 + 分类区块
   - [x] 响应式设计：适配手机/PC屏幕
   - [x] 深色/浅色模式切换
   - [x] 链接管理：支持JSON数据源管理链接
   - [x] 快速搜索：支持直接跳转Google/Bing/DuckDuckGo/百度搜索

2. **数据管理**
   - [ ] 数据迁移工具（导出为通用格式）
   - [ ] 自动GitHub备份（可选）
   - [ ] 本地存储配置（保存主题/布局偏好）

3. **用户系统**
   - [ ] 用户认证系统（基于Cloudflare Workers）
   - [ ] 链接可见性控制（公开/私密）

4. **增强功能**
   - [ ] 即时链接搜索过滤
   - [ ] 网页favicon自动抓取
   - [ ] 自定义分类图标
   - [ ] 分类折叠/展开功能

5. **高级功能**
   - [ ] 快捷命令面板（Ctrl+K唤起）
   - [ ] 链接健康检查（定期检测死链）
   - [ ] 浏览器新标签页替换（Chrome扩展）
   - [ ] 数据看板（访问统计可视化）

### 核心功能
- [x] 智能搜索建议（结合历史记录）
- [x] 链接属性编辑（图标/标签/可见性）
- [x] 云端数据同步（基于Workers KV）
- [x] 链接点击统计
- [x] 数据备份恢复功能
- [x] 快捷添加链接表单
- [x] 书签let快速添加支持
- [x] 自定义快捷键设置
- [x] 移动端快捷指令支持
- [x] 多设备同步冲突解决器
- [x] 浏览器书签双向同步

### 增强功能
- [ ] 链接健康检查（定期检测死链）
- [ ] 自定义分类图标
- [ ] 分类折叠/展开功能
- [ ] 数据看板（访问统计可视化）
- [ ] 多设备同步冲突解决器
- [ ] 浏览器书签双向同步

## 📂 项目结构
/
├── index.html          # 主入口文件
├── css/
│   └── style.css       # 主样式表
├── js/
│   ├── app.js          # 主逻辑
│   ├── search.js       # 搜索功能
│   └── auth.js         # 认证相关逻辑
├── assets/             # 静态资源
│   ├── icons/          # 网站图标
│   └── bg/             # 背景图片
├── data/               # 数据文件
│   └── links.json      # 本地备份数据
├── workers/            # Cloudflare Workers脚本
│   └── auth.js
│   └── sync.js         # 数据同步Worker
│   └── analytics.js    # 数据分析Worker
├── config/
│   └── settings.json  # 全局配置（认证开关/权限设置等）
├── extensions/         # 浏览器扩展代码
│   └── chrome/
└── cf-pages.json       # Cloudflare Pages配置

## 🛠️ 技术栈
- 核心：原生HTML/CSS/JavaScript
- 认证：JWT + Workers KV
- 部署：Cloudflare Pages
- 存储：Workers KV（用户数据） + D1 Database（可选）
- 样式：CSS变量 + Flex/Grid布局
- 安全：CSP策略 + HTTPS强制
- 同步：WebSocket实时通信 + 版本控制
- 分析：Chart.js 数据可视化
- 移动端：Capacitor 混合应用框架
- 扩展：Chrome API + Manifest V3

## 🚄 部署说明
1. Fork本仓库到你的GitHub账号
2. 登录Cloudflare控制台
3. 同时创建：
   - Pages服务：托管前端
   - Workers服务：处理认证API
4. 选择你的仓库，构建设置：
   - 构建命令：留空
   - 输出目录：/
5. 点击「保存并部署」

## 🔒 安全设计
- 密码存储：bcrypt加密后存Workers KV
- 数据加密：AES-256-GCM端到端加密
- 通信安全：强制HTTPS + HSTS
- 访问控制：CORS严格限制
- 审计日志：记录关键操作
- 数据持久化：三重备份机制
  - Cloudflare KV（热数据）
  - GitHub仓库备份（冷备份）
  - 本地浏览器存储（离线缓存）