"use client";

import { useState } from "react";
import { FlowmeterWidgets } from "../sensors/ui/flowmeterWidgets";
import { InputConfirmed } from "../actuators/ui/inputConfirmed";

export default function Page() {
  let [setpoint, setSetpoint] = useState<number>(0);

  const onSetpointChange = (newSetpoint: number) => {
    setSetpoint(newSetpoint);
  };

  const onSetpointConfirm = () => {
    console.log("Setpoint confirmed: ", setpoint);
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
        <InputConfirmed
          min={0.0}
          max={25}
          precision={2}
          value={setpoint}
          onValueChange={onSetpointChange}
          onConfirm={onSetpointConfirm}
        />
      </div>
    </div>
  );
}
