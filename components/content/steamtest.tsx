// pages/steam-games.js (或 app/steam-games/page.js)
import React from "react";
import useSteamGames from "../../hooks/useSteamGames"; // 导入自定义 Hook

function SteamGames() {
  const { gamesData, loading, error } = useSteamGames(); // 使用自定义 Hook 并解构返回值

  if (loading) {
    return <p>加载游戏数据中...</p>;
  }

  if (error) {
    return <p>错误: {error}</p>;
  }

  if (!gamesData) {
    return <p>等待游戏数据加载...</p>;
  }

  if (gamesData.response && gamesData.response.game_count > 0) {
    return (
      <div>
        <h1>Steam 游戏列表 (使用自定义 Hook)</h1>
        <ul>
          {gamesData.response.games.map((game) => (
            <li key={game.appid}>
              {game.name} (App ID: {game.appid}) - 游玩时间:{" "}
              {game.playtime_forever} 分钟
              
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <p>没有找到游戏数据。</p>;
  }
}

export default SteamGames;
