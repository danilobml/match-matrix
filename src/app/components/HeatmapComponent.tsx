import { Heatmap } from '@ant-design/plots';

interface HeatmapComponentProps {
  data: { x: string; y: string; value: number }[];
}

const HeatmapComponent: React.FC<HeatmapComponentProps> = ({ data }) => {
  const config = {
    data,
    xField: 'x',
    yField: 'y',
    colorField: 'value',
    color: ['#d6e4ff', '#84a9ff', '#3366ff', '#254edb', '#10239e'],
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
