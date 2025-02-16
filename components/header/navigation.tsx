import AppBar from "@mui/material/AppBar"; // 导入 AppBar 组件
import Box from "@mui/material/Box"; // 导入 Box 组件，用于布局
import Toolbar from "@mui/material/Toolbar"; // 导入 Toolbar 组件，作为 AppBar 的内容容器
import IconButton from "@mui/material/IconButton"; // 导入 IconButton 组件，按钮用来触发事件
import Typography from "@mui/material/Typography"; // 导入 Typography 组件，用于文本展示

import Container from "@mui/material/Container"; // 导入 Container 组件，用于内容的最大宽度
import Avatar from "@mui/material/Avatar"; // 导入 Avatar 组件，显示用户头像
import Button from "@mui/material/Button"; // 导入 Button 组件，作为按钮

import DeblurIcon from '@mui/icons-material/Deblur';
import React from "react"; // 导入 React 库

// 定义导航栏的菜单项
const pages = ["Anon", "Tomorin", "Taki", "Soyo"];

function ResponsiveAppBar() {
  return (
    <AppBar position="static">
      {/* AppBar 固定在页面顶部 */}
      <Container maxWidth="xl">
        {" "}
        {/* 容器，设置最大宽度 */}
        <Toolbar disableGutters variant="dense">
          {" "}
          {/* Toolbar 容器，禁止外边距 */}
          <DeblurIcon sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }} />{" "}
          {/* Logo图标，md以上显示 */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "flex" }, // medium 以上屏幕显示
              fontFamily: "roboto",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FXXK {/* Logo文本 */}
          </Typography>
          {/* Desktop 显示的导航按钮 */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                // 点击时关闭菜单
                sx={{ my: 1, color: "white", display: "block" }}
              >
                {page} {/* 每个菜单项 */}
              </Button>
            ))}
          </Box>
          {/* 用户头像菜单 */}
          <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{ width: 32, height: 32 }} />{" "}
              {/* 用户头像 */}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar; // 导出组件
