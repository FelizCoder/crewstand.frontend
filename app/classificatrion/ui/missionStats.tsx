import { useEffect, useState } from "react";
import { ClassifiedFlowControlMissionOutput } from "../../api";
import useWebSocket from "../../hooks/useWebSocket";
import { Card, Table, Space } from "antd";
import type { ColumnsType } from "antd/es/table";

export interface MissionStatsProps {
  websocketHostname: string;
  missionRoute: string;
}

// Utility function to round time to 3 digits precision
function roundTimestampTo3DigitsPrecision(timestamp: string): string {
  const fractionStartIndex = timestamp.indexOf(".");
  if (fractionStartIndex === -1) return timestamp;
  const fractionPart = timestamp.substring(fractionStartIndex);
  const roundedFraction = fractionPart.substring(
    0,
    Math.min(fractionPart.length, 4)
  );
  return timestamp.substring(0, fractionStartIndex) + roundedFraction;
}

export const MissionStats: React.FC<MissionStatsProps> = ({
  websocketHostname,
  missionRoute: sensorRoute,
}) => {
  const { data: mission, error } = useWebSocket<ClassifiedFlowControlMissionOutput>({
    hostname: websocketHostname,
    route: sensorRoute,
  });
  const [startTimestamp, setStartTimestamp] = useState<string | undefined>(
    undefined
  );
  const [endTimestamp, setEndTimestamp] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (mission) {
      // Round the start and end timestamps to 3 digit precision
      const roundedStartTimestamp = roundTimestampTo3DigitsPrecision(
        mission.start_ts
      );
      const roundedEndTimestamp = roundTimestampTo3DigitsPrecision(
        mission.end_ts
      );

      setStartTimestamp(roundedStartTimestamp);
      setEndTimestamp(roundedEndTimestamp);
      console.debug(
        `start: ${roundedStartTimestamp}, stop: ${roundedEndTimestamp}`
      );
    }
  }, [mission]);

  if (!mission)
    return (
      <div>No classification available. Waiting for an Event to complete.</div>
    );

  const featureColumns: ColumnsType<any> = [
    {
      title: 'Feature',
      dataIndex: 'feature',
      key: 'feature',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  const featureData = Object.entries(mission.features).map(([key, value]) => ({
    key,
    feature: key,
    value: typeof value === 'number' ? value.toFixed(3) : value,
  }));

  return (
    <div style={{ width: '100%' }}>
      {startTimestamp && endTimestamp && (
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          width: '100%',
          flexWrap: 'wrap' 
        }}>
          <div style={{ 
            flexGrow: 1,
            minWidth: '300px',  // prevent too narrow iframe
            flexBasis: '60%'    // try to take 60% width when possible
          }}>
            <iframe
              src={`http://${websocketHostname}:3000/d/fej9lz2yz3sw0d/classification?folderUid=cej9lns9v9af4b&orgId=1&from=${startTimestamp}Z&to=${endTimestamp}Z&timezone=browser&viewPanel=panel-2&kiosk`}
              height={350}
              width="100%"
              style={{ border: 'none' }}
            />
          </div>
          <Card
            title={`Classified as: ${mission.predicted_end_use}`}
          >
            <Table
              columns={featureColumns}
              dataSource={featureData}
              pagination={false}
              size="small"
            />
          </Card>
        </div>
      )}
    </div>
  );
};
