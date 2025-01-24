"use client";

import { useEffect, useState } from "react";
import { FlowmeterWidgets } from "../sensors/ui/flowmeterWidgets";
import SetpointInput from "./setpointInput";

export default function Page() {
  const [hostname, setHostname] = useState<string | undefined>(undefined);

  useEffect(() => {
    setHostname(window.location.hostname);
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
