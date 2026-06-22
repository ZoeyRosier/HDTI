# HDTI 模块化开发计划

> 最后更新：2026-06-22

## 项目概况

- 技术栈：React + Vite + Tailwind CSS v4 + React Router v6 + Framer Motion + Supabase
- 部署：Vercel（main 分支自动部署）
- 开发分支：dev
- 协作人员：若阳、小童

---

## 分工总览

| 若阳 | 小童 |
|------|------|
| 首页 Home | 答题页 Quiz |
| 结果页 Result | 图鉴页 Gallery |
| 计分逻辑 + 数据层 | 好友匹配页 Match |
| 分享海报 | 双语切换 i18n |

---

## 模块拆解

### Module 0: 基础架构（若阳）

**目标：** 统一设计系统、字体、路由、公共组件，为所有页面开发奠定基础。

| 任务 | 说明 |
|------|------|
| 自托管字体安装 | Noto Sans SC / Nunito / Space Mono，通过 fontsource 安装到项目 |
| 设计 Token 更新 | 按原型更新 index.css：背景 #F5F7F2、暖强调 #C4956A 等 |
| 路由扩展 | 新增 /animals、/animals/:id、/about、/match 路由 |
| animals.js 代号更新 | HOLD→MINE, VIP#0→SOFT, RARE→GLOW |
| 公共组件 | NavBar、PageContainer、AnimatedPage 等 |
| npm 依赖 | qrcode.react、html2canvas、framer-motion |

**产出：** 所有页面可以在统一的设计系统下开发，无需重复配置。

---

### Module 1: 首页 Home（若阳）

**路由：** `/`

**功能点：**
- 山峦插画 Hero 区域 + 标题动画
- 「开始测试」CTA 按钮（带 sheen 光效）
- 已测总人次实时显示（Supabase 读取，失败时静默隐藏）
- 本命兽排行榜（Top 3 + 百分比进度条）
- 隐藏彩蛋代号展示
- 动物预览横滑列表
- 保护科普 Hook 卡片
- 「查看上次结果」入口（localStorage 30 天）
- 响应式：mobile 430px → tablet 600px → desktop 1000px grid

**数据依赖：**
- `supabase.getAllCounts()` — 排行榜数据
- `localStorage.hdti_result` — 历史结果

---

### Module 2: 答题页 Quiz（小童）

**路由：** `/quiz`

**功能点：**
- 顶部进度条（已答部分实色 + 剩余灰色，可点击回退）
- 题目卡片（中文题干 + 英文副标题 + 4 选项）
- 选项交互：点击选中 → 0.3s 后自动跳下一题
- 选中状态：绿色边框 + 角标 ✓ + pop 动画
- 底部导航：上一题 / 下一题
- 响应式：768px+ 选项 2 列网格
- 最后一题选完 → 进入 Loading 动画

**数据依赖：**
- `src/data/questions.js` — 16 题数据
- sessionStorage 存储答案

---

### Module 3: Loading 过渡页（小童 or 若阳）

**功能点：**
- 1.5 秒加载动画
- 进度条从 0→100%（随机步进）
- 横断山脉剪影 + 动物剪影动画
- 完成后跳转 `/result`

---

### Module 4: 结果页 Result（若阳）

**路由：** `/result` 或 `/result?r={animalId}&m={matchRate}`

**功能点：**

**Hero 区域（深色背景）：**
- 动物 Low Poly 插画 + blob 动画背景
- 人格名称（大标题 900）+ 代号行
- 标签 pills
- 匹配度进度条 + 动画计数
- 稀有度提示
- 人格金句
- 「下滑看 TA 的真实处境」引导

**科普区域（浅色背景）：**
- 「温柔的对比」数据卡（测出人数 vs 野外存量）
- 「你的横断山原型」人格解读卡
- DNA 密码卡（可复制）
- 折叠式科普卡片 ×4（物种档案 / 生存绝技 / 冷知识 / 保护现状）
- 「测测好友契合度」入口
- 操作按钮：生成海报 / 再测一次 / 探索其他动物

**分享链接模式：**
- URL 带参数时显示「朋友的结果」视图
- 不调用 Supabase 计数

**数据依赖：**
- `sessionStorage.hdti_answers` → `scoring.calculateResult()` → 动物结果
- `supabase.incrementAnimalCount()` — 计数+1
- `supabase.getAllCounts()` — 计算稀有度
- `src/data/animals.js` — 动物详细信息

---

### Module 5: 动物图鉴 + 档案页（小童）

**路由：** `/animals`（图鉴列表）、`/animals/:id`（单个动物档案）

**图鉴页功能点：**
- 8 种基础动物网格卡片（插画 + 代号 + 名称 + 人格名）
- 5 种隐藏彩蛋（暗色卡片 + 金色边框 + ??? 占位）
- 点击动物 → 跳转 `/animals/:id` 档案页
- IUCN 等级标签（EN/VU/NT 彩色）
- 响应式网格布局

**单个档案页功能点：**
- 动物插画 + 人格解读 + 完整科普（物种档案/生存绝技/冷知识/保护现状）
- IUCN 链接入口
- 返回图鉴 / 好友匹配入口

---

### Module 6: 好友匹配页 Match（小童）

**路由：** `/match`

**功能点：**
- Hero Banner（珊瑚色渐变）
- 双输入框（DNA 密码 / 动物代号 / 结果链接）
- 解析逻辑：识别 16 位 DNA 密码、动物代号、URL
- VS 对比展示（双 blob + 契合度圆）
- CP 关系名称 + 标签 + 解读文案
- 数据来源：预设组合表（10 对）+ 兜底文案（2 种）

**数据依赖：**
- `src/data/matchData.js` — CP 组合文案数据
- 匹配逻辑函数

---

### Module 7: 分享海报（若阳）

**功能点：**
- 全屏浮层（暗色半透明背景）
- 海报内容：动物插画 + 人格名 + 标签 + 金句 + QR 码
- html2canvas 截图生成
- qrcode.react 生成二维码（指向网站地址）
- 保存图片 / 分享按钮

**技术方案：**
- 渲染一个隐藏的"海报 DOM"→ html2canvas 转图片 → 展示
- QR 码指向 `hdti-green.vercel.app`（或后续自定义域名）

---

### Module 8: 双语切换 i18n（小童）

**功能点：**
- 语言切换按钮（导航栏 中/EN）
- 中文/英文文案分离：`src/i18n/zh.js` + `src/i18n/en.js`
- `useI18n()` hook 或 Context 方案
- 所有页面文案用 `t('key')` 包裹

**原则：** 页面开发时先用中文硬编码，i18n 后续统一替换。

---

### Module 9.5: 算法解析页 About（若阳 or 小童）

**路由：** `/about`

**功能点：**
- HDTI 采用"动物大五人格"框架说明（附学术背景）
- 7 个维度的通俗解释 + 可视化
- 曼哈顿距离匹配原理说明（配图示意）
- 彩蛋机制公开解释（触发逻辑，不透露具体阈值）
- 匹配度计算公式

---

### Module 10: 数据层更新（若阳，待素材就绪）

| 任务 | 状态 | 说明 |
|------|------|------|
| 彩蛋动物文案补全 | 待提供 | 5 种彩蛋的 personalityDesc + species 字段 |
| 维度映射表 | 待提供 | 替换临时匹配度公式为曼哈顿距离 |
| CP 组合数据文件 | 待小童录入 | 10 对预设 + 兜底文案 |

---

## 开发顺序建议

```
Phase 1 — 基础 + 核心页面（本周）
├── Module 0: 基础架构
├── Module 1: 首页
├── Module 2: 答题页（小童同步进行）
└── Module 4: 结果页

Phase 2 — 扩展页面
├── Module 5: 动物图鉴 + 档案页（小童）
├── Module 6: 好友匹配页（小童）
├── Module 7: 分享海报
├── Module 9.5: 算法解析页
└── Module 3: Loading 过渡

Phase 3 — 打磨 + 上线
├── Module 8: i18n
├── Module 10: 数据更新
├── 响应式测试 + Bug fix
└── dev → main 合并上线
```

---

## 技术约定

- **分支命名：** `zoey/模块名` 或 `partner/模块名`
- **commit 前缀：** `feat:` / `fix:` / `style:` / `chore:` / `docs:`
- **组件目录：** 公共组件放 `src/components/`，页面私有组件放对应页面旁
- **样式方案：** Tailwind utility classes 为主，复杂动画用 Framer Motion
- **中文文案：** 先硬编码，后续 i18n 统一替换
- **Supabase 调用：** 全部包裹 try/catch，失败静默降级
