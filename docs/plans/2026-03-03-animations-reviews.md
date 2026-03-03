# 动效增强与模拟评价 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 在不改变现有页面结构的前提下，为落地页补充更多轻量动效并新增“模拟用户评价”瀑布流区块。

**Architecture:** 继续使用 `framer-motion` 驱动滚入与悬停动效，所有新增内容集中在 `src/app/page.tsx`。评价数据以内联常量维护，响应式瀑布流通过 CSS columns 实现，避免引入新组件和新依赖。

**Tech Stack:** Next.js App Router、React、TypeScript、Tailwind CSS、framer-motion、lucide-react

---

### Task 1: 扩展页面数据模型

**Files:**
- Modify: `src/app/page.tsx`
- Verify: `npm run lint`

**Step 1: 新增数据类型与评价数据常量**

在 `page.tsx` 中增加 `Testimonial` 类型与 `testimonials` 数组（6~9 条，偏使用感受）。

**Step 2: 为导航加入评价锚点**

将 `#testimonials` 添加到导航项，保证桌面和移动端可跳转。

**Step 3: 本地语义检查**

确保数据字段与 JSX 使用一致，无未引用字段。

### Task 2: 新增评价瀑布流区块

**Files:**
- Modify: `src/app/page.tsx`
- Verify: `npm run lint`

**Step 1: 创建“他们怎么说”区块**

在“功能一览”后插入新 section，包含标题、副标题和“模拟反馈”说明。

**Step 2: 实现响应式瀑布流**

使用 `columns-1 md:columns-2 lg:columns-3` 和 `break-inside-avoid` 构建卡片流。

**Step 3: 渲染评价卡片信息**

输出姓名、角色、团队类型、主观感受、细节亮点、评分。

### Task 3: 增强现有页面动画

**Files:**
- Modify: `src/app/page.tsx`
- Verify: `npm run lint`

**Step 1: 增加动画偏好开关**

通过 `useReducedMotion` 在减少动态模式下关闭关键位移与循环动画。

**Step 2: 强化卡片交互**

给功能卡、流程卡、场景卡和评价卡添加轻微 hover 抬升与缩放。

**Step 3: 增加首屏背景浮动光斑**

在页面根节点加入低干扰的循环浮动背景层，增强首屏氛围。

### Task 4: 验证与交付

**Files:**
- Verify: `src/app/page.tsx`

**Step 1: 运行静态检查**

Run: `npm run lint`  
Expected: lint 通过，无新增报错。

**Step 2: 人工快速验收**

检查 section 跳转、瀑布流响应式、动效节奏与减少动态兼容。

**Step 3: 整理变更说明**

输出变更文件、核心能力、验证结果和可选后续优化点。
