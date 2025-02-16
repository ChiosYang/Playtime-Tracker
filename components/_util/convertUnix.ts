export function convertUnixTimestampToBeijingTime(unixTimestamp: number): string {
    /**
     * 将 Unix 时间戳转换为北京时间字符串
     * @param unixTimestamp Unix 时间戳 (秒)
     * @returns 北京时间字符串，格式为 "YYYY年MM月DD日 HH:mm:ss"
     */
  
    // 1. 创建 Date 对象
    // Unix 时间戳是以秒为单位的，JavaScript 的 Date 对象构造函数接受的是毫秒，
    // 所以需要将 Unix 时间戳乘以 1000
    const date = new Date(unixTimestamp * 1000);
  
    // 2. 使用 Intl.DateTimeFormat 格式化日期和时间
    // 'zh-CN' 表示中国大陆的locale，'Asia/Shanghai' 是上海时区，与北京时间一致
    const beijingTimeFormatter = new Intl.DateTimeFormat('zh-CN', {
      timeZone: 'Asia/Shanghai', // 设置时区为北京时间 (中国标准时间)
      year: 'numeric',          // 年份，例如：2025
      month: 'long',            // 月份，例如：二月
      day: 'numeric',            // 日期，例如：8
    //   hour: '2-digit',          // 小时，2 位数字，例如：04
    //   minute: '2-digit',        // 分钟，2 位数字，例如：11
    //   second: '2-digit',        // 秒钟，2 位数字，例如：46
      hour12: false             // 使用 24 小时制
    });
  
    // 3. 格式化 Date 对象并返回字符串
    const beijingTimeString = beijingTimeFormatter.format(date);
    return beijingTimeString;
  }
  
//   // 示例用法
//   const unixTimestamp = 1707374400; // 示例 Unix 时间戳 (2024-02-08 16:00:00 UTC)
//   const beijingTimeString = convertUnixTimestampToBeijingTime(unixTimestamp);
//   console.log(`Unix 时间戳: ${unixTimestamp}`);
//   console.log(`北京时间: ${beijingTimeString}`);