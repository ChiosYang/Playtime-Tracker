"use client";
import { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface PlaytimeChartProps {
  steamPlaytime: string;
  psnPlaytime: string;
}

export default function PlaytimeChart({ steamPlaytime, psnPlaytime }: PlaytimeChartProps) {
  // 创建饼图的引用
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // 确保DOM元素已经渲染
    if (chartRef.current) {
      // 初始化echarts实例
      const chart = echarts.init(chartRef.current);
      
      // 提取Steam和PSN的游戏时长数据
      const steamHours = parseInt(steamPlaytime.match(/(\d+)小时/)?.[1] || '0', 10);
      const steamMinutes = parseInt(steamPlaytime.match(/(\d+)分钟/)?.[1] || '0', 10);
      const steamTotalMinutes = steamHours * 60 + steamMinutes;
      
      const psnHours = parseInt(psnPlaytime.match(/(\d+)小时/)?.[1] || '0', 10);
      const psnMinutes = parseInt(psnPlaytime.match(/(\d+)分钟/)?.[1] || '0', 10);
      const psnTotalMinutes = psnHours * 60 + psnMinutes;
      
      // 设置图表选项
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c}分钟 ({d}%)'
        },
        series: [
          {
            name: '游戏时长',
            type: 'pie',
            radius: ['40%', '70%'],  // 修改为环形图，更现代的展示效果
            center: ['50%', '50%'],  // 确保饼图在容器中居中
            data: [
              { 
                value: steamTotalMinutes, 
                name: 'Steam游戏',
                itemStyle: {
                  color: '#1a9fff'  // Steam蓝色
                }
              },
              { 
                value: psnTotalMinutes, 
                name: 'PSN游戏',
                itemStyle: {
                  color: '#006FCD'  // PSN深蓝色
                }
              }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              show: true,
              formatter: '{b}\n{d}%',  // 显示名称和百分比
              fontSize: 14
            },
            labelLine: {
              show: true,
              length: 10,
              length2: 10
            }
          }
        ]
      };
      
      // 使用配置项显示图表
      chart.setOption(option);
      
      // 窗口大小变化时重新调整图表大小
      const handleResize = () => {
        chart.resize();
      };
      window.addEventListener('resize', handleResize);
      
      // 组件卸载时销毁图表和事件监听
      return () => {
        chart.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [steamPlaytime, psnPlaytime]);

  return (
    <div 
      ref={chartRef} 
      style={{ width: '100%', height: '300px', marginBottom: '20px' }}
    ></div>
  );
} 
