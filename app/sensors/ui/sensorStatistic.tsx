import Statistic from "antd/es/statistic/Statistic";
import { SensorReading } from "../../api";
import useWebSocket from "../../hooks/useWebSocket";

export interface SensorStatisticProps {
    title: string;
    websocketHostname: string;
    sensorRoute: string;
}

export const SensorStatistic: React.FC<SensorStatisticProps> = ({ title, websocketHostname, sensorRoute }) => {
    const {data: sensorReading, error } = useWebSocket<SensorReading>({
        hostname: websocketHostname,
        route: sensorRoute,
    })

    return (
        <div>
            <Statistic title={title} value={sensorReading?.value} loading={sensorReading === undefined} precision={2} />
        </div>
    );
}
