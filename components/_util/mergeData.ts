interface InfoCardProps {
  key: string; //  唯一标识符
  name: string;
  playtime: string;
  appid?: number;
  rtime_last_played: string;
  imgUrl?: string; // 可选的 imgUrl prop
}

// 添加新的接口来包含总游戏时长
export interface GameInfoWithTotalTime {
  games: InfoCardProps[];
  totalPlaytime: {
    hours: number;
    minutes: number;
    formatted: string;
    steamtotal: string;
    psntotal: string;
  };
}

export interface GameData {
  appid: number;
  name: string;
  playtime_forever: number;
  img_icon_url: string;
  has_community_visible_stats: boolean;
  playtime_windows_forever: number;
  playtime_mac_forever: number;
  playtime_linux_forever: number;
  playtime_deck_forever: number;
  rtime_last_played: number;
  has_leaderboards: boolean;
  playtime_disconnected: number;
}

export interface PSNData {
  titleId: string;
  name: string;
  localizedName: string;
  imageUrl: string;
  localizedImageUrl: string;
  category: string;
  service: string;
  playCount: number;
  concept: {
    id: number;
    titleIds: string[];
    name: string;
    media: {
      audios: [];
      videos: [];
      images: [
        {
          url: string;
          format: string;
          type: string;
        },
        {
          url: string;
          format: string;
          type: string;
        },
        {
          url: string;
          format: string;
          type: string;
        },
        {
          url: string;
          format: string;
          type: string;
        },
        {
          url: string;
          format: string;
          type: string;
        },
        {
          url: string;
          format: string;
          type: string;
        },
        {
          url: string;
          format: string;
          type: string;
        }
      ];
    };
    genres: string[];
    localizedName: {
      defaultLanguage: string;
      metadata: {
        [key: string]: string;
      };
    };
    country: string;
    language: string;
  };
  media: {
    audios: [];
    videos: [];
    images: [
      {
        url: string;
        format: string;
        type: string;
      },
      {
        url: string;
        format: string;
        type: string;
      },
      {
        url: string;
        format: string;
        type: string;
      },
      {
        url: string;
        format: string;
        type: string;
      },
      {
        url: string;
        format: string;
        type: string;
      },
      {
        url: string;
        format: string;
        type: string;
      },
      {
        url: string;
        format: string;
        type: string;
      }
    ];
  };
  firstPlayedDateTime: string;
  lastPlayedDateTime: string;
  playDuration: string;
}

function mergeGameData(gameData: GameData[]): InfoCardProps[] {
  return gameData.map((item) => {
    const playtimeHours = Math.floor(item.playtime_forever / 60);
    const playtimeMinutes = item.playtime_forever % 60;
    const playtime = `${playtimeHours}小时${playtimeMinutes}分钟`;
    const rtime_last_played = new Date(
      item.rtime_last_played * 1000
    ).toLocaleString();
    const imgUrl = `http://cdn.akamai.steamstatic.com/steam/apps/${item.appid}/header.jpg`;
    // 使用 appid 作为稳定的唯一标识符
    const key = `steam-${item.appid}`;

    return {
      key: key,
      name: item.name,
      playtime: playtime,
      appid: item.appid,
      rtime_last_played: rtime_last_played,
      imgUrl: imgUrl,
    };
  });
}

function mergePSNData(psnData: PSNData[]): InfoCardProps[] {
  return psnData.map((item) => {
    const durationRegex = /PT(?:(\d+)H)?(?:(\d+)M)?/;
    const durationMatch = item.playDuration.match(durationRegex);
    let playtime = "";
    if (durationMatch) {
      const hours = durationMatch[1] ? parseInt(durationMatch[1], 10) : 0;
      const minutes = durationMatch[2] ? parseInt(durationMatch[2], 10) : 0;
      playtime = `${hours}小时${minutes}分钟`;
    } else {
      playtime = "未知";
    }
    const lastPlayedDateTime = new Date(
      item.lastPlayedDateTime
    ).toLocaleString();
    // 使用 titleId 作为稳定的唯一标识符
    const key = `psn-${item.titleId}`;

    return {
      key: key,
      name: item.name,
      playtime: playtime,
      rtime_last_played: lastPlayedDateTime,
      imgUrl: item.imageUrl,
    };
  });
}

// 计算Steam游戏的总时长（分钟）
function calculateSteamTotalPlaytime(gameData: GameData[]): number {
  return gameData.reduce((total, game) => total + game.playtime_forever, 0);
}

// 计算PSN游戏的总时长（分钟）
function calculatePSNTotalPlaytime(psnData: PSNData[]): number {
  return psnData.reduce((total, game) => {
    const durationRegex = /PT(?:(\d+)H)?(?:(\d+)M)?/;
    const durationMatch = game.playDuration.match(durationRegex);
    if (durationMatch) {
      const hours = durationMatch[1] ? parseInt(durationMatch[1], 10) : 0;
      const minutes = durationMatch[2] ? parseInt(durationMatch[2], 10) : 0;
      return total + (hours * 60 + minutes);
    }
    return total;
  }, 0);
}

export function aggregateGameInfo(
  gameDataArray: GameData[] = [],
  psnDataArray: PSNData[] = []
): GameInfoWithTotalTime {
  const mergedGameDataInfo = mergeGameData(gameDataArray);
  const mergedPSNDataInfo = mergePSNData(psnDataArray);
  const games = [...mergedGameDataInfo, ...mergedPSNDataInfo];
  
  // 计算总游戏时长（分钟）
  const steamTotalMinutes = calculateSteamTotalPlaytime(gameDataArray);
  const psnTotalMinutes = calculatePSNTotalPlaytime(psnDataArray);
  const totalMinutes = steamTotalMinutes + psnTotalMinutes;
  
  // 转换为小时和分钟
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  
  // 计算Steam游戏时长
  const steamHours = Math.floor(steamTotalMinutes / 60);
  const steamMinutes = steamTotalMinutes % 60;
  
  // 计算PSN游戏时长
  const psnHours = Math.floor(psnTotalMinutes / 60);
  const psnMinutes = psnTotalMinutes % 60;
  
  return {
    games,
    totalPlaytime: {
      hours: totalHours,
      minutes: remainingMinutes,
      formatted: `${totalHours}小时${remainingMinutes}分钟`,
      steamtotal: `${steamHours}小时${steamMinutes}分钟`,
      psntotal: `${psnHours}小时${psnMinutes}分钟`
    }
  };
}
