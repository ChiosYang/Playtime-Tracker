# PlaytimeTracker - 游戏时长统计工具

PlaytimeTracker 是一个现代化的游戏时长统计工具，支持同时展示和分析 Steam 和 PlayStation Network (PSN) 的游戏时长数据。

## 功能特点

- 多平台支持
  - Steam 游戏时长统计
  - PSN 游戏时长统计
  - 跨平台数据整合

- 数据可视化
  - 环形图展示游戏时长占比
  - 横向柱状图对比不同平台游戏时长
  - 直观的数据统计展示

- 游戏列表展示
  - 游戏封面图展示
  - 详细的游戏时长信息
  - 最后游玩时间显示
  - 响应式卡片布局

## 技术栈

- React
- TypeScript
- Material-UI (MUI)
- ECharts
- Next.js

## 项目结构

```
PlaytimeTracker/
├── components/
│   ├── charts/
│   │   ├── PlaytimeChart.tsx    # 游戏时长饼图组件
│   │   └── GameBarChart.tsx     # 游戏时长柱状图组件
│   ├── content/
│   │   ├── cardLayout.tsx       # 主要布局组件
│   │   └── infoCard.tsx         # 游戏信息卡片组件
│   └── _util/
│       └── mergeData.ts         # 数据处理工具
```

## 安装和运行

1. 克隆项目
```bash
git clone [项目地址]
cd PlaytimeTracker
```

2. 安装依赖
```bash
npm install
```

3. 运行开发服务器
```bash
npm run dev
```

## 数据格式

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

## 特性

- 响应式设计，支持移动端和桌面端
- 实时数据更新
- 优雅的数据可视化展示
- 统一的游戏数据管理

## 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进项目。

## 许可证

[MIT License](LICENSE)
