"use client";

import { ActuatorEnum, SolenoidValve, ProportionalValve, Pump, GetAllV1ActuatorsGetResponse } from "./api";
import { Switch, Slider } from "antd";
import { getActuatorsList, handleProportionalValveChange, handlePumpChange, handleSolenoidChange } from "./actuators/apiCalls";
import { useState, useEffect } from "react";

export default function Page() {
  console.debug('Actuators Page');
  let [actuators, setActuators] = useState<GetAllV1ActuatorsGetResponse>([]);

  useEffect(() => {
    listActuators();

    async function listActuators() {
      console.debug("Fetching Actuators");
      const actuators = await getActuatorsList();
      setActuators(actuators);
      console.debug("Got Actuators: \n" + JSON.stringify(actuators));
    }
  }, []);


  return (
    <div>
      <h1>Actuators Page</h1>
      {actuators.map(actuator => (
        <div key={actuator.type + String(actuator.id)}>
          <h2>{actuator.type} - ID: {actuator.id}</h2>
          {isSolenoidValve(actuator) && (
            <Switch
              defaultChecked={actuator.open}
              onClick={(checked) => handleSolenoidChange(actuator.id, checked)}
            />
          )}
          {isProportionalValve(actuator) && (
            <Slider
              defaultValue={actuator.position}
              onChangeComplete={(value) => handleProportionalValveChange(actuator.id, value)}
              min={0}
              max={100}
            />
          )}
          {isPump(actuator) && (
            <Switch
              defaultChecked={actuator.running}
              onClick={(checked) => handlePumpChange(actuator.id, checked)}
            />
          )}
        </div>
      ))}
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