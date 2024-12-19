"use client";
import { InputNumber, Slider, Switch } from "antd";
import { SolenoidValve, Pump, ProportionalValve } from "../api";
import {
  handleProportionalValveStateChange,
  handlePumpChange,
  handleSolenoidChange,
} from "./apiCalls";
import { useEffect, useState } from "react";
import { getWebsocketBase } from "../utils/getWebsocketBase";

export interface ActuatorControlProps {
  actuator: SolenoidValve | Pump;
  handleToggle: (id: number, checked: boolean) => void;
  defaultChecked: boolean;
}

export interface ProportionalSliderProps {
  actuator: ProportionalValve;
  wsHostname: string;
  wsStateRoute: string;
  wsCurrentPositionRoute: string;
}

const ActuatorSwitch: React.FC<ActuatorControlProps> = ({
  actuator,
  handleToggle,
  defaultChecked,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
    }}
  >
    <div className="bold-text">{actuator.id}</div>
    <Switch
      defaultChecked={defaultChecked}
      onClick={(checked) => handleToggle(actuator.id, checked)}
    />
  </div>
);

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

export const PumpSwitch: React.FC<Pump> = (pump) => {
  return (
    <ActuatorSwitch
      actuator={pump}
      defaultChecked={pump.state}
      handleToggle={handlePumpChange}
    />
  );
};

export const SolenoidSwitch: React.FC<SolenoidValve> = (solenoid) => {
  return (
    <ActuatorSwitch
      actuator={solenoid}
      defaultChecked={solenoid.state}
      handleToggle={handleSolenoidChange}
    />
  );
};
