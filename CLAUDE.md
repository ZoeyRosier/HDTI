# HDTI Project — 开发指引

## 项目说明
HDTI（Hengduan Type Indicator）是一个H5网页人格测试应用。
技术栈：React + Vite + Tailwind CSS v4 + React Router v6 + Framer Motion + Supabase
部署：Vercel（GitHub自动部署）
不是微信小程序，不使用任何wx.xxx API。

## 核心原则
- 所有计分逻辑在前端完成，无需后端接口
- Supabase只用于动物测试人次统计，任何调用失败时静默降级（UI不报错不闪烁）
- 移动端优先，同时兼容平板和PC（响应式布局，不锁死宽度）
- 无用户登录，无需注册

## 文件结构
```
src/
├── data/
│   ├── questions.js    # 16道题目完整数据
│   └── animals.js      # 13种动物完整数据
├── utils/
│   ├── scoring.js      # 计分逻辑
│   ├── supabase.js     # Supabase客户端
│   └── share.js        # 分享链接生成和解析
├── pages/
│   ├── Home.jsx        # 首页 /
│   ├── Quiz.jsx        # 答题页 /quiz
│   └── Result.jsx      # 结果页 /result
├── components/         # 公共组件
├── App.jsx             # 路由配置
├── main.jsx            # 入口
└── index.css           # Tailwind + 主题变量
```

## 计分逻辑要点（scoring.js）
计分函数签名：`calculateResult(answers)` → `{ result, isEgg, eggType, userVec, matchRate, distances }`
- result: animal_id字符串（如"snow_leopard"），直接对应animalsMap的key
- answers格式：{ Q1: "A", Q2: "C", ... Q16: "D" }
- 主算法：用户选项向量（optionVectors）加权累加→归一化→曼哈顿距离匹配8只基础动物
- 核心题（Q3/9/11/12/15/16）权重×2，情景题权重×1，总权重22
- 匹配度：`Math.round((1 - manhattanDist / 14) * 100)`
- 彩蛋判断用legacy累计分（优先级严格从高到低）：
  1. 大熊猫隐藏彩蛋：Q3+Q9+Q14均选A（固定matchRate=88）
  2. 极致形态：雪豹≥9分 或 滇金丝猴≥9分（固定matchRate=95）
  3. 双高组合：雪豹≥7且林麝≥7 → 云豹；黑颈鹤≥7且羚牛≥7 → 绿尾虹雉（固定matchRate=90）
  4. 曼哈顿距离最近的基础动物
  5. 并列决胜：先Q15，再Q8，最后随机

## 答题交互
- 选中选项后0.3秒自动跳下一题
- 顶部进度条可点击回退到已答题目
- 最后一题选完后显示1.5秒loading动画再跳转结果页

## 状态管理
- sessionStorage: hdti_answers（当次答题结果，答题页→结果页传递）
- localStorage: hdti_result（历史结果，30天有效，用于首页"查看上次结果"）
- URL参数: /result?r={animalId}&m={matchRate}（分享链接，朋友点开时读取）

## Supabase
环境变量在.env.local中配置。
主要操作：
- increment_animal_count(animalId)：结果页加载时调用，+1并返回新count
- SELECT count FROM animal_counts：首页总人次、结果页稀有度计算

## 设计Token（以交互原型为准）
```
PRIMARY = #3D5A47       /* 墨橄榄绿 */
PRIMARY_DARK = #2e4738  /* 深绿 */
PRIMARY_LIGHT = #4c7250 /* 浅绿 */
BG_PAGE = #F5F7F2       /* 页面底 */
BG_CARD = #FFFFFF       /* 卡片白 */
BG_TAG = #e8efe0        /* 标签底 */
TEXT_HEADING = #23271d   /* 标题 */
TEXT_BODY = #5f6a52      /* 正文 */
TEXT_MUTED = #8a9379     /* 提示 */
ACCENT_WARM = #C4956A   /* 暖金强调 */
ACCENT_CORAL = #c4663f  /* 珊瑚强调（匹配页） */
BORDER = #e4e9dd        /* 边框 */
FONT_SANS = Noto Sans SC
FONT_MONO = Space Mono  /* 动物代号 */
FONT_NUM = Nunito       /* 数字/百分比 */
```
卡片阴影统一用 `rgba(50, 65, 35, .06-.1)` 公式
圆角：卡片 22px, 按钮 18px, pill 30px

动物代号（SOLO/WIFI等）：font-mono，tracking-widest
响应式断点遵循Tailwind默认

## 注意事项
- 彩蛋大熊猫（SOFT）触发条件不在任何用户可见页面提示
- 极致形态彩蛋（SLAY?/5G）复用对应动物的科普内容，只换人格解读和金句
- 结果页检测URL参数：有参数时显示"朋友的结果"视图
- 所有Supabase调用包裹try/catch，catch里return null，UI判断null时静默隐藏
