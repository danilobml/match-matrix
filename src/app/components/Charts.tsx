'use client';

import { useEffect, useState } from 'react';
import { Typography, Button, Spin } from 'antd';
import { useRouter } from 'next/navigation';

import RadarChartComponent from './RadarChartComponent';
import TableChartComponent from './TableChartComponent';
import HeatmapComponent from './HeatmapComponent';
import { TransformedData } from '../types/smorgasboard.types';
import { getTransformedSmorgasboardData } from '../utils/utils';
import { getParsedSessionUser } from '../utils/manageSessionUser';

const { Title, Paragraph } = Typography;

const Charts: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSharedData, setHasSharedData] = useState<boolean>(false);
  const [chartsData, setChartsData] = useState<TransformedData[]>([]);
  const [sharedChartsData, setSharedChartsData] = useState<TransformedData[]>([]);
  const [hasData, setHasData] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      const parsedUser = getParsedSessionUser();

      if (parsedUser?.raSmorgasboardId) {
        setHasData(true);
        fetch(`/api/raSmorgasboard?userId=${parsedUser.userId}`)
          .then((res) => res.json())
          .then((result) => {
            if (result.data) {
              const transformedData = getTransformedSmorgasboardData(result.data);
              setChartsData(transformedData);
            }
          });
      }

      if (parsedUser?.sharedRaSmorgasboardId) {
        fetch(`/api/raSmorgasboard?userId=${parsedUser.sharedRaSmorgasboardId}`)
          .then((res) => res.json())
          .then((result) => {
            if (result.data) {
              const transformedSharedData = getTransformedSmorgasboardData(result.data);
              setSharedChartsData(transformedSharedData);
              setHasSharedData(true);
            }
          });
      }
    } catch (error) {
      console.error('Failed to parse user session data:', error);
    } finally {
      setIsLoading(false);
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
      <Spin spinning={isLoading}>
        {!hasData ? (
          <div>
            <Paragraph style={{ fontSize: '18px' }}>You haven&apos;t filled and saved any forms yet, want to do it now?</Paragraph>
            <Button type="primary" onClick={handleFormNavigation}>
              RA Smorgasboard
            </Button>
          </div>
        ) : (
          <div>
            <RadarChartComponent chartData={chartsData} />
            <TableChartComponent chartData={chartsData} />
            {!hasSharedData ? (
              <div>
                <Paragraph style={{ fontSize: '18px' }}>You haven&apos;t yet shared your data with anyone.</Paragraph>
                <Button type="primary" onClick={handleShareNavigation}>
                  Share?
                </Button>
              </div>
            ) : (
              <HeatmapComponent userData={chartsData} sharedUserData={sharedChartsData} />
            )}
          </div>
        )}
      </Spin>
    </div>
  );
};

export default Charts;
