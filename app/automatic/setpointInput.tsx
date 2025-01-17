"use client";

import React, { useEffect, useState } from "react";
import useWebSocket from "../hooks/useWebSocket";
import { handleSetpointChange } from "./apiCalls";
import { Switch } from "antd";
import { InputConfirmed } from "../actuators/ui/inputConfirmed";

export interface SetpointInputProps {
  websocketHostname: string;
  route: string;
}

const SetpointInput: React.FC<SetpointInputProps> = ({
  websocketHostname,
  route,
}) => {
  let [setpoint, setSetpoint] = useState<number>(0);

  const { data: websocketState, error } = useWebSocket<number | null>({
    hostname: websocketHostname,
    route: route,
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
};

export default SetpointInput;
