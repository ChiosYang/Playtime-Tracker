// app/api/steam-proxy/route.js
import axios from 'axios';
import { NextResponse } from 'next/server'; // 导入 NextResponse

export async function GET() { // 使用 GET 函数处理 GET 请求
  // 获取环境变量,设置你的API_KEY和STEAM_USER_ID
  const apiKey = process.env.STEAM_API_KEY;
  const steamId = process.env.STEAM_USER_ID;

  if (!apiKey || !steamId) {
    return NextResponse.json({ error: "请设置 STEAM_API_KEY 和 STEAM_USER_ID 环境变量" }, { status: 500 }); // 使用 NextResponse.json 返回 JSON 响应
  }

  const apiUrl = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&include_appinfo=true&format=json`;

  try {
    const response = await axios.get(apiUrl);
    return NextResponse.json(response.data, { status: 200 }); // 使用 NextResponse.json 返回 JSON 响应
  } catch (error) {
    console.error("API 代理请求错误:", error);
    return NextResponse.json({ error: "Failed to fetch data from Steam API" }, { status: 500 }); // 使用 NextResponse.json 返回 JSON 响应
  }
}