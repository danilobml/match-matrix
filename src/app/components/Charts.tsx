'use client';

import { useEffect, useState } from 'react';
import { Typography, Button, Spin } from 'antd';
import { useRouter } from 'next/navigation';

import RadarChartComponent from './RadarChartComponent';
import TableChartComponent from './TableChartComponent';
import InsightsComponent from './InsightsComponent';
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
  const [showYours, setShowYours] = useState<boolean>(false);
  const [showShared, setShowShared] = useState<boolean>(false);
  const [showHeatmap, setShowHeatmap] = useState<boolean>(false);

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

      if (parsedUser?.shared) {
        setHasSharedData(true);
      }

      if (parsedUser?.sharedRaSmorgasboardId) {
        fetch(`/api/raSmorgasboard?smorgasboardId=${parsedUser.sharedRaSmorgasboardId}`)
          .then((res) => res.json())
          .then((result) => {
            if (result.data) {
              const transformedSharedData = getTransformedSmorgasboardData(result.data);
              setSharedChartsData(transformedSharedData);
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
    <div style={{ padding: '15px 30px' }}>
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
            <Title level={3}>R.A. Smorgasboard:</Title>
            <Button onClick={() => setShowYours(!showYours)}>{showYours ? 'Hide your data' : 'Show your data'}</Button>
            {showYours ? (
              <>
                <RadarChartComponent chartData={chartsData} person='you' />
                <TableChartComponent chartData={chartsData} person='you' />
                <InsightsComponent chartData={chartsData} person='you' />
              </>
            ) : null}
            {(hasSharedData && !sharedChartsData.length && !isLoading) ? (
              <div>
                <Title level={2}>Shared status:</Title>
                <Paragraph style={{ fontSize: '18px' }}>You have already shared your data, but your partner hasn&apos;t yet returned the favor. Please contact them, so they can share theirs with you as well, and you can both visualize each other&apos;s data.</Paragraph>
              </div>
            ) : (chartsData.length && !sharedChartsData.length && !isLoading) ? (
              <div>
                <Title level={2}>Shared status:</Title>
                <Paragraph style={{ fontSize: '20px' }}>You haven&apos;t yet shared your data with anyone.</Paragraph>
                <Button type="primary" onClick={handleShareNavigation}>
                  Share?
                </Button>
              </div>
            ) : null}
            {sharedChartsData.length ? (
              <>
                <br />
                <Button style={{ marginTop: '10px'}} onClick={() => setShowShared(!showShared)}>{showShared ? 'Hide partner\'s data' : 'Show partner\'s data'}</Button>
              </>
            ) : null}
            {(sharedChartsData.length && showShared) ? (
              <>
                <RadarChartComponent chartData={sharedChartsData} person='share' />
                <TableChartComponent chartData={sharedChartsData} person='share' />
                <InsightsComponent chartData={sharedChartsData} person='share' />
              </>
            ) : null}
            {sharedChartsData.length ? (
              <>
                <br />
                <Button style={{ marginTop: '10px'}} onClick={() => setShowHeatmap(!showHeatmap)}>{showHeatmap ? 'Hide comparative heatmap' : 'Show comparative heatmap'}</Button>
              </>
            ) : null}
            {(sharedChartsData.length && showHeatmap) ? (
              <HeatmapComponent userData={chartsData} sharedUserData={sharedChartsData} />
            ) : null}
          </div>
        )}
      </Spin>
    </div>
  );
};

export default Charts;
