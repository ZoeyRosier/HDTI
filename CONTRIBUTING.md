# HDTI 协作开发指南

> 写给非技术背景队友的 GitHub 协作教程。不需要理解所有原理，跟着步骤做就行。

---

## 前置准备（只做一次）

### 1. 安装工具

你需要安装两个东西：

**Node.js**（运行项目用的）：
- 去 https://nodejs.org 下载 LTS 版本，一路下一步安装

**Git**（代码版本管理）：
- Mac：打开终端输入 `git --version`，如果提示安装就点确认
- Windows：去 https://git-scm.com 下载安装

**VS Code**（代码编辑器，推荐）：
- 去 https://code.visualstudio.com 下载

### 2. 克隆项目到本地

打开终端（Mac: Terminal / Windows: Git Bash），输入：

```bash
git clone https://github.com/ZoeyRosier/HDTI.git
```

然后进入项目文件夹：

```bash
cd HDTI
```

### 3. 安装项目依赖

```bash
npm install
```

这会下载项目需要的所有库（需要等一会儿）。

### 4. 启动本地开发服务器

```bash
npm run dev
```

终端会显示类似 `http://localhost:5173`，用浏览器打开就能看到页面了。
按 `Ctrl + C` 可以停止服务器。

---

## 核心概念（30 秒理解）

```
你的电脑（本地）  ←→  GitHub（云端仓库）  ←→  队友的电脑
```

- **分支（branch）**：可以理解为"平行宇宙"，你在自己的分支上改代码，不会影响别人
- **commit**：保存一个"存档点"，记录你改了什么
- **push**：把本地的存档上传到 GitHub
- **PR（Pull Request）**：请求把你的改动合并到主线，队友可以看到你改了什么

---

## 分支规则

```
main              ← 线上版本，不要直接动它！
└── dev           ← 开发主线，所有功能最终合并到这里
    ├── zoey/xxx      ← Zoey 的功能分支
    └── partner/xxx   ← 你的功能分支
```

**记住一条：永远不要直接在 `main` 或 `dev` 上写代码，先创建自己的分支。**

---

## 日常开发流程（每次开始新功能时）

### 第一步：确保你在最新的 dev 分支上

```bash
git checkout dev
git pull
```

> `git checkout dev` = 切换到 dev 分支
> `git pull` = 从 GitHub 拉取最新代码

### 第二步：创建你的功能分支

```bash
git checkout -b partner/你要做的功能
```

比如你要做结果页：
```bash
git checkout -b partner/result-page
```

> 这条命令 = "创建一个新分支并切换过去"

### 第三步：写代码

正常在 VS Code 里编辑文件。随时可以 `npm run dev` 看效果。

### 第四步：保存你的改动（commit）

先看看你改了哪些文件：
```bash
git status
```

把改动的文件加入暂存区：
```bash
git add src/pages/Result.jsx src/components/XXX.jsx
```

> 把 `src/pages/Result.jsx` 换成你实际改的文件路径。
> 也可以用 `git add .` 添加所有改动（但要确认没有不该提交的文件）。

创建一个存档：
```bash
git commit -m "feat: 完成结果页基础布局"
```

> 引号里写你做了什么，用中文就行。

### 第五步：推送到 GitHub

```bash
git push -u origin partner/result-page
```

> 第一次推送用 `-u origin 分支名`，之后只需要 `git push` 就行。

### 第六步：创建 PR（在 GitHub 网页上）

1. 打开 https://github.com/ZoeyRosier/HDTI
2. 你会看到顶部有一个黄色横幅提示你刚推送了新分支，点击 **"Compare & pull request"**
3. 确认目标分支是 `dev`（不是 main！）
4. 写一句话说明你做了什么
5. 点 **"Create pull request"**
6. 等队友看过后点 **"Merge"** 合并

---

## 常用命令速查

| 你想做什么 | 命令 |
|-----------|------|
| 看当前在哪个分支 | `git branch` |
| 切换到某个分支 | `git checkout 分支名` |
| 看改了哪些文件 | `git status` |
| 看具体改了什么内容 | `git diff` |
| 拉取最新代码 | `git pull` |
| 查看提交历史 | `git log --oneline` |

---

## 遇到冲突怎么办？

如果 `git pull` 或合并时提示 "CONFLICT"，说明你和队友改了同一个文件的同一处。

**不要慌，找 Zoey 一起处理。** 或者：

1. 打开有冲突的文件，会看到类似这样的标记：
```
<<<<<<< HEAD
你的代码
=======
队友的代码
>>>>>>> dev
```

2. 手动选择保留哪段（或者合并两段），删掉 `<<<<<<<` `=======` `>>>>>>>` 标记
3. 保存文件后：
```bash
git add 冲突的文件
git commit -m "fix: 解决冲突"
git push
```

---

## 注意事项

- **不要**直接在 `main` 或 `dev` 分支上写代码
- **不要**提交 `node_modules` 文件夹（已在 .gitignore 中排除）
- **不要**提交 `.env.local` 文件（里面有密钥）
- 每次开始工作前先 `git checkout dev && git pull` 拉最新代码
- commit 信息尽量写清楚你做了什么
- 有问题随时问！

---

## 项目结构速览

```
src/
├── data/          # 题目和动物数据（一般不需要改）
├── utils/         # 工具函数（计分、分享等）
├── pages/         # 页面组件（Home、Quiz、Result 等）
├── components/    # 公共小组件
├── App.jsx        # 路由配置
├── main.jsx       # 入口文件
└── index.css      # 全局样式
```

---

## 本地开发命令

```bash
npm run dev       # 启动开发服务器（写代码时一直开着）
npm run build     # 构建生产版本（一般不需要手动执行）
npm run preview   # 预览构建结果
```
