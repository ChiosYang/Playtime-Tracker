'use client'
import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

// 定义 InfoCard 组件的 Props 类型接口
interface InfoCardProps {
  key: string;
  name: string;
  playtime: string;
  appid?: number;
  rtime_last_played: string;
  imgUrl?: string; // 可选的 imgUrl prop
}

const InfoCard: React.FC<InfoCardProps> = ({
  name,
  playtime,
  appid,
  rtime_last_played,
  imgUrl,
}) => {
  // 使用默认图片，避免图片加载失败
  const defaultImage = "/images/game-placeholder.jpg";
  
  return (
    <Card sx={{ display: "flex", mx: 4, my: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 330 }}
        image={imgUrl || defaultImage}
        alt={name || "游戏"}
      />
      <Box sx={{ display: "flex", flexDirection: "column", width: 260 }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {name || "未知游戏"}
          </Typography>

          {appid && (
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: "text.secondary" }}
            >
              App ID: {appid}
            </Typography>
          )}

          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            游玩时间: {playtime || "未知"}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            上次游玩: {rtime_last_played || "未知"}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default InfoCard;
