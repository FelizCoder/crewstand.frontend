"use client";
import { Switch } from "antd";
import { SolenoidValve, Pump } from "../../api";
import { handlePumpChange, handleSolenoidChange } from "../apiCalls";
import useWebSocket from "../../hooks/useWebSocket";

export interface ActuatorControlProps {
  actuator: SolenoidValve | Pump;
  websocketHostname: string;
  actuatorRoute: string;
}

export const ActuatorSwitch: React.FC<ActuatorControlProps> = ({
  actuator,
  websocketHostname,
  actuatorRoute,
}) => {
  const { data: switchState, error } = useWebSocket<boolean>({
    hostname: websocketHostname,
    route: actuatorRoute,
  });

  // Determine the handleToggle function based on the actuator type
  const handleToggle = (id: number, checked: boolean) => {
    if (actuator.type === "pump") {
      handlePumpChange(id, checked);
    } else if (actuator.type === "solenoid valve") {
      handleSolenoidChange(id, checked);
    } else {
      console.error("Unsupported actuator type");
    }
  };

  return (
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
        checked={switchState}
        onClick={(checked) => handleToggle(actuator.id, checked)}
      />
    </div>
  );
};
