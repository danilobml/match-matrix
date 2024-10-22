'use client';

import { useMemo } from 'react';
import { Pie } from '@ant-design/plots';
import { Typography, Row, Col } from 'antd';
import { TransformedData } from '../types/smorgasboard.types';

const { Title } = Typography;

interface InsightsComponentProps {
  chartData: TransformedData[];
  person: 'you' | 'share';
}

const filterDataByCategories = (
  data: TransformedData[],
  categories: Record<string, { [key: string]: string[] }>
): { label: string; percentage: number }[] => {
  const categoryPoints: Record<string, { maxPoints: number; actualPoints: number }> = {};

  Object.entries(categories).forEach(([category, subCategories]) => {
    Object.entries(subCategories).forEach(([subCategory, labels]) => {
      const filtered = data.filter((item) => item.x === subCategory && labels.includes(item.y));
      const maxPoints = labels.length * 5;
      const actualPoints = filtered.reduce((sum, item) => sum + (item.value || 0), 0);
      if (!categoryPoints[category]) {
        categoryPoints[category] = { maxPoints: 0, actualPoints: 0 };
      }
      categoryPoints[category].maxPoints += maxPoints;
      categoryPoints[category].actualPoints += actualPoints;
    });
  });

  return Object.entries(categoryPoints).map(([label, { maxPoints, actualPoints }]) => ({
    label,
    percentage: maxPoints > 0 ? (actualPoints / maxPoints) * 100 : 0,
  }));
};

const InsightsComponent = ({ chartData, person }: InsightsComponentProps) => {
  const typeData = useMemo(
    () =>
      filterDataByCategories(chartData, {
        platonic: { physicalIntimacy: ['No touch', 'Platonic touch'], labels: ['Friends'] },
        sexual: { physicalIntimacy: ['Erotic touch', 'Safer sex', 'Shared fluids'], kink: ['BDSM', 'Power exchange', 'Roleplaying', 'Taboo'] },
        romantic: { emotionalIntimacy: ['Support', 'Attend to love languages'] },
      }),
    [chartData]
  );

  const frequencyData = useMemo(
    () =>
      filterDataByCategories(chartData, {
        frequent: { communicationFrequency: ['Most days', 'A few times per week', 'Most weeks'], togetherFrequency: ['Most days', 'A few times per week', 'Most weeks'] },
        occasional: { communicationFrequency: ['1-2 times per month', 'Most months'], togetherFrequency: ['1-2 times per month', 'Most months'] },
      }),
    [chartData]
  );

  const engagementData = useMemo(
    () =>
      filterDataByCategories(chartData, {
        committed: {
          emotionalIntimacy: ['Venting', 'Support', 'Attend to love languages'],
          labels: ['Partners', 'Chosen family'],
          relationshipPublicity: ['Family', 'Community', 'Work', 'Social media'],
          lifePartners: ['Long term goals', 'Embracing change', 'Emergency contacts'],
        },
        casual: {
          relationshipPublicity: ['Secret'],
          communicationFrequency: ['1-2 times per month', 'Most months'],
          togetherFrequency: ['1-2 times per month', 'Most months'],
        },
      }),
    [chartData]
  );

  const hierarchyData = useMemo(
    () =>
      filterDataByCategories(chartData, {
        hierarchical: { domestic: ['Housemates', 'Roommates'], structure: ['Open & hierarchical'] },
        nonHierarchical: { structure: ['Open & non-hierarchical'] },
      }),
    [chartData]
  );

  const exclusivityData = useMemo(
    () =>
      filterDataByCategories(chartData, {
        monogamous: { structure: ['Closed/exclusive'] },
        nonMonogamous: { structure: ['Open & non-hierarchical', 'Open & hierarchical'] },
      }),
    [chartData]
  );

  const config = (chartData: { label: string; percentage: number }[]) => ({
    data: chartData,
    angleField: 'percentage',
    colorField: 'label',
    radius: 1,
    responsive: true, // Ensures the chart is responsive
    interactions: [{ type: 'element-active' }],
    label: {
        text: 'label',
        style: {
          fontWeight: 'bold',
        },
      },
  });

  return (
    <div>
      <Title level={3}>{person === 'you' ? 'Your Insights Visualization' : "Your Partner's Insights Visualization"}</Title>
      <Row gutter={[16, 16]} justify="center">
        {typeData.length > 0 && (
          <Col xs={24} md={12} xl={8}>
            <Title level={4}>Type</Title>
            <Pie {...config(typeData)} />
          </Col>
        )}
        {frequencyData.length > 0 && (
          <Col xs={24} md={12} xl={8}>
            <Title level={4}>Frequency</Title>
            <Pie {...config(frequencyData)} />
          </Col>
        )}
      </Row>
      <Row gutter={[16, 16]} justify="center">
        {engagementData.length > 0 && (
          <Col xs={24} md={12} xl={8}>
            <Title level={4}>Engagement</Title>
            <Pie {...config(engagementData)} />
          </Col>
        )}
        {hierarchyData.length > 0 && (
          <Col xs={24} md={12} xl={8}>
            <Title level={4}>Hierarchy</Title>
            <Pie {...config(hierarchyData)} />
          </Col>
        )}
      </Row>
      <Row gutter={[16, 16]} justify="center">
        {exclusivityData.length > 0 && (
          <Col xs={24} md={12} xl={8}>
            <Title level={4}>Exclusivity</Title>
            <Pie {...config(exclusivityData)} />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default InsightsComponent;
