"use client";

import { ActuatorEnum, SolenoidValve, ProportionalValve, Pump, GetAllV1ActuatorsGetResponse } from "./api";
import { Slider } from "antd";
import { getActuatorsList, handleProportionalValveChange, handlePumpChange, handleSolenoidChange } from "./actuators/apiCalls";
import { useState, useEffect } from "react";
import { ActuatorSwitchRow } from "./actuators/ui";



export default function Page() {
  console.debug('Actuators Page');
  let [actuators, setActuators] = useState<GetAllV1ActuatorsGetResponse | undefined>(undefined);
  let [solenoidValves, setSolenoidValves] = useState<SolenoidValve[] | undefined>(undefined);
  let [proportionalValves, setProportionalValves] = useState<ProportionalValve[] | undefined>(undefined);
  let [pumps, setPumps] = useState<Pump[] | undefined>(undefined);

  async function listActuators() {
    console.debug("Fetching Actuators");
    const actuators = await getActuatorsList();
    setActuators(actuators);
    console.debug("Got Actuators: \n" + JSON.stringify(actuators));
  }

  useEffect(() => {
    listActuators()
  }, []);

  useEffect(() => {
    if (actuators) {
      const solenoidValves = actuators.filter(isSolenoidValve);
      const proportionalValves = actuators.filter(isProportionalValve);
      const pumps = actuators.filter(isPump);

      setSolenoidValves(solenoidValves);
      setProportionalValves(proportionalValves);
      setPumps(pumps);
    }
  }, [actuators])

  return (
    <div>
      <h1>Actuators Page</h1>

      {/* Solenoid Valves Section */}
      <h2>Solenoid Valves</h2>
      {solenoidValves && solenoidValves.length > 0 && (
        <div style={{ display: "flex", gap: "20px" }}>
          {solenoidValves.map((solenoid) => (
            <ActuatorSwitchRow
              key={solenoid.type + String(solenoid.id)}
              actuator={solenoid}
              defaultChecked={solenoid.open}
              handleToggle={handleSolenoidChange}
            />
          ))}
        </div>
      )}

      {/* Proportional Valves Section */}
      <h2>Proportional Valves</h2>
      {proportionalValves && proportionalValves.length > 0 && (
        <div>
          {proportionalValves.map((actuator) => (
            <div key={actuator.type + String(actuator.id)} style={{ marginBottom: "10px" }}>
              <div>{actuator.id}</div>
              <Slider
                defaultValue={actuator.position}
                onChangeComplete={(value) => handleProportionalValveChange(actuator.id, value)}
                min={0}
                max={100}
              />
            </div>
          ))}
        </div>
      )}

      {/* Pumps Section */}
      <h2>Pumps</h2>
      {pumps && pumps.length > 0 && (
        <div style={{ display: "flex", gap: "20px" }}>
          {pumps.map((pump) => (
            <ActuatorSwitchRow
              key={pump.type + String(pump.id)}
              actuator={pump}
              defaultChecked={pump.running}
              handleToggle={handlePumpChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function isSolenoidValve(actuator: SolenoidValve | ProportionalValve | Pump): actuator is SolenoidValve {
  return actuator.type === ActuatorEnum.SOLENOID_VALVE;
}

function isProportionalValve(actuator: SolenoidValve | ProportionalValve | Pump): actuator is ProportionalValve {
  return actuator.type === ActuatorEnum.PROPORTIONAL_VALVE;
}

function isPump(actuator: SolenoidValve | ProportionalValve | Pump): actuator is Pump {
  return actuator.type === ActuatorEnum.PUMP;
}