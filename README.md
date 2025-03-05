# PlaytimeTracker - 游戏时长统计工具

PlaytimeTracker 是一个现代化的游戏时长统计工具，支持同时展示和分析 Steam 和 PlayStation Network (PSN) 的游戏时长数据。

## 运行示例
![运行示例1](https://raw.githubusercontent.com/ChiosYang/Playtime-Tracker/refs/heads/main/public/images/demo1.png)


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
## How to obtain an authentication token
### Steam
1. 登录 Steam 社区：
- 打开浏览器，访问 Steam API Key 注册页面。
- 使用你的 Steam 账号登录。
2. 获取 API Key：
- 不要将 API Key 泄露给不可信的网站或他人。

### PSN 
**注意**：以下内容引用自 [psn-api](https://github.com/achievements-app/psn-api) 项目，感谢原作者的贡献！
要使用 API 中的任何端点功能，你必须首先获得 PSN 的授权。幸运的是，这个过程相当简单。

1. 在你的网页浏览器中，访问 https://www.playstation.com/，点击“登录”按钮，然后使用 PSN 账号登录。

2. 在同一个浏览器中（因为会保留一个 cookie），访问 https://ca.account.sony.com/api/v1/ssocookie。你会看到一个类似下面的 JSON 响应：
```
{ "npsso": "<64 character token>" }
```
复制你的 NPSSO。不要在任何公开场合暴露它，它相当于你的密码。

3. 如果你看到错误响应，尝试使用不同的浏览器。

现在，你可以使用你的 NPSSO 通过这个包中的以下函数调用来获取认证令牌。
```
// 这是你从上一步复制的值。
const myNpsso = "<64 character token>";

// 我们将用你的 NPSSO 换取一个特殊的访问代码。
const accessCode = await exchangeNpssoForCode(myNpsso);

// 我们可以使用访问代码来获取你的访问令牌和刷新令牌。
const authorization = await exchangeCodeForAccessToken(accessCode);
```
4. 你现在应该已经准备好使用这个包提供的任何端点了。每个函数都需要一个包含你的访问令牌的对象作为其第一个参数。例如：
```
// // 这将返回你获得奖杯的所有游戏列表。
const userTitlesResponse = await getUserTitles(
  { accessToken: authorization.accessToken },
  "me"
);
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
