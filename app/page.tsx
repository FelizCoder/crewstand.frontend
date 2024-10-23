"use client";

import { ActuatorEnum, SolenoidValve, ProportionalValve, Pump, GetAllV1ActuatorsGetResponse } from "./api";
import { getActuatorsList } from "./actuators/apiCalls";
import { useState, useEffect } from "react";
import { ActuatorSlider, pumpSwitch, solenoidSwitch } from "./actuators/ui";
import { Space } from "antd";



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
      <h2><span className="material-symbols-outlined">valve</span> Solenoid Valves</h2>
      {solenoidValves && solenoidValves.length > 0 && (
        <Space size={"large"} wrap>
          {solenoidValves.map((solenoid) => (
            solenoidSwitch(solenoid)
          ))}
        </Space>
      )}

      {/* Proportional Valves Section */}
      <h2><span className="material-symbols-outlined">valve</span> Proportional Valves</h2>
      {proportionalValves && proportionalValves.length > 0 && (
        <div>
          {proportionalValves.map((proportional) => (
            <ActuatorSlider {... proportional} />
          ))}
        </div>
      )}

      {/* Pumps Section */}
      <h2><span className="material-symbols-outlined">water_pump</span> Pumps</h2>
      {pumps && pumps.length > 0 && (
        <Space size={"large"} wrap>
          {pumps.map((pump) => (
            pumpSwitch(pump)
          ))}
        </Space>
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