"use client";
import { Switch } from "antd";
import { SolenoidValve, Pump } from "../api";

export interface ActuatorControlProps {
  actuator: SolenoidValve | Pump;
  handleToggle: (id: number, checked: boolean) => void;
  defaultChecked: boolean;
}

export const ActuatorSwitchRow: React.FC<ActuatorControlProps> = ({ actuator, handleToggle, defaultChecked }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
    }}
  >
    <div className="bold-text">{actuator.id}</div>
    <Switch defaultChecked={defaultChecked} onClick={(checked) => handleToggle(actuator.id, checked)} />
  </div>
);