"use client";
import { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface GameBarChartProps {
  steamPlaytime: string;
  psnPlaytime: string;
}

interface TooltipParams {
  name: string;
  value: number;
}

export default function GameBarChart({ steamPlaytime, psnPlaytime }: GameBarChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      
      // 提取Steam和PSN的游戏时长数据
      const steamHours = parseInt(steamPlaytime.match(/(\d+)小时/)?.[1] || '0', 10);
      const steamMinutes = parseInt(steamPlaytime.match(/(\d+)分钟/)?.[1] || '0', 10);
      const steamTotalHours = steamHours + steamMinutes / 60;
      
      const psnHours = parseInt(psnPlaytime.match(/(\d+)小时/)?.[1] || '0', 10);
      const psnMinutes = parseInt(psnPlaytime.match(/(\d+)分钟/)?.[1] || '0', 10);
      const psnTotalHours = psnHours + psnMinutes / 60;
      
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function(params: TooltipParams[]) {
            const hours = Math.floor(params[0].value);
            const minutes = Math.round((params[0].value - hours) * 60);
            return `${params[0].name}: ${hours}小时${minutes}分钟`;
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          name: '小时',
          nameLocation: 'end',
          nameTextStyle: {
            padding: [0, 0, 0, 10]
          }
        },
        yAxis: {
          type: 'category',
          data: ['PSN游戏', 'Steam游戏'],
          axisLabel: {
            fontSize: 14
          }
        },
        series: [
          {
            name: '游戏时长',
            type: 'bar',
            data: [
              {
                value: psnTotalHours,
                itemStyle: {
                  color: '#006FCD'
                }
              },
              {
                value: steamTotalHours,
                itemStyle: {
                  color: '#1a9fff'
                }
              }
            ],
            label: {
              show: true,
              position: 'right',
              formatter: function(params: TooltipParams) {
                const hours = Math.floor(params.value);
                const minutes = Math.round((params.value - hours) * 60);
                return `${hours}小时${minutes}分钟`;
              }
            }
          }
        ]
      };
      
      chart.setOption(option);
      
      const handleResize = () => {
        chart.resize();
      };
      window.addEventListener('resize', handleResize);
      
      return () => {
        chart.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [steamPlaytime, psnPlaytime]);

  return (
    <div 
      ref={chartRef} 
      style={{ width: '100%', height: '200px' }}
    ></div>
  );
} 