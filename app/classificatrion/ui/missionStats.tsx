import { useEffect, useState } from "react";
import { ClassifiedFlowControlMissionOutput } from "../../api";
import useWebSocket from "../../hooks/useWebSocket";

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
    ); // Just an example for handling absence of mission

  return (
    <div>
      {/* Displaying rounded timestamps */}
      {startTimestamp && endTimestamp && (
        <>
          <div>
            <iframe
              src={`http://${websocketHostname}:3000/d/fej9lz2yz3sw0d/classification?folderUid=cej9lns9v9af4b&orgId=1&from=${startTimestamp}Z&to=${endTimestamp}Z&timezone=browser&viewPanel=panel-2&kiosk`}
              height={250}
              width="50%"
            />
          </div>
        </>
      )}
    </div>
  );
};
