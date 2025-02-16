// app/api/steam-proxy/route.js
import axios from 'axios';
import { NextResponse } from 'next/server'; // 导入 NextResponse

export async function GET() { // 使用 GET 函数处理 GET 请求
  const appid = '730';

  const apiUrl = `https://store.steampowered.com/api/appdetails?appids=${appid}&l=schinese`;

  try {
    const response = await axios.get(apiUrl);
    console.log(response);
    return NextResponse.json(response.data, { status: 200 }); // 使用 NextResponse.json 返回 JSON 响应
  } catch (error) {
    console.error("API 代理请求错误:", error);
    return NextResponse.json({ error: "Failed to fetch data from Steam API" }, { status: 500 }); // 使用 NextResponse.json 返回 JSON 响应
  }
}