# ooliver.cn

> 一个中学生、OIer 的个人主页，改自 [itsEricWu/ericwu.me](https://github.com/itsEricWu/ericwu.me)，基于 Next.js 16 构建。

## ✨ 特性

- **可拖拽卡片布局** — 首页采用响应式网格布局，卡片可自由拖拽排列，支持 All / About / Projects 三个 Tab 切换
- **3D 图标云** — 基于 Three.js 和 React Three Fiber 的技能图标展示
- **Live2D 看板娘** — 使用 PIXI.js + pixi-live2d-display 实现的桌面宠物
- **照片卡片堆叠** — 可交互的照片浏览卡片组
- **交互式地图** — 基于 Leaflet 和 Mapbox 的地理位置展示
- **深色 / 浅色主题** — 支持主题切换，自动跟随系统偏好
- **Dock 导航栏** — macOS 风格的应用 Dock，集成社交链接
- **动画 Emoji** — 基于微软 Fluent Emoji 的动画表情
- **SEO 优化** — JSON-LD 结构化数据、Open Graph、Twitter Card、Sitemap、Robots.txt 一应俱全
- **ICP / 公网安备** — 已集成备案号和公安备案展示

## 🛠 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router + Turbopack) |
| UI 库 | React 19、HeroUI v2 |
| 样式 | Tailwind CSS v4 |
| 语言 | TypeScript |
| 动画 | Framer Motion |
| 3D 渲染 | Three.js、React Three Fiber、react-icon-cloud |
| Live2D | PIXI.js 7、pixi-live2d-display |
| 地图 | Leaflet |
| 拖拽布局 | react-grid-layout |
| 搜索 | Fuse.js |
| 图标 | react-icons |
| 后端存储 | Firebase Storage |
| 分析 | Vercel Analytics |
| AI | OpenAI SDK（兼容 DeepSeek API） |

## 📁 项目结构

```
.
├── app/                     # Next.js App Router 页面
│   ├── layout.tsx           # 根布局（元数据、结构化数据、备案信息）
│   ├── page.tsx             # 首页（ISR 缓存 1 小时）
│   ├── providers.tsx        # HeroUI + next-themes Provider
│   ├── error.tsx            # 错误页面
│   ├── loading.tsx          # 加载状态
│   ├── not-found.tsx        # 404 页面
│   ├── robots.ts            # Robots.txt 生成
│   ├── sitemap.ts           # Sitemap 生成
│   ├── opengraph-image.tsx  # OG 图片生成
│   ├── resume/page.ts       # 简历页面
│   └── api/                 # API 路由
│       ├── emoji/           # Emoji 搜索 API
│       └── emoji-image/     # Emoji 图片代理
├── components/              # React 组件
│   ├── home-client.tsx      # 首页客户端组件（卡片布局）
│   ├── avatar.tsx           # 头像组件（hover 切换狗狗照片）
│   ├── card-stack.tsx       # 照片卡片堆叠
│   ├── icon-cloud.tsx       # 3D 图标云
│   ├── map.tsx              # 地图组件
│   ├── live2d.tsx           # Live2D 看板娘
│   ├── dock.tsx / dock-demo.tsx  # Dock 导航栏
│   ├── animated-emoji.tsx   # 动画 Emoji
│   ├── theme-switch.tsx     # 主题切换按钮
│   ├── webagent.tsx / chatbot.tsx / actions.tsx / paper.tsx  # 项目卡片
│   └── icons/               # 自定义图标
├── config/                  # 配置文件
│   ├── personal.json        # 个人信息、链接、项目（无需改代码）
│   ├── personal.ts          # personal.json 的 TS 导出
│   ├── site.ts              # 站点配置
│   ├── fonts.ts             # 字体配置
│   ├── icons.ts             # 图标云图标列表
│   └── layout.ts            # 卡片布局配置
├── lib/                     # 工具函数
│   ├── data.ts              # Firebase 数据获取（含缓存）
│   ├── emojis.ts            # Emoji 搜索处理
│   ├── fuzzySearch.ts       # 模糊搜索
│   └── utils.ts             # 通用工具（cn 等）
├── hooks/                   # 自定义 Hooks
│   └── useWindowWidth.ts    # 窗口宽度监听
├── types/                   # TypeScript 类型定义
├── styles/                  # 全局样式
└── public/                  # 静态资源
    ├── images/              # 图片
    └── live2d/              # Live2D 模型文件
```

## 🚀 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（Turbopack）
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)。

## 🔧 环境变量

项目需要以下环境变量才能正常运行。**请勿将 API Key 直接提交到公开仓库。**

### 本地开发

在项目根目录创建 `.env.local`：

```plaintext
# DeepSeek API（驱动动画 Emoji 生成功能）
DEEPSEEK_API_KEY=你的_API_Key

# Mapbox（地图组件，需自行注册获取）
NEXT_PUBLIC_MAPBOX_TOKEN=你的_Mapbox_Token

# Firebase（图片存储，需自行注册获取）
NEXT_PUBLIC_FIREBASE_API_KEY=你的_Firebase_API_Key

# 站点 URL
SITE_URL=https://ooliver.cn
```

### 生产部署

部署到服务器时，需要在 **两个位置** 配置 API Key：

| 位置 | 文件 | 变量 | 说明 |
|------|------|------|------|
| Next.js 运行时 | `.env.local` | `DEEPSEEK_API_KEY`、`NEXT_PUBLIC_*` | 构建和运行时使用，不会被打包进客户端 bundle |
| PM2 进程 | `ecosystem.config.js` → `env` 字段 | `DEEPSEEK_API_KEY` | PM2 启动时注入，修改后需 `pm2 restart` 生效 |

> ⚠️ **提醒**：`ecosystem.config.js` 中的 `DEEPSEEK_API_KEY` 是明文存储的，**切勿提交到 GitHub**。建议上传到服务器后立即将 Key 替换为占位符再 push。

## 🎨 自定义

编辑 `config/personal.json` 即可修改以下内容，无需改动任何代码：

- **个人信息** — 姓名、简介、组织、学校
- **社交链接** — GitHub、Bilibili、Steam、洛谷等
- **项目卡片** — 名称、链接、描述
- **图标云** — 技能图标列表
- **Live2D** — 模型启用 / 禁用
- **图片** — 头像、照片、项目配图
- **地图** — 中心坐标、缩放级别
- **字体** — 主字体、装饰字体

## 📦 部署

本项目部署在宝塔面板 Linux 服务器，使用 PM2 + nginx 反向代理。

### 部署前准备

1. 在服务器上创建 `.env.local`，填入你的 API Key
2. 编辑 `ecosystem.config.js`，将 `DEEPSEEK_API_KEY` 替换为你自己的 Key
3. `config/personal.json` 中的 `api.deepseekApiKey` 留空即可（代码优先读取环境变量）

### 构建 & 启动

```bash
# 构建
npm run build

# PM2 启动
pm2 start ecosystem.config.js
pm2 save
```

> ⚠️ **发布到 GitHub 前**：务必将 `ecosystem.config.js` 中的 DeepSeek API Key 替换为占位符，否则你的 Key 会暴露在公开仓库中。

### Nginx 反向代理示例

```nginx
server {
    listen 80;
    server_name ooliver.cn;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name ooliver.cn;

    ssl_certificate     /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 📄 许可证

Copyright &copy; ooliver. All Rights Reserved.
