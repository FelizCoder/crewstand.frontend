"use client";
import { InputNumber, Slider, Switch } from "antd";
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

export const ActuatorSlider: React.FC<ProportionalValve> = ( actuator ) => {
  const [position, setPosition] = useState(actuator.state);

  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ display: 'flex', gap: "10px", alignItems: 'center' }}>
        <div style={{ height: "50%" }}>
          <InputNumber
            style={{ flex: 'none' }}
            min={0}
            max={100}
            value={position}
            onChange={(value) => {
              if (value) {
                setPosition(value);
                handleProportionalValveChange(actuator.id, value);
              };
            }}
            changeOnWheel={true}
          />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div className="bold-text" style={{ alignSelf: 'flex-start' }}>{actuator.id}</div>
          <Slider
            style={{ width: '100%' }}
            value={position}
            onChange={(value) => setPosition(value)}
            onChangeComplete={(value) => {
              handleProportionalValveChange(actuator.id, value);
            }}
            min={0}
            max={100}
          />
        </div>
      </div>
    </div>
  );
}

export const PumpSwitch: React.FC<Pump> = (pump) => {
  return <ActuatorSwitch
    actuator={pump}
    defaultChecked={pump.state}
    handleToggle={handlePumpChange} />;
}

export const SolenoidSwitch: React.FC<SolenoidValve> = (solenoid) => {
  return <ActuatorSwitch
    actuator={solenoid}
    defaultChecked={solenoid.state}
    handleToggle={handleSolenoidChange} />;
}
