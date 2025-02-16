"use client";
import { useState, useEffect } from "react";
import axios from "axios";

interface SteamGamesData {
  // 定义 Steam 游戏数据接口 (Interface)
  response?: {
    game_count: number;
    games: any[]; // 你可以根据实际 API 响应结构更精确地定义 games 数组元素的类型
  };
  // ...  你可以根据实际 API 响应添加其他字段的类型
}

function useSteamGames() {
  const [gamesData, setGamesData] = useState<SteamGamesData | null>(null);
  // 明确指定 loading 和 error 的类型
  const [loading, setLoading] = useState<boolean>(false);
  // 明确指定 error 的类型为 string 或 null  <-- 关键修改在这里！
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("/api/steam-proxy"); //  请求你的 API 路由 (假设你使用了代理)
        setGamesData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("获取游戏数据时发生错误:", err);
        setError("获取游戏数据失败。请稍后重试。");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { gamesData, loading, error }; // Hook 返回数据和状态
}

export default useSteamGames;
