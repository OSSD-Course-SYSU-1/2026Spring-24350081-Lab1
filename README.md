# Echo — 历史剪贴板管理 App

<p align="center">
  <img src="AppScope/resources/base/media/app.png" alt="Echo Icon" width="128" />
</p>

> HarmonyOS NEXT · ArkTS · 版本 1.4.0 · 手机 / 平板 / 2in1 PC · 跨设备自由流转

## 设计初衷

主播在完成作业时接触了 Agent，使用过程中发现很多指令其实反复出现、内容重复，便灵机一动，决定借助 Agent 做一个剪贴板管理小工具，于是「Echo」诞生了。

「Echo」的中文意为「回声」，寓意着这款 App 所具备的记忆与回溯能力——每一次复制都是一次发声，而 Echo 让每一次发声都有回响。

## 简介

Echo 是一款运行在华为鸿蒙系统上的**历史剪贴板管理**应用。它能自动记录你复制的文字和图片，支持分类管理、全文搜索、置顶收藏、存储时效设置。一套代码同时适配**手机、平板和 PC（2in1）**三种设备形态，并且通过 HarmonyOS 分布式能力实现了**跨设备数据同步**与**跨端任务迁移**。

## 功能一览

| 功能 | 说明 |
|------|------|
| 🔍 自动记录 | 前台 + 后台运行期间，自动监听系统剪贴板变化，记录文字和图片 |
| 📋 时间线 | 所有内容按时间倒序卡片排列，最新复制的内容在最上面 |
| 👆 点击复制 | 点击任意卡片即可将内容写回系统剪贴板，随处粘贴 |
| 🔎 搜索 | 顶部搜索栏支持对文字内容进行关键词模糊搜索，大小写不敏感 |
| 📌 置顶 | 长按卡片 → 置顶，置顶内容始终排在最前面 |
| 🗂 分类管理 | 创建/重命名/删除分类，每类可自定义颜色标签 |
| 📂 移入分类 | 长按卡片 → 移动到指定分类 |
| 🏷 分类筛选 | 顶部分类标签栏，点击即可按分类查看内容；宽屏设备自动换行全部可见 |
| ⏱ 存储时效 | 全局设置保留天数（1/3/5/7 天 / 永不过期），过期自动清理 |
| 🗑 删除 | 长按卡片 → 删除，支持一键清空 |
| 🖼 图片支持 | 自动记录复制的图片，卡片内显示缩略图，可复制回剪贴板粘贴 |
| 🌐 多端部署 | 一套代码适配手机、平板、2in1 PC，响应式布局自动切换 |
| 🔄 分布式同步 | 跨设备自动同步剪贴板记录和分类数据（分布式 RDB + autoSync） |
| 📱 跨端迁移 | 无缝切换设备继续使用，当前页面/搜索/筛选状态自动恢复 |

## 多端交互对照

| 操作 | 手机 (SM) | 平板 (MD) | PC / 2in1 (LG) |
|------|:--------:|:--------:|:-------:|
| 复制 | 单击卡片 | 单击卡片 / 点 ⋯ → ActionSheet | 单击卡片 |
| 操作菜单 | 长按 → ActionSheet | 点 ⋯ 按钮 → ActionSheet / 长按 → Menu | 右键 → Menu / 点 ⋯ → ActionSheet |
| 预览 | — | 双击卡片 → 右侧预览面板 | 双击卡片 → 右侧预览面板 |
| 关闭预览 | — | Escape 键 / 点击 ✕ | Escape 键 / 点击 ✕ |
| 悬停高亮 | — | onHover → 阴影 + 缩放 | onHover → 阴影 + 缩放 |
| 键盘操作 | — | — | Delete 删除悬停卡片 |
| 导航 | 底部 Tab | 左侧图标导航（窄） | 左侧图标+文字导航（宽） |

## 响应式断点系统

| 断点 | 宽度范围 | 卡片列数 | 导航模式 | 分类标签 |
|------|----------|:---:|------|------|
| `sm` | < 600 vp | 1 列 | 底部 Tab | 横向滚动（滚动条可见） |
| `md` | 600–840 vp | 2 列 | 左侧图标导航 | 自动换行 |
| `lg` | > 840 vp | 3 列 | 左侧图标+文字导航 | 自动换行 |

断点通过窗口 `onAreaChange` 实时监听，经 `@Param` 向下显式传递给各页面及组件。

## 技术栈

| 类别 | 技术 |
|------|------|
| 运行环境 | HarmonyOS NEXT (API 12+), SDK 6.0.0(20) |
| 开发语言 | ArkTS (TypeScript 严格模式) |
| UI 框架 | ArkUI V2 (`@ComponentV2` / `@ObservedV2` / `@Trace` / `@Param`) |
| 多列网格 | `Grid` + `GridItem` + `columnsTemplate`（1fr / 2fr / 3fr） |
| 数据库 | 关系型数据库 RDB (`@ohos.data.relationalStore`) |
| 剪贴板 | `@ohos.pasteboard`（事件 `on('update')` + 轮询 `setTimeout` 2.5s 双层监听） |
| 本地存储 | `@ohos.data.preferences`（设置）/ `@ohos.file.fs`（图片文件） |
| 图片 | `@ohos.multimedia.image`（PixelMap 读写） |
| 日志 | `@kit.PerformanceAnalysisKit` (hilog) |
| 权限 | `ohos.permission.READ_PASTEBOARD` / `ohos.permission.DISTRIBUTED_DATASYNC`（user_grant，运行时弹窗请求） |

## 项目结构

```
Echo/
├── AppScope/                       # 应用级配置（图标、app.json5）
├── entry/src/main/
│   ├── module.json5                # 模块描述（权限、deviceTypes: phone/tablet/2in1）
│   ├── ets/
│   │   ├── common/                 # 断点系统（BreakpointConstants）、跨端迁移桥接（ContinuationBridge）
│   │   ├── constant/               # 常量（分类颜色等）
│   │   ├── entryability/           # UIAbility 入口
│   │   ├── model/                  # 数据模型（ClipItem, CategoryItem）
│   │   ├── database/               # 数据库层（RDB CRUD）
│   │   ├── viewmodel/              # 业务逻辑（剪贴板监听、分类管理）
│   │   ├── pages/                  # 页面（Index 导航、ClipboardPage、CategoryPage、SettingsPage）
│   │   └── component/              # 通用组件（ClipCard、SearchBar、SideNav）
│   └── resources/                  # 字符串、颜色资源
├── docs/                           # 需求文档、技术栈说明、设计规范
├── dev-logs/                       # 每日开发日志
└── CLAUDE.md                       # AI 协作指引
```

## 架构设计

### 数据流

```
剪贴板变化 (事件 / 2.5s 轮询)
    ↓
readAndSaveClipboard()
    ↓ getPrimaryText() / record.plainText 双重提取
    ↓
saveClip()
    ├── 内存去重 (lastContent)
    ├── DB 持久化 (addClip)
    └── fullClips 主列表更新 → applyFilters() → clips (@Trace UI 列表)
    ↓
单列 / Grid 双列 / Grid 三列 → 卡片渲染
```

### 核心设计原则

- **DB 仅持久化**，内存（`fullClips` + `clips`）是 UI 唯一数据源
- **乐观更新**：所有写操作先更新 UI（同步），再异步写 DB，即时响应（< 1ms）
- **对象重建**：属性变更时创建新对象实例，新引用触发 ForEach 重渲染
- **纯内存筛选**：搜索/分类筛选不查 DB，直接在 `fullClips` 上过滤
- **去重机制**：内存级（`lastContent`）+ 数据库级（300s 内相同内容去重，覆盖分布式同步延迟）+ 序列号防竞态
- **基线机制**：启动时读取剪贴板建立基线，防止 App 关闭期间的旧数据被存入
- **`@Trace dataVersion`**：原始类型计数器保障条件渲染下的响应式依赖

### 剪贴板监听

- **事件驱动**：`pasteboard.on('update')` 监听剪贴板变化（真机主路径）
- **定时轮询**：`setTimeout` 2.5 秒间隔（虚拟机兜底，事件可能不触发）
- **前台恢复**：`onPageShow → onForeground()` 确保监听活跃，即时检查新内容
- **后台持续**：不因页面隐藏而停止监听，App 进程存活期间持续记录
- **文本提取**：`PasteData.getPrimaryText()` 为主，`record.plainText` 属性为兜底

### 多端部署架构

- **断点系统**：`calcBreakpoint(width)` → SM / MD / LG 三档
- **响应式导航**：SM → Tabs 底部导航，MD/LG → SideNav 侧边导航
- **响应式网格**：SM → 单列 Scroll + Column，MD/LG → Grid + columnsTemplate
- **交互归一**：`bindContextMenu` + `ResponseType`（LongPress / RightClick）+ 卡片 ⋯ 按钮

## 开发历程

### 2026-05-19：项目搭建 + 核心功能

- 搭建项目骨架、数据模型、数据库层、ViewModel、UI 页面
- 实现剪贴板监听（事件 + 轮询双层机制）
- 重构数据流：引入 `fullClips` + `applyFilters` 内存过滤架构
- 修复 ArkTS 严格模式编译问题、ForEach key、@Builder 陷阱等

### 2026-05-20：功能完善 + 乐观更新

- 所有 ViewModel 写操作统一为乐观更新模式
- 修复后台剪贴板监听（基线机制 + 移除错误的 `isPaused`）
- 点击复制不重复存入、图片缩略图 + 磁盘清理
- 修复分类页面编辑后不刷新

### 2026-06-02：搜索 + Tab 切换修复

- 搜索防抖 leading+trailing 模式、大小写不敏感、图片参与搜索
- 修复 Tab 切换后显示异常（refreshTrigger 计数器强制 rebuild）
- 修复 saveClip 异步竞态（saveSeq 序列号）
- 修复多列网格 ForEach key 不稳定、初始断点布局闪烁

### 2026-06-09：分布式 RDB 同步 + 多端 UI + PC 交互

- 分布式 RDB：启用 S3 安全等级 + `setDistributedTables` + autoSync
- `imageAvailable` 字段 + 图片不可用占位 UI
- 分布式变更监听 → 自动 `loadClips()` 刷新

### 2026-06-11：跨端迁移 Continuation

- 新建 `ContinuationBridge` 状态桥接单例
- `EntryAbility` 实现 `onContinue` / `onNewWant` / `onCreate` 迁移三件套
- `Index` / `ClipboardViewModel` 同步 UI 状态到桥接，对端自动恢复
- 分布式 RDB（数据同步）+ Continuation（任务接续）= 完整自由流转体验

### 2026-06-22：编译验证 + UI 修复

- 自由流转全链路编译验证（CompileArkTS 零新增错误）
- 补全 `DISTRIBUTED_DATASYNC` 运行时权限请求（与 `READ_PASTEBOARD` 合并弹窗）
- 修复分类页颜色圆圈在手机上溢出弹窗边框（SM 下缩小至 32×32 vp）
- 修复分类颜色 / 名称修改后列表刷新不及时（ForEach key 加入 `color`）
- 修复移动分类后卡片标签刷新不及时（ForEach key 加入 `categoryId` + `isPinned`）
- 修复平板端 `⋯` 按钮与文字重叠（内容区 Column 增加右边距 36 vp）

### 2026-06-09（原）：多端 UI + PC 交互

- 断点系统 px/vp 转换修复、@Builder 内联重构（平板 UI 不响应数据变化）
- FlexWrap 单层 ForEach 替代嵌套 ForEach，`dataVersion` 响应式兜底
- PC（LG）：右键菜单 `bindContextMenu(RightClick)`、双击预览面板（300vp）、悬停高亮、键盘快捷键
- 平板/PC 卡片放大（`wideLayout` + 8 处三元适配）
- 分类标签响应式换行（SM 滚动条可见，MD/LG FlexWrap 自动换行）
- 平板长按手势根因修复：`Flex + FlexWrap.Wrap` → `Grid + GridItem`（消除手势传播阻断）
- 平板/PC 卡片新增 "⋯" 操作按钮（替代不可靠的长按，零手势冲突）
- 预览面板拥挤修复：`showActions` 开关（预览打开隐藏 ⋯）+ 分类名硬裁剪 `.clip(true)`

## 构建与运行

1. 使用 DevEco Studio 打开项目目录
2. 等待依赖同步和索引完成
3. 连接 HarmonyOS 虚拟机或真机（支持 Phone / Tablet / 2in1）
4. 点击 Run 按钮编译并运行

首次启动会弹出「允许读取剪贴板」权限对话框，点击允许后即可正常使用。

命令行编译（需配置 `JAVA_HOME` 和 `DEVECO_SDK_HOME`）：

```powershell
$env:JAVA_HOME = "D:\DevEco Studio\jbr"
$env:DEVECO_SDK_HOME = "D:\DevEco Studio\sdk"
hvigorw --mode module -p product=default -p module=entry@default assembleHap
```

## 自由流转

### 架构概览

Echo 利用 HarmonyOS 分布式能力实现了两个层次的跨设备体验：

```
┌─────────────────────────────────────────────────────┐
│                    自由流转                           │
├─────────────────────────┬───────────────────────────┤
│   分布式 RDB 同步 (v7)    │   跨端迁移 Continuation (v8) │
│   数据层 — 自动同步       │   任务层 — 无缝接续          │
├─────────────────────────┼───────────────────────────┤
│  clips / categories      │  currentTab               │
│  表 autoSync             │  searchKeyword            │
│  远程变更 → loadClips()   │  selectedCategoryId       │
└─────────────────────────┴───────────────────────────┘
```

### 分布式 RDB 同步（v7）

- **安全等级**：S3（满足分布式安全要求）
- **同步表**：`clips` + `categories`，`autoSync: true` 自动同步
- **变更监听**：`store.on('dataChange', SUBSCRIBE_TYPE_REMOTE)` → 远程数据到达 → `loadClips()` → UI 刷新
- **去重窗口**：300s（覆盖分布式同步延迟下的重复写入）
- **图片限制**：RDB 仅同步文件路径字符串，图片文件本身不跨设备传输。远端设备上图片显示占位提示

### 跨端迁移（v8）

- **配置**：`module.json5` → `continuable: true`
- **源端**：`EntryAbility.onContinue()` → 快照 currentTab / searchKeyword / selectedCategoryId → `wantParam`
- **对端**：`EntryAbility.onCreate()`（冷启动）/ `onNewWant()`（热启动）→ 从 `want.parameters` 恢复 → `Index.checkAndRestoreContinuation()`
- **状态桥接**：`ContinuationBridge` 单例，连接 UIAbility（非 UI）与 Index（@ComponentV2）之间的状态传递

### 迁移数据流

```
源端（设备A）                          对端（设备B）
─────────                             ─────────
Index/VM 状态变化
  → ContinuationBridge 更新
     currentTab / search / category
                                      
用户触发迁移                           
  ↓                                    
EntryAbility.onContinue()              
  → snapshotToWantParam()              
  → return AGREE                       
                                       App 冷启动：onCreate(want)
                                       App 热启动：onNewWant(want)
                                         → restoreFromWant()
                                         → pendingRestore = true
                                       
                                       Index.aboutToAppear/onPageShow
                                         → consumeIfPending()
                                         → 恢复 Tab / 搜索 / 筛选
```

## 权限

| 权限 | 用途 | 类型 |
|------|------|------|
| `ohos.permission.READ_PASTEBOARD` | 读取系统剪贴板 | user_grant（运行时弹窗请求） |
| `ohos.permission.DISTRIBUTED_DATASYNC` | 跨设备数据同步 | user_grant（运行时弹窗请求） |
| `ohos.permission.INTERNET` | 基础网络 | normal |

## 已知限制

- ⚠️ 重启 App 后图片粘贴功能偶发不稳定，疑似 HarmonyOS 沙箱文件路径或 `MIMETYPE_PIXELMAP` 兼容性限制
- ⚠️ 系统级悬浮窗在 HarmonyOS NEXT 手机设备上不向第三方 App 开放，此功能已搁置
- ⚠️ 跨端迁移需双端登录同一华为账号、开启 Wi-Fi 和蓝牙、均为 HarmonyOS NEXT Release 及以上版本
- ⚠️ 分布式同步仅传输数据库记录，图片文件本身不跨设备同步（远端显示占位提示）

## 许可证

MIT
