import React, { useState, useEffect } from 'react';
import { Radar } from '@ant-design/charts';
import { Typography } from 'antd';

import type { TransformedData } from '../types/smorgasboard.types';

const { Title } = Typography;

interface RadarChartComponentProps {
  chartData: TransformedData[];
}

const RadarChartComponent = ({ chartData }: RadarChartComponentProps) => {
  const [data, setData] = useState<{ category: string; averageValue: number | 'No answer' }[]>([]);

  useEffect(() => {
    if (chartData && Array.isArray(chartData) && chartData.length > 0) {
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
        const average = count > 0 ? total / count : NaN;
        return {
          category,
          averageValue: isNaN(average) ? 'No answer' : average,
        };
      });

      setData(formattedData as { category: string; averageValue: number | 'No answer' }[]);
    }
  }, [chartData]);

  const replaceLegendText = (category: string | undefined) => {
    if (!category) return '';
    switch (category) {
      case 'emotionalIntimacy':
        return 'Em. Intimacy';
      case 'communicationFrequency':
        return 'Com. Frequency';
      case 'communicationResponse':
        return 'Com. Response';
      case 'togetherFrequency':
        return 'Frequency';
      case 'togetherQuality':
        return 'Quality';
      case 'relationshipPublicity':
        return 'Publicity';
      default:
        return category.replace(/([A-Z])/g, ' $1').toUpperCase();
    }
  };

  const config = {
    data: data.map((item) => ({
      ...item,
      averageValue: item.averageValue === 'No answer' ? 0 : item.averageValue, // Ensure NaN is handled
    })),
    xField: 'category',
    yField: 'averageValue',
    meta: {
      averageValue: {
        alias: 'Average Value',
        min: 0,
        max: 5,
      },
    },
    label: {
      formatter: (datum: { category: string }) => replaceLegendText(datum.category),
    },
    tooltip: {
      formatter: (datum: { category: string; averageValue: number | 'No answer' }) => ({
        name: replaceLegendText(datum.category),
        value: datum.averageValue === 0 ? 'No answer' : datum.averageValue,
      }),
    },
    point: {
      size: 2,
    },
    legend: {
      itemName: {
        style: {
          fontSize: 10,
          fontWeight: 'normal',
        },
        formatter: (text: string) => replaceLegendText(text),
      },
    },
    area: {},
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <Title level={3}>Radar Chart Visualization</Title>
      {data.length > 0 ? (
        <Radar {...config} />
      ) : (
        <p>Please fill out the form and submit to view the radar chart.</p>
      )}
    </div>
  );
};

export default RadarChartComponent;
