import Content from "../components/content/cardLayout";

// 封装获取 Steam 游戏数据的函数 (Server Component 中使用 fetch)
async function getSteamGamesData() {
  try {
    // 使用相对路径，避免硬编码主机名
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/steam-proxy`, {
      next: { revalidate: 3600 }, // 每小时重新验证缓存
    });

    if (!response.ok) {
      console.error("获取 Steam 游戏数据失败，HTTP 状态码:", response.status);
      return { response: { game_count: 0, games: [] } };
    }
    return await response.json();
  } catch (error) {
    console.error("获取 Steam 游戏数据时发生错误:", error);
    return { response: { game_count: 0, games: [] } };
  }
}

// 封装获取 PSN 游戏数据的函数 (Server Component 中使用 fetch)
async function getPsnGamesData() {
  try {
    // 使用相对路径，避免硬编码主机名
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/psn`, {
      next: { revalidate: 3600 }, // 每小时重新验证缓存
    });
    if (!response.ok) {
      console.error("获取 PSN 游戏数据失败，HTTP 状态码:", response.status);
      return { titles: [] };
    }
    return await response.json();
  } catch (error) {
    console.error("获取 PSN 游戏数据时发生错误:", error);
    return { titles: [] };
  }
}

export default async function Home() {
  // 并行发起数据请求，提高效率
  const steamGamesDataPromise = getSteamGamesData();
  const psnGamesDataPromise = getPsnGamesData();

  // 等待两个 Promise 都完成，获取数据
  const [gamesData, psnData] = await Promise.all([
    steamGamesDataPromise,
    psnGamesDataPromise,
  ]);

  // 确保 psnData 有 titles 属性，避免水合错误
  const safePsnData = psnData.titles ? psnData : { titles: [] };

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <Content gamesData={gamesData} psnData={safePsnData}></Content>
    </div>
  );
}

