import * as React from "react";
import { Box } from "@mui/material";
import InfoCard from "./infoCard";
import { GameData, PSNData, aggregateGameInfo } from "../_util/mergeData";
import PlaytimeChart from "../charts/PlaytimeChart";
import GameBarChart from "../charts/GameBarChart";

// 定义组件的 Props 类型
interface ContentProps {
  gamesData: {
    response: {
      game_count: number;
      games: GameData[];
    };
  };
  psnData: {
    titles: PSNData[];
  };
}

export default function Content({ gamesData, psnData }: ContentProps) {
  // 确保数据存在且格式正确
  const steamGames = gamesData?.response?.games || [];
  const psnGames = psnData?.titles || [];

  // 使用稳定的唯一标识符聚合游戏信息
  const aggregatedInfo = aggregateGameInfo(steamGames, psnGames);

  return (
    <div style={{ width: "100%" }}>
      {/* 游戏时长统计和图表区域 */}
      <Box
        sx={{
          width: "100%",
          marginBottom: "20px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2
        }}
      >
        {/* 左侧饼图 */}
        <Box sx={{ width: { xs: "100%", md: "33%" }, minHeight: "300px" }}>
          <PlaytimeChart
            steamPlaytime={aggregatedInfo.totalPlaytime.steamtotal}
            psnPlaytime={aggregatedInfo.totalPlaytime.psntotal}
          />
        </Box>

        {/* 中间时长统计 */}
        <Box
          sx={{
            width: { xs: "100%", md: "33%" },
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2 style={{ marginTop: 0, textAlign: "center" }}>游戏时长统计</h2>
          <div style={{ fontSize: "1.2rem", marginBottom: "10px", textAlign: "center" }}>
            <div>
              总游戏时长: <strong>{aggregatedInfo.totalPlaytime.formatted}</strong>
            </div>
            <div>
              Steam游戏时长: <strong>{aggregatedInfo.totalPlaytime.steamtotal}</strong>
            </div>
            <div>
              PSN游戏时长: <strong>{aggregatedInfo.totalPlaytime.psntotal}</strong>
            </div>
          </div>
        </Box>

        {/* 右侧柱状图 */}
        <Box sx={{ width: { xs: "100%", md: "33%" }, minHeight: "300px" }}>
          <GameBarChart
            steamPlaytime={aggregatedInfo.totalPlaytime.steamtotal}
            psnPlaytime={aggregatedInfo.totalPlaytime.psntotal}
          />
        </Box>
      </Box>

      {/* 游戏卡片列表 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
          m: 1,
          borderRadius: 1,
          flexWrap: "wrap",
        }}
      >
        {aggregatedInfo.games.map((cardProps) => (
          <InfoCard
            key={cardProps.key}
            name={cardProps.name}
            playtime={cardProps.playtime}
            imgUrl={cardProps.imgUrl}
            rtime_last_played={cardProps.rtime_last_played}
            appid={cardProps.appid}
          />
        ))}
      </Box>
    </div>
  );
}
