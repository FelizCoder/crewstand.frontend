"use client";

import { use, useEffect, useState } from "react";
import { FlowmeterWidgets } from "../sensors/ui/flowmeterWidgets";
import { InputConfirmed } from "../actuators/ui/inputConfirmed";
import useWebSocket from "../hooks/useWebSocket";
import { handleSetpointChange } from "./apiCalls";
import { Switch } from "antd";

export default function Page() {
  let [setpoint, setSetpoint] = useState<number>(0);

  const { data: websocketState, error } = useWebSocket<number | null>({
    hostname: window.location.hostname,
    route: "/v1/sensors/flowmeters/ws/setpoint/0",
  });

  useEffect(() => {
    if (typeof websocketState === "number") {
      setSetpoint(websocketState);
    }
  }, [websocketState]);

  const onSetpointChange = (newSetpoint: number) => {
    setSetpoint(newSetpoint);
  };

  const onSetpointConfirm = () => {
    handleSetpointChange(setpoint, 0);
  };

  const handleToggle = (checked: boolean) => {
    if (checked) {
      handleSetpointChange(setpoint, 0);
    } else {
      handleSetpointChange(null, 0);
    }
  };

  return (
    <div>
      <div>
        <h1>Flow Control Page</h1>
        {/* Flowmeter Value */}
        <h2>
          <span className="material-symbols-outlined">gas_meter</span>{" "}
          Flowmeters
        </h2>
        <FlowmeterWidgets />
      </div>
      <div>
        <Switch
          checked={typeof websocketState === "number"}
          onClick={(checked) => handleToggle(checked)}
        />
      </div>
      <div>
        <InputConfirmed
          min={0.0}
          max={25}
          precision={2}
          value={setpoint}
          onValueChange={onSetpointChange}
          onConfirm={onSetpointConfirm}
          disabled={!(typeof websocketState === "number")}
        />
      </div>
    </div>
  );
}
