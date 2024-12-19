import { useEffect, useState } from "react";
import { ProportionalValve } from "../../api";
import { getWebsocketBase } from "../../utils/getWebsocketBase";
import { handleProportionalValveStateChange } from "../apiCalls";
import InputNumber from "antd/es/input-number";
import { Slider } from "antd";


export interface ProportionalSliderProps {
  actuator: ProportionalValve;
  wsHostname: string;
  wsStateRoute: string;
  wsCurrentPositionRoute: string;
}

export const ProportionalSlider: React.FC<ProportionalSliderProps> = ({
  actuator,
  wsHostname,
  wsStateRoute,
  wsCurrentPositionRoute,
}) => {
  const [proportionalState, setProportionalState] = useState<number>(
    actuator.state
  );
  const [, setSocket] = useState<WebSocket | null>(null);
  const [backendUri, setBackendUri] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    async function getAndSetBackendUri() {
      const backendUri = await getWebsocketBase(wsHostname);
      setBackendUri(backendUri);
    }
    getAndSetBackendUri();
  }, []);
  
  useEffect(() => {
    if (!backendUri) return;
    
    // Define the WebSocket connection
    const ws_url = backendUri + wsStateRoute;
    console.log("Connecting to WebSocket:", ws_url);
    const ws = new WebSocket(ws_url);
    
    // Event listener for when the connection opens
    ws.onopen = () => {
      console.debug("WebSocket Connection Opened");
    };
    
    // Event listener for incoming WebSocket messages
    ws.onmessage = (event) => {
      const newState: number | void =
      (event.data as number) ||
      console.error("Invalid state received from WebSocket");
      if (newState) {
        setProportionalState(newState);
      }
    };
    
    // Event listener for any errors with the WebSocket
    ws.onerror = (event) => {
      console.error("WebSocket Error", event);
    };
    
    // Event listener for when the connection closes
    ws.onclose = (event) => {
      console.debug("WebSocket Connection Closed", event.reason);
    };
    
    // Store the WebSocket in state
    setSocket(ws);
    
    // Cleanup function to close the WebSocket when the component unmounts
    return () => {
      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING
      ) {
        ws.close();
      }
    };
  }, [backendUri]);
  
  return (
    <div style={{ marginBottom: "10px" }}>
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
    <div style={{ height: "50%" }}>
    <InputNumber
    style={{ flex: "none" }}
    min={0}
    max={100}
    value={proportionalState}
    onChange={(value) => {
      if (value) {
        setProportionalState(value);
        handleProportionalValveStateChange(actuator.id, value);
      }
    }}
    changeOnWheel={true}
    />
    </div>
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
    <div className="bold-text" style={{ alignSelf: "flex-start" }}>
    {actuator.id}
    </div>
    <Slider
    style={{ width: "100%" }}
    value={proportionalState}
    onChange={(value) => setProportionalState(value)}
    onChangeComplete={(value) => {
      handleProportionalValveStateChange(actuator.id, value);
    }}
    min={0}
    max={100}
    />
    </div>
    </div>
    </div>
  );
};