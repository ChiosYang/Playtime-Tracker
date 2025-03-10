// app/api/steam-proxy/route.js
import { NextResponse } from "next/server"; // 导入 NextResponse
import {
  exchangeNpssoForCode,
  exchangeCodeForAccessToken,
  getUserPlayedGames,
} from "psn-api";

export async function GET() {
  // 获取环境变量,设置你的PSN_NPSSO_TOKEN
  const myNpsso = process.env.PSN_NPSSO_TOKEN;

  if (!myNpsso) {
    return NextResponse.json(
      { error: "请设置 PSN_NPSSO_TOKEN 环境变量" },
      { status: 500 }
    );
  }

  try {
    const accessCode = await exchangeNpssoForCode(myNpsso);
    const authorization = await exchangeCodeForAccessToken(accessCode);
    const userTitlesResponse = await getUserPlayedGames(authorization, "me", {
      limit: 3,
      offset: 0,
    });
    return NextResponse.json(userTitlesResponse, { status: 200 }); // 使用 NextResponse.json 返回 JSON 响应
  } catch (error) {
    console.error("API 代理请求错误:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from Steam API" },
      { status: 500 }
    ); // 使用 NextResponse.json 返回 JSON 响应
  }
}
