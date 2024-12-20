"use client";

import {
  SolenoidValve,
  ProportionalValve,
  Pump,
  GetAllActuatorsV1ActuatorsGetResponse,
  GetAllV1SensorsFlowmetersGetResponse,
} from "./api";
import { getActuatorsList, getFlowmetersList } from "./actuators/apiCalls";
import { useState, useEffect } from "react";
import { SensorStatistic } from "./sensors/ui/sensorStatistic";
import { Space } from "antd";
import { ProportionalSlider } from "./actuators/ui/proportionalSlider";
import { ActuatorSwitch } from "./actuators/ui/actuatorSwitches";

export default function Page() {
  console.debug("Actuators Page");
  let [actuators, setActuators] = useState<
    GetAllActuatorsV1ActuatorsGetResponse | undefined
  >(undefined);
  let [flowmeters, setFlowmeters] = useState<
    GetAllV1SensorsFlowmetersGetResponse | undefined
  >(undefined);
  let [solenoidValves, setSolenoidValves] = useState<
    SolenoidValve[] | undefined
  >(undefined);
  let [proportionalValves, setProportionalValves] = useState<
    ProportionalValve[] | undefined
  >(undefined);
  let [pumps, setPumps] = useState<Pump[] | undefined>(undefined);

  async function listActuators() {
    console.debug("Fetching Actuators");
    const actuators = await getActuatorsList();
    setActuators(actuators);
    console.debug("Got Actuators: \n" + JSON.stringify(actuators));
  }

  async function listFlowmeters() {
    console.debug("Fetching Flowmeters");
    const flowmeters = await getFlowmetersList();
    setFlowmeters(flowmeters);
    console.debug("Got Flowmeters: \n" + JSON.stringify(flowmeters));
  }

  useEffect(() => {
    listActuators();
    listFlowmeters();
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
  }, [actuators]);

  return (
    <div>
      <h1>Actuators Page</h1>
      {/* Flowmeter Value */}
      <h2>
        <span className="material-symbols-outlined">gas_meter</span> Flowmeters
      </h2>
      {flowmeters && flowmeters.length > 0 && (
        <Space size={"large"} wrap>
          {flowmeters.map((flowmeter) => (
            <SensorStatistic
              key={"flowmeter-statistic" + String(flowmeter.id)}
              title={"Flowmeter " + String(flowmeter.id)}
              websocketHostname={window.location.hostname}
              sensorRoute={"/v1/sensors/flowmeters/ws/" + String(flowmeter.id)}
            />
          ))}
        </Space>
      )}

      {/* Solenoid Valves Section */}
      <h2>
        <span className="material-symbols-outlined">valve</span> Solenoid Valves
      </h2>
      {solenoidValves && solenoidValves.length > 0 && (
        <Space size={"large"} wrap>
          {solenoidValves.map((solenoid) => (
            <ActuatorSwitch
              actuator={solenoid}
              websocketHostname={window.location.hostname}
              actuatorRoute={
                "/v1/actuators/solenoid/state/" + String(solenoid.id)
              }
              key={solenoid.type + String(solenoid.id)}
            />
          ))}
        </Space>
      )}

      {/* Proportional Valves Section */}
      <h2>
        <span className="material-symbols-outlined">valve</span> Proportional
        Valves
      </h2>
      {proportionalValves && proportionalValves.length > 0 && (
        <div>
          {proportionalValves.map((proportional) => (
            <ProportionalSlider
              key={proportional.type + String(proportional.id)}
              actuator={proportional}
              wsHostname={window.location.hostname}
              wsStateRoute={
                "/v1/actuators/proportional/state/" + String(proportional.id)
              }
              wsCurrentPositionRoute={""}
            />
          ))}
        </div>
      )}

      {/* Pumps Section */}
      <h2>
        <span className="material-symbols-outlined">water_pump</span> Pumps
      </h2>
      {pumps && pumps.length > 0 && (
        <Space size={"large"} wrap>
          {pumps.map((pump) => (
            <ActuatorSwitch
              key={pump.type + String(pump.id)}
              actuator={pump}
              websocketHostname={window.location.hostname}
              actuatorRoute={"/v1/actuators/pump/state/" + String(pump.id)}
            />
          ))}
        </Space>
      )}
    </div>
  );
}

function isSolenoidValve(
  actuator: SolenoidValve | ProportionalValve | Pump
): actuator is SolenoidValve {
  return actuator.type === "solenoid valve";
}

function isProportionalValve(
  actuator: SolenoidValve | ProportionalValve | Pump
): actuator is ProportionalValve {
  return actuator.type === "proportional valve";
}

function isPump(
  actuator: SolenoidValve | ProportionalValve | Pump
): actuator is Pump {
  return actuator.type === "pump";
}
