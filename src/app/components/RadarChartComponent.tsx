import { useState, useEffect } from 'react';
import { Radar } from '@ant-design/charts';
import { Typography } from 'antd';
import type { TransformedData } from '../types/smorgasboard.types';

const { Title } = Typography;

interface RadarChartComponentProps {
  chartData: TransformedData[];
  person: 'you' | 'share';
}

const RadarChartComponent = ({ chartData, person }: RadarChartComponentProps) => {
  const [data, setData] = useState<{ category: string; averageValue: number }[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (chartData && chartData.length > 0) {
      const categoryData = chartData.reduce(
        (acc: Record<string, { total: number; count: number }>, item) => {
          if (!acc[item.x]) {
            acc[item.x] = { total: 0, count: 0 };
          }
          if (typeof item.value === 'number') {
            acc[item.x].total += item.value;
            acc[item.x].count += 1;
          }
          return acc;
        },
        {}
      );

      const formattedData = Object.entries(categoryData).map(([category, { total, count }]) => {
        const average = count > 0 ? total / count : 0;
        return {
          category,
          averageValue: average,
        };
      });

      setData(formattedData);
    }
  }, [chartData]);

  const config = {
    data,
    xField: 'category',
    yField: 'averageValue',
    area: {
      style: {
        fillOpacity: 0.2,
      },
    },
    scale: {
      x: {
        padding: 0.5,
        align: 0,
      },
      y: {
        nice: true,
      },
    },
    axis: {
      x: {
        title: false,
        grid: true,
        style: {
          labelFontSize: isMobile ? 6 : 9,
        },
      },
      y: {
        label: true,
        title: false,
      },
    },
  };

  return (
    <>
      {data.length > 0 ? (
        <div style={{ marginTop: '40px' }}>
          <Title level={isMobile ? 4 : 3}>{`${person === 'you' ? 'Your' : "Your partner's"} Radar Chart Visualization`}</Title>
          <Radar {...config} />
        </div>
      ) : null}
    </>
  );
};

export default RadarChartComponent;
