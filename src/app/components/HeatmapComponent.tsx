import { Heatmap } from '@ant-design/plots';
import { Typography } from 'antd';

const { Title } = Typography;

interface HeatmapData {
  y: string;
  value: number;
}

interface HeatmapComponentProps {
  userData: HeatmapData[];
  sharedUserData: HeatmapData[];
}

const HEATMAP_COLORS = ['#ff0000', '#ff6600', '#ffff00', '#008000', '#00008b', '#000000'];

const calculateHeatmapData = (userData: HeatmapData[], sharedUserData: HeatmapData[]) => {
  return userData.map((userItem) => {
    const sharedItem = sharedUserData.find((item) => item.y === userItem.y);

    return {
      x: 'You vs Partner',
      y: userItem.y,
      userValue: userItem.value,
      sharedValue: sharedItem ? sharedItem.value : 0,
      difference: sharedItem ? Math.abs(userItem.value - sharedItem.value) : 5,
    };
  });
};

const HeatmapComponent: React.FC<HeatmapComponentProps> = ({ userData, sharedUserData }) => {
  const data = calculateHeatmapData(userData, sharedUserData);

  const config = {
    autoFit: true,
    width: 300,
    height: 800,
    data,
    xField: 'x',
    yField: 'y',
    colorField: 'difference',
    color: HEATMAP_COLORS,
    meta: {
      difference: { min: 0, max: 5 },
    },
    tooltip: {
      formatter: (data: { y: string; userValue: number; sharedValue: number }) => ({
        title: data.y,
        name: 'Value',
        value: `You: ${data.userValue}, Partner: ${data.sharedValue}`,
      }),
    },
    heatmapStyle: {
      radius: 0,
    },
    yAxis: {
      label: {
        style: {
          fontSize: 16,
        },
      },
    },
    legend: {
      position: 'top-left',
      itemName: {
        style: {
          fontSize: 16,
        },
      },
    },
    theme: {
      heightRatio: 1.5,
    },
    mark: 'cell',
    style: { inset: 0.5 },
  };

  return (
    <>
    <Title level={3}>Comparative Heatmap Visualisation</Title>
    <Heatmap {...config} />
    </>
  );
};

export default HeatmapComponent;
