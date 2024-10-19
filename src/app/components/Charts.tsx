'use client';

import { useEffect, useState } from 'react';
import { Typography, Button, Spin } from 'antd';
import { useRouter } from 'next/navigation';

import RadarChartComponent from './RadarChartComponent';
import TableChartComponent from './TableChartComponent';
import HeatmapComponent from './HeatmapComponent';
import { TransformedData } from '../types/smorgasboard.types';
import { getTransformedSmorgasboardData } from '../utils/utils';

const { Title, Paragraph } = Typography;

const Charts: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSharedData, setHasSharedData] = useState<boolean>(false);
  const [heatmapData, setHeatmapData] = useState<TransformedData[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const user = sessionStorage.getItem('RAS_USER');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        if(parsedUser?.userId) {
          console.log('get')
          fetch(`/api/raSmorgasboard?userId=${parsedUser.userId}`)
            .then((res) => res.json())
            .then((result) => {
              if (result.data) {
                const transformedData = getTransformedSmorgasboardData(result.data)
                setHeatmapData(transformedData);
                setIsLoading(false);
              }
            });
        }

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
    router.push('/form');
  };

  const handleShareNavigation = () => {
    router.push('/share');
  };

  return (
    <div style={{ padding: '15px 60px' }}>
      <Title>Charts</Title>
      <Spin spinning={isLoading} >
      {!heatmapData ? (
        <div>
          <Paragraph style={{ fontSize: '18px'}}>You haven&apos;t filled any forms yet, want to do it now?</Paragraph>
          <Button type="primary" onClick={handleFormNavigation}>
            RA Smorgasboard
          </Button>
        </div>
      ) : (
        <div>
          <RadarChartComponent chartData={heatmapData}/>
          <TableChartComponent chartData={heatmapData} />
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
      </Spin>
    </div>
  );
};

export default Charts;
