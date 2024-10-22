import { useState, useEffect } from 'react';
import { Typography, Tooltip } from 'antd';

import type { TransformedData } from '../types/smorgasboard.types';

const { Title } = Typography;

interface TableChartComponentProps {
  chartData: TransformedData[];
  person: 'you' | 'share'
}

const TableChartComponent = ({ chartData, person }: TableChartComponentProps) => {
  const [data, setData] = useState<TransformedData[]>([]);

  useEffect(() => {
    if (chartData && Array.isArray(chartData) && chartData.length > 0) {
      const formattedData = chartData.map((item) => ({
        x: item.x,
        y: item.y,
        value: item.value === undefined || item.value === null ? -1 : item.value,
      }));
      setData(formattedData);
    }
  }, [chartData]);

  const getColor = (value: number) => {
    switch (value) {
      case -1:
        return '#d9d9d9';
      case 0:
        return '#595959';
      case 1:
        return '#ff6666';
      case 2:
        return '#ffff99';
      case 3:
        return '#99ccff';
      case 4:
        return '#66b366';
      case 5:
        return '#99e699';
      default:
        return '#d9d9d9';
    }
  };

  const formatText = (text: string) =>
    text.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

  return (

    <div style={{ marginTop: '40px' }}>
      {data.length > 0 ? (<>
        <Title level={3} style={{ color: 'black' }}>{`${person === "you"? "Your" : "Your partner's"} RA Smorgasbord Visualization`}</Title>

        <div>
          {Object.entries(
            data.reduce((acc: Record<string, TransformedData[]>, item) => {
              acc[item.x] = acc[item.x] || [];
              acc[item.x].push(item);
              return acc;
            }, {})
          ).map(([section, items]) => (
            <div key={section} style={{ marginBottom: '10px' }}>
              <div style={{ color: 'black', fontWeight: 'bold', fontSize: '14px', marginBottom: '5px' }}>
                {formatText(section)}
              </div>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {items.map((item) => (
                  <Tooltip key={`${section}-${item.y}`} title={`${item.y}: ${item.value === -1 ? 'No answer' : item.value}`}>
                    <div
                      style={{
                        width: '80px',
                        height: '12px',
                        backgroundColor: getColor(item.value),
                        cursor: 'pointer',
                      }}
                    />
                  </Tooltip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </>
      ) : (
        null
      )}
    </div>
  );
};

export default TableChartComponent;
