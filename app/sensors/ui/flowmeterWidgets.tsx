"use client";

import { useEffect, useState } from "react";
import { Sensor } from "../../api";
import { getFlowmetersList } from "../../actuators/apiCalls";
import { Space } from "antd";
import { SensorStatistic } from "./sensorStatistic";

export const FlowmeterWidgets: React.FC = () => {
  let [flowmeters, setFlowmeters] = useState<Sensor[] | undefined>(undefined);

  async function listFlowmeters() {
    console.debug("Fetching Flowmeters");
    const flowmeters = await getFlowmetersList();
    setFlowmeters(flowmeters);
    console.debug("Got Flowmeters: \n" + JSON.stringify(flowmeters));
  }

  useEffect(() => {
    listFlowmeters();
  }, []);

  return (
    flowmeters &&
    flowmeters.length > 0 && (
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
    )
  );
};
