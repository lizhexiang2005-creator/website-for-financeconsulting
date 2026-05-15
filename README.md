# 明鉴

明鉴是一个面向中国用户的 A 股投资研究网站原型。

当前版本聚焦于两个方向：

- 输入股票代码，生成公司分析报告
- 搭建完整产品骨架，为行情、资讯、社区、用户体系留出扩展空间

项目仓库：
[https://github.com/lizhexiang2005-creator/website-for-financeconsulting](https://github.com/lizhexiang2005-creator/website-for-financeconsulting)

## 项目定位

明鉴希望做成一个围绕 A 股研究场景的中文产品：

- 首页：输入股票代码，查看公司分析报告
- 行情：查看 A 股指数、热门个股、板块热度
- 资讯：承接财经资讯与公司公告
- 社区：承接用户发帖与讨论
- 用户：承接手机号注册、账户资料与使用记录

当前仍然是前期原型，部分数据为演示内容，不构成投资建议。

## 当前进度

目前已经完成：

- 中文品牌与橙红色视觉风格
- 首页股票分析工作台
- A 股行情页面骨架
- 资讯页面骨架
- 社区页面骨架
- 用户中心页面骨架
- Prisma 数据库 schema 初版

当前首页示例代码以 A 股为主，例如：

- `600519` 贵州茅台
- `300750` 宁德时代
- `002594` 比亚迪

## 技术栈

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`
- `Recharts`
- `Lucide React`
- `Prisma`

## 本地启动

安装依赖：

```bash
npm install
```

开发模式：

```bash
npm run dev
```

默认地址：

```text
http://localhost:3000
```

生产预览：

```bash
npm run build
npm run start
```

默认地址：

```text
http://localhost:3000
```

## 数据库配置

项目已经包含 Prisma schema，配置文件在：

- [prisma/schema.prisma](</Users/xpirits/Desktop/website for financeconsulting/prisma/schema.prisma:1>)
- [prisma.config.ts](</Users/xpirits/Desktop/website for financeconsulting/prisma.config.ts:1>)

环境变量示例在：

- [.env.example](</Users/xpirits/Desktop/website for financeconsulting/.env.example:1>)

校验 schema：

```bash
npm run prisma:validate
```

生成 Prisma Client：

```bash
npm run prisma:generate
```

## 目录结构

```text
src/
  app/
    account/      用户中心
    community/    社区
    market/       A 股行情
    news/         资讯
  components/
    home-dashboard.tsx
    site-header.tsx
  lib/
    report-data.ts

prisma/
  schema.prisma
```

## 下一步计划

- 接入 A 股真实行情数据源
- 接入公司财报与公告数据
- 接入 AI 报告生成能力
- 完成手机号验证码注册与登录
- 打通用户分析记录、自选股与社区身份
- 为资讯和社区增加后台内容管理能力

## 说明

- 当前展示数据部分为演示数据
- 本项目为产品原型阶段
- 页面内容仅供研究和产品设计参考，不构成投资建议
