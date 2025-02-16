import React from "react";
import usePsn from "../../hooks/usePsn";

const UserProfile = () => {
  const { psnData, psnError } = usePsn();

  if (!psnData) {
    return <div>Loading...</div>;
  }
  if (psnError) {
    return <p>错误: {psnError}</p>;
  }
  console.log(psnData);

  return (
    <div>
      <h1>PSN Profile</h1>
      <ul>
        {psnData.titles.map((game) => (
          <li key={game.titleId}>
            {game.name} (App ID: {game.imageUrl}) -
            游玩时间: {game.playDuration} 分钟
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
