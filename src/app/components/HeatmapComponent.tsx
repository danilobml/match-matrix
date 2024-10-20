import { Heatmap } from '@ant-design/plots';

interface HeatmapData {
  x: string;
  y: string;
  value: number;
}

interface HeatmapComponentProps {
  userData: HeatmapData[];
  sharedUserData: HeatmapData[];
}

const calculateDifferenceHeatmapData = (userData: HeatmapData[], sharedUserData: HeatmapData[]) => {
  const combinedData: HeatmapData[] = userData.map((userItem) => {
    const sharedItem = sharedUserData.find(
      (sharedItem) => sharedItem.x === userItem.x && sharedItem.y === userItem.y
    );
    const difference = sharedItem ? Math.abs(userItem.value - sharedItem.value) : null;

    return {
      x: userItem.x,
      y: userItem.y,
      value: difference !== null ? difference : 5,
    };
  });

  return combinedData;
};

const HeatmapComponent: React.FC<HeatmapComponentProps> = ({ userData, sharedUserData }) => {
  const data = calculateDifferenceHeatmapData(userData, sharedUserData);

  const config = {
    data,
    xField: 'x',
    yField: 'y',
    colorField: 'value',
    color: ['#ff4d4f', '#ffa940', '#ffec3d', '#bae637', '#36cfc9'],
    meta: {
      x: { type: 'cat' },
      y: { type: 'cat' },
      value: { min: 0, max: 5 },
    },
    heatmapStyle: {
      stroke: '#fff',
      lineWidth: 2,
    },
  };

  return <Heatmap {...config} />;
};

export default HeatmapComponent;
