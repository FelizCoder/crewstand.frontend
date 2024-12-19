"use client";
import { Switch } from "antd";
import { SolenoidValve, Pump } from "../../api";
import {
  handlePumpChange,
  handleSolenoidChange,
} from "../apiCalls";

export interface ActuatorControlProps {
  actuator: SolenoidValve | Pump;
  handleToggle: (id: number, checked: boolean) => void;
  defaultChecked: boolean;
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
