"use server";

import {
  client,
  postSetpointV1SensorsFlowmetersSensorIdSetpointPost,
} from "../api";

client.setConfig({
  baseURL: process.env.BACKEND_URI,
  proxy: false,
});

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
