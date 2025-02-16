// app/api/steam-proxy/route.js
import axios from 'axios';
import { NextResponse } from 'next/server'; // 导入 NextResponse

export async function GET() { // 使用 GET 函数处理 GET 请求
  const apiKey = '2BAF17E44C14AB98265D59989829BB90';
  const steamId = '76561198807671981';

  if (!apiKey) {
    return NextResponse.json({ error: "请设置 STEAM_API_KEY 环境变量" }, { status: 500 }); // 使用 NextResponse.json 返回 JSON 响应
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