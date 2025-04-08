"use client";

import { useEffect, useState } from "react";
import { FlowmeterWidgets } from "../sensors/ui/flowmeterWidgets";
import SetpointInput from "./setpointInput";
import { Button, Drawer, Space } from "antd";
import { HandleAllButtons } from "../actuators/ui/handleAllButtons";
import { ActuatorSwitch } from "../actuators/ui/actuatorSwitches";
import { SolenoidValve } from "../api";
import { getSolenoidsList } from "../actuators/apiCalls";
import { QueueMissionButton } from "./queueMissionDrawer";
import { HandleMissionActivityButtons } from "./handleMissionActivityButtons";

export default function Page() {
  const [hostname, setHostname] = useState<string | undefined>(undefined);
  let [solenoidValves, setSolenoidValves] = useState<
    SolenoidValve[] | undefined
  >(undefined);

  async function listSolenoids() {
    console.debug("Fetching Actuators");
    const solenoids = await getSolenoidsList();
    setSolenoidValves(solenoids);
    console.debug("Got Actuators: \n" + JSON.stringify(solenoids));
  }

  useEffect(() => {
    setHostname(window.location.hostname);
    listSolenoids();
  }, []);

  return (
    <div>
      <div>
        <h1>Flow Control Page</h1>
        <HandleMissionActivityButtons />
        {/* Flowmeter Value */}
        <h2>
          <span className="material-symbols-outlined">gas_meter</span>{" "}
          Flowmeters
        </h2>
        <FlowmeterWidgets />
        {/* Solenoid Valves Section */}
        <>
          <div>
            <Space wrap direction="horizontal" align="baseline" size={"large"}>
              <h2>
                <span className="material-symbols-outlined">valve</span>{" "}
                Solenoid Valves
              </h2>
              <HandleAllButtons />
            </Space>
          </div>
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
        </>

        {/* Setpoint Section */}
        <div>
          <Space wrap direction="horizontal" align="baseline" size={"large"}>
            <h2>
              <span className="material-symbols-outlined">play_arrow</span>{" "}
              Current Setpoint
            </h2>
            {solenoidValves && <QueueMissionButton valves={solenoidValves} />}
          </Space>
        </div>

        {hostname && (
          <SetpointInput
            websocketHostname={window.location.hostname}
            route="/v1/sensors/flowmeters/ws/setpoint/0"
          />
        )}
      </div>
      {hostname && (
        <div>
          <iframe
            src={`http://${hostname}:3000/d/feaybw7pu9k3ke/flow-rate?orgId=1&from=now-2m&to=now&timezone=browser&refresh=5s&kiosk`}
            height={750}
            width="100%"
          />
        </div>
      )}
    </div>
  );
}
