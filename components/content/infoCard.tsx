import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

// 定义 InfoCard 组件的 Props 类型接口 (与之前相同)
interface InfoCardProps {
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
  if (!imgUrl) {
    imgUrl = `http://cdn.akamai.steamstatic.com/steam/apps/${appid}/header.jpg`;
  }
  return (
    <Card sx={{ display: "flex", mx: 4, my: 2 }}>
      {" "}
      {/* 保留 mx 和 my margin */}
      <CardMedia
        component="img"
        sx={{ width: 330 }}
        image={imgUrl || imgUrl} // 使用 imgUrl prop，如果 prop 为空，则使用默认占位符图片
        alt={name} // 使用 name prop 作为 alt 属性值
      />
      <Box sx={{ display: "flex", flexDirection: "column", width: 260 }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {name || "游戏名称加载中..."}{" "}
            {/* 使用 name prop，如果 prop 为空，显示加载中提示 */}
          </Typography>

          {appid && (
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: "text.secondary" }}
            >
              App ID: {appid || "Unknown"}
              {/* 使用 appid prop，如果 prop 为空，显示 "Unknown" */}
            </Typography>
          )}

          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            游玩时间: {playtime} 分钟 {/* 使用 playtime prop */}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            上次游玩: {rtime_last_played} {/* 使用 playtime prop */}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default InfoCard;
