"use client";

import { useEffect, useState } from "react";
import { FlowmeterWidgets } from "../sensors/ui/flowmeterWidgets";
import SetpointInput from "./setpointInput";

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

        {isMounted && (
          <SetpointInput
            websocketHostname={window.location.hostname}
            route="/v1/sensors/flowmeters/ws/setpoint/0"
          />
        )}
      </div>
    </div>
  );
}
