"use server";

import { json } from "stream/consumers";
import {
  addToQueueV1MissionsFlowQueuePost,
  client,
  FlowControlMission,
  postSetpointV1SensorsFlowmetersSensorIdSetpointPost,
  TrajectoryPoint,
  setActiveV1MissionsFlowActivePost,
} from "../api";

client.setConfig({
  baseURL: process.env.BACKEND_URI,
  proxy: false,
});

export interface TrajectoryItem {
  time: number;
  flow: number;
}

export async function handleSetpointChange(
  setpoint: number | null,
  sensorId: number
) {
  postSetpointV1SensorsFlowmetersSensorIdSetpointPost({
    body: { setpoint: setpoint },
    path: {
      sensor_id: sensorId,
    },
  }).then((response) => {
    if (response.data) {
      return response.data;
    }
  });
}
export async function queueMission(
  valveId: number,
  flowTrajectoryItems: TrajectoryItem[]
) {
  const flowTrajectoryPoints: TrajectoryPoint[] = flowTrajectoryItems.map(
    (item) => [item.time, item.flow]
  );
  const mission: FlowControlMission = {
    valve_id: valveId,
    flow_trajectory: flowTrajectoryPoints,
  };
  console.log("Mission:", mission);

  addToQueueV1MissionsFlowQueuePost({ body: [mission] })
    .then(() => {
      console.log("Mission queued successfully!");
    })
    .catch((error) => {
      console.error("Failed to queue mission. Please check the inputs.");
      console.error("Error:", error);
    });
}

export async function queueBalancedTestMission() {
  const missionQueue = (await import("../missions/balanced_mission.json"))
    .default as unknown as FlowControlMission[];

  addToQueueV1MissionsFlowQueuePost({ body: missionQueue })
    .then(() => {
      console.log("Balanced test missions queued successfully!");
    })
    .catch((error) => {
      console.error(
        "Failed to queue balanced test mission. Please check the inputs."
      );
      console.error("Error: ", error);
    });
}

export async function queueRandomDayMission() {
  
}

export async function setMissionServiceActive(active: boolean) {
  setActiveV1MissionsFlowActivePost({ query: { active: active } });
}
