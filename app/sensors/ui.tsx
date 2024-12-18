import Statistic from "antd/es/statistic/Statistic";
import { useState, useEffect } from "react";
import { SensorReading } from "../api";

export interface SensorStatisticProps {
    title: string;
    websocketHostname: string;
    sensorRoute: string;
}

export const SensorStatistic: React.FC<SensorStatisticProps> = ({ title, websocketHostname: websocketBase, sensorRoute }) => {
    const [data, setData] = useState<number | undefined>(undefined);
    const [, setSocket] = useState<WebSocket | null>(null);
    const [backendUri, setBackendUri] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await fetch('/api/backend');
                if (res.ok) {
                    const json = await res.json();
                    const backendUri = 'ws://' + websocketBase + ":" + json.backend_port 
                    setBackendUri(backendUri);
                    console.debug("Backend URI:", backendUri);
                }
            } catch (error) {
                console.error("Error fetching config", error);
            }
        };

        fetchConfig();
    }, []);

    useEffect(() => {
        if (!backendUri) return;

        // Define the WebSocket connection
        const ws_url = backendUri + sensorRoute;
        console.log("Connecting to WebSocket:", ws_url);
        const ws = new WebSocket(ws_url);

        // Event listener for when the connection opens
        ws.onopen = () => {
            console.debug("WebSocket Connection Opened");
        };

        // Event listener for incoming WebSocket messages
        ws.onmessage = (event) => {
            const message: SensorReading = JSON.parse(event.data);
            if (message) {
                setData(message.value);
            }
        };

        // Event listener for any errors with the WebSocket
        ws.onerror = (event) => {
            console.error("WebSocket Error", event);
        };

        // Event listener for when the connection closes
        ws.onclose = (event) => {
            console.debug("WebSocket Connection Closed", event.reason);
            setData(undefined);
        };

        // Store the WebSocket in state
        setSocket(ws);

        // Cleanup function to close the WebSocket when the component unmounts
        return () => {
            if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
                ws.close();
            }
        };
    }, [backendUri]);

    return (
        <div>
            <Statistic title={title} value={data} loading={data === undefined} precision={2}/>
        </div>
    );
}
