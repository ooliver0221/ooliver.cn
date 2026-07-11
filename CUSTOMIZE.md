# 自定义指南

## 一、编辑个人信息

所有可自定义的内容都在 **`config/personal.json`** 这一个文件里，直接编辑保存，刷新页面即可看到效果。

### 1. 网站信息（`site`）

```json
"site": {
  "name": "你的名字 | 标语",
  "description": "网站描述，用于 SEO 和社交分享",
  "url": "https://你的域名.com",
  "keywords": ["关键词1", "关键词2", "关键词3"],
  "author": "你的名字"
}
```

### 2. 个人信息（`person`）

```json
"person": {
  "name": "你的名字",
  "alternateName": "你的英文名或别名",
  "jobTitle": "你的职位",
  "organization": "你的公司",
  "alumniOf": ["毕业院校1", "毕业院校2"],
  "bio": "个人简介，支持 HTML，例如：Hey! I'm <span class='font-oleo text-2xl'>张三</span>，一名全栈开发者..."
}
```

`bio` 中用 `<span class="font-oleo text-2xl">名字</span>` 可以让名字使用手写体装饰字体。

### 3. 社交链接（`links`）

```json
"links": {
  "github": "https://github.com/你的用户名",
  "linkedin": "https://www.linkedin.com/in/你的用户名",
  "email": "mailto:你的邮箱"
}
```

### 4. 项目卡片（`projects`）

四个项目卡片分别对应首页上的四个项目展示位：

```json
"projects": {
  "webAgent": {
    "name": "项目名称",
    "url": "https://项目链接",
    "description": "项目描述"
  },
  "chatbot": { ... },
  "actions": { ... },
  "paper": { ... }
}
```

### 5. 标签页文字（`tabs`）

```json
"tabs": {
  "all": "全部",
  "about": "关于",
  "projects": "项目"
}
```

### 6. 技术图标（`icons`）

图标的名称来自 [Simple Icons](https://simpleicons.org/)，把你的技术栈对应的图标 slug 填进去即可。

```json
"icons": ["typescript", "react", "nextdotjs", "python", ...]
```

### 7. 字体（`fonts`）

目前可选字体：

| 字段 | 可选值 |
|------|--------|
| `primary`（主字体） | `"ubuntu"` / `"inter"` / `"roboto"` / `"poppins"` |
| `decorative`（装饰字体） | `"oleoScript"` / `"pacifico"` / `"dancingScript"` |

修改后需要到 `config/fonts.ts` 里把对应的 import 也改一下。

---

## 二、本地图片

如果不用 Firebase（默认已关闭），图片从本地加载。将你的图片放到 **`public/images/`** 目录下，文件名对应配置中的 `images` 字段：

```json
"images": {
  "avatar": "/images/avatar.jpg",       // 你的头像（正方形）
  "dog": "/images/dog.jpg",             // 宠物照片（toggle 切换用）
  "action": "/images/action.jpg",       // 项目卡片图
  "webagent": "/images/webagent.jpg",   // 项目卡片图
  "chatbot": "/images/chatbot.jpg",     // 项目卡片图
  "paper": "/images/paper.jpg"          // 项目卡片图
}
```

你也可以改路径，只要放在 `public/` 目录下即可。

---

## 三、Live2D 看板娘

### 模型文件放在哪里

将你的 Live2D 模型文件放到：

```
public/live2d/<模型名称>/
```

### 需要什么文件

从 Live2D Cubism Editor 导出 Cubism 3 或 4 格式的模型：

```
public/live2d/my-model/
  ├── my-model.model3.json    ← 模型描述文件（必须）
  ├── my-model.moc3            ← 模型数据（必须）
  ├── textures/                ← 贴图文件夹（必须）
  │   └── texture_00.png
  ├── motions/                 ← 动作（可选）
  │   └── *.motion3.json
  ├── expressions/             ← 表情（可选）
  │   └── *.exp3.json
  ├── physics3.json            ← 物理模拟（可选）
  └── pose3.json               ← 预设姿势（可选）
```

### 获取免费模型

- [Live2D 官方示例模型](https://www.live2d.com/en/download/sample-data/) — Haru、Hiyori、Mao 等
- [Booth.pm](https://booth.pm/en/browse/3D%20Models) — 社区创作者分享的模型

### 开启 Live2D

1. 放好模型文件后，编辑 `config/personal.json`：

```json
"live2d": {
  "modelPath": "live2d/my-model/my-model.model3.json",
  "enabled": true
}
```

2. 如果遇到运行时错误，可能是 `pixi-live2d-display` 与 Next.js 的兼容问题，联系我换用替代方案。

---

## 四、可选配置

### Mapbox 地图

在 `.env.local` 中设置 Token：

```
NEXT_PUBLIC_MAPBOX_TOKEN=你的token
```

免费 Token 在 [mapbox.com](https://www.mapbox.com/) 注册即可获取。

### Firebase 云存储（可选）

如果将来想用 Firebase 管理图片，在 `.env.local` 中设置：

```
NEXT_PUBLIC_FIREBASE_API_KEY=你的firebase_api_key
```

同时修改 `firebase/firebase.ts` 中的项目配置。
