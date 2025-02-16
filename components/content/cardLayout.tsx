import * as React from "react";
import Box from "@mui/material/Box";
import InfoCard from "./infoCard";
import Steam from "./steamtest";
import Psn from "./psntest";
import useSteamGames from "@/hooks/useSteamGames";
import usePsnGames from "@/hooks/usePsn";
import { convertUnixTimestampToBeijingTime } from "../_util/convertUnix";

export default function JustifyContent() {
  const { gamesData, loading, error } = useSteamGames();
  const { psnData, psnError } = usePsnGames();
  if (loading) {
    return <p>加载游戏数据中...</p>;
  }

  if (error || psnError) {
    return <p>错误: {error}</p>;
  }
  if (!gamesData) {
    return <p>等待游戏数据加载...</p>;
  }

  if (gamesData.response && gamesData.response.game_count > 0 && psnData) {
    return (
      <div style={{ width: "100%" }}>
        <h1>Steam 游戏列表</h1>
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
          {gamesData.response.games.map((game) => (
            <InfoCard
              key={game.appid}
              name={game.name}
              playtime={game.playtime_forever}
              appid={game.appid}
              rtime_last_played={convertUnixTimestampToBeijingTime(
                game.rtime_last_played
              )}
            ></InfoCard>
          ))}
          {psnData.titles.map((game) => (
            <InfoCard
              key={game.titleId}
              name={game.name}
              playtime={game.playDuration}
              imgUrl={game.imageUrl}
              rtime_last_played={game.lastPlayedDateTime}
            ></InfoCard>
          ))}
        </Box>
        <Steam></Steam>
        <Psn></Psn>
      </div>
    );
  }
}
