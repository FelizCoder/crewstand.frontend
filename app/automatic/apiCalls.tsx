"use server";

import fs from 'fs';
import path from 'path';
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
  try {
    // Get the directory path for day trajectories
    const dirPath = path.join(process.cwd(), 'app/missions/dayTrajectories');
    
    // Read all files in the directory
    const files = fs.readdirSync(dirPath).filter(file => 
      file.endsWith('.json') && fs.statSync(path.join(dirPath, file)).isFile()
    );
    
    if (files.length === 0) {
      console.error("No trajectory files found in dayTrajectories directory");
      return;
    }
    
    // Select a random trajectory file
    const randomIndex = Math.floor(Math.random() * files.length);
    const randomTrajectory = files[randomIndex];
    
    console.debug(`Selected random day trajectory: ${randomTrajectory}`);
    
    // Load the trajectory file
    const missionQueue = (await import(`../missions/dayTrajectories/${randomTrajectory}`))
      .default as unknown as FlowControlMission[];
      
    // Queue the mission
    addToQueueV1MissionsFlowQueuePost({ body: missionQueue })
      .then(() => {
        console.debug(`Random day mission (${randomTrajectory}) queued successfully!`);
      })
      .catch((error) => {
        console.error("Failed to queue random day mission. Please check the inputs.");
        console.error("Error: ", error);
      });
  } catch (error) {
    console.error("Error loading random day trajectory:", error);
  }
}

export async function setMissionServiceActive(active: boolean) {
  setActiveV1MissionsFlowActivePost({ query: { active: active } });
}
