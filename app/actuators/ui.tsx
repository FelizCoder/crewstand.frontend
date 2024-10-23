"use client";
import { Slider, Switch } from "antd";
import { SolenoidValve, Pump, ProportionalValve } from "../api";
import { handleProportionalValveChange, handlePumpChange, handleSolenoidChange } from "./apiCalls";
import { useState } from "react";

export interface ActuatorControlProps {
  actuator: SolenoidValve | Pump;
  handleToggle: (id: number, checked: boolean) => void;
  defaultChecked: boolean;
}

export const ActuatorSwitch: React.FC<ActuatorControlProps> = ({ actuator, handleToggle, defaultChecked }) => (
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

export const ActuatorSlider: React.FC<ProportionalValve> = (actuator) => {
  const [position, setPosition] = useState(actuator.position);


  return (
    <div key={actuator.type + String(actuator.id)} style={{ marginBottom: "10px" }}>
      <div className="bold-text">{actuator.id}</div>
      <Slider
        value={position}
        onChange={(value) => setPosition(value)}
        onChangeComplete={(value) => {
          handleProportionalValveChange(actuator.id, value);
        }}
        min={0}
        max={100}
      />
    </div>
  );
}

export function pumpSwitch(pump: Pump) {
  return <ActuatorSwitch
    key={pump.type + String(pump.id)}
    actuator={pump}
    defaultChecked={pump.running}
    handleToggle={handlePumpChange} />;
}

export function solenoidSwitch(solenoid: SolenoidValve) {
  return <ActuatorSwitch
    key={solenoid.type + String(solenoid.id)}
    actuator={solenoid}
    defaultChecked={solenoid.open}
    handleToggle={handleSolenoidChange} />;
}
