"use client";

import { useState, useEffect } from "react";
import { Space } from "antd";
import { MissionStats } from "./classificatrion/ui/missionStats";

export default function Page() {
  const [hostname, setHostname] = useState<string | undefined>(undefined);

  useEffect(() => {
    setHostname(window.location.hostname);
  }, []);

  return (
    <div>
      <h1>CREWSTAND DASHBOARD</h1>
      {hostname && (
        <div>
          <MissionStats
            missionRoute="/v1/missions/flow/completed"
            websocketHostname={hostname}
          />
        </div>
      )}
      {hostname && (
        <div>
          <iframe
            src={`http://${hostname}:3000/d/fej9lz2yz3sw0d/classification?folderUid=cej9lns9v9af4b&orgId=1&from=now-5m&to=now&timezone=browser&refresh=5s&viewPanel=panel-1&kiosk`}
            height={250}
            width="100%"
          />
        </div>
      )}
    </div>
  );
}
