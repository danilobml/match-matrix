'use client';

import { useEffect, useState } from 'react';
import { Typography, Button } from 'antd';
import { useRouter } from 'next/navigation';

import RadarChartComponent from './RadarChartComponent';
import TableChartComponent from './TableChartComponent';
import HeatmapComponent from './HeatmapComponent';

const { Title, Paragraph } = Typography;

interface ChartData {
  x: string;
  y: string;
  value: number;
}

const Charts: React.FC = () => {
  const router = useRouter();
  const [hasData, setHasData] = useState<boolean>(false);
  const [hasSharedData, setHasSharedData] = useState<boolean>(false);
  const [heatmapData, setHeatmapData] = useState<ChartData[]>([]);

  useEffect(() => {
    const user = sessionStorage.getItem('RAS_USER');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setHasData(!!parsedUser?.hasInstance);

        if (parsedUser?.sharedUserId) {
          fetch(`/api/share?sharedUserId=${parsedUser.sharedUserId}`)
            .then((res) => res.json())
            .then((result) => {
              if (result.data) {
                setHeatmapData(result.data);
                setHasSharedData(true);
              }
            });
        }
      } catch (error) {
        console.error('Failed to parse user session data:', error);
      }
    }
  }, []);

  const handleFormNavigation = () => {
    router.push('/form?mode=add');
  };

  const handleShareNavigation = () => {
    router.push('/share');
  };

  return (
    <div style={{ padding: '15px 60px' }}>
      <Title>Charts</Title>

      {!hasData ? (
        <div>
          <Paragraph>You haven&apos;t filled any forms yet, want to do it now?</Paragraph>
          <Button type="primary" onClick={handleFormNavigation}>
            RA Smorgasboard
          </Button>
        </div>
      ) : (
        <div>
          <RadarChartComponent chartData={[]}/>
          <TableChartComponent chartData={[]} />
          {!hasSharedData ? (
            <div>
              <Paragraph>You haven&apos;t yet shared your data with anyone.</Paragraph>
              <Button type="primary" onClick={handleShareNavigation}>
                Share?
              </Button>
            </div>
          ) : (
            <HeatmapComponent data={heatmapData} />
          )}
        </div>
      )}
    </div>
  );
};

export default Charts;
