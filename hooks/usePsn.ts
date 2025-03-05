
// hooks/usePlayStationData.ts
import { useState, useEffect } from "react";
import axios from "axios";

interface PsnData {
  titles: Titles[]; // Array of TrophyTitle, which we need to define further
  totalItemCount?: number; // Total count of games
}
interface Titles {
  titleId: number; // Unique ID of the title.
  name: string; // Name of the game.
  imageUrl?: string; // URL of the game's image.
  category: string; //Type of game. Example: "ps4_game"
  playDuration: string;
  lastPlayedDateTime: string;
}

const usePlayStationData = () => {
  const [psnData, setPsnData] = useState<PsnData | null>(null);
  // 明确指定 error 的类型为 string 或 null  <-- 关键修改在这里！
  const [psnError, setPsnError] = useState<string | null>(null);
  useEffect(() => {
    const fetchPlayStationProfileData = async () => {
      setPsnError(null);
      try {
        const response = await axios.get("/api/psn"); //  请求你的 API 路由 (假设你使用了代理)

        setPsnData(response.data);
      } catch (err) {
        console.error("获取游戏数据时发生错误:", err);
        setPsnError("获取游戏数据失败。请稍后重试。");
      }
    };

    fetchPlayStationProfileData();
  }, []);

  return { psnData, psnError };
};

export default usePlayStationData;
