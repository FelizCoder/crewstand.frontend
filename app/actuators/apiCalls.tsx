"use server";
import {
  client,
  getAllActuatorsV1ActuatorsGet,
  getAllV1SensorsFlowmetersGet,
  setStateV1ActuatorsProportionalSetPost,
  setStateV1ActuatorsPumpSetPost,
  setStateV1ActuatorsSolenoidSetPost,
} from "../api";

client.setConfig({
  baseURL: process.env.BACKEND_URI,
  proxy: false,
});

export async function handleSolenoidChange(id: number, open: boolean) {
  console.debug("handleSolenoidChange: " + id + " " + open);
  const response = await setStateV1ActuatorsSolenoidSetPost({
    body: {
      id: id,
      state: open,
    },
  });
  console.debug("Server Response: \n" + JSON.stringify(response.data));
}

export async function handleProportionalValveStateChange(
  id: number,
  value: number
) {
  console.debug("handleProportionalValveChange: " + id + " " + value);
  const response = await setStateV1ActuatorsProportionalSetPost({
    body: {
      id: id,
      state: value,
    },
  }).then((response) => {
    if (response.data) {
      return response.data;
    }
  });

  response
    ? console.debug("Server Response: \n" + JSON.stringify(response))
    : console.warn("Could not read server Response");

  return response;
}

export async function handlePumpChange(id: number, checked: boolean) {
  console.debug("handlePumpChange: " + id + " " + checked);
  const response = await setStateV1ActuatorsPumpSetPost({
    body: {
      id: id,
      state: checked,
    },
  });
  console.debug("Server Response: \n" + JSON.stringify(response.data));
}
export async function getActuatorsList() {
  console.trace("Fetch Actuators from " + process.env.BACKEND_URI);
  try {
    const response = await getAllActuatorsV1ActuatorsGet();
    console.debug("Actuators Request: \n" + JSON.stringify(response.config));
    console.trace("Server Response Status: " + response.status);

    if (response.error) {
      console.error("Error fetching actuators: ", response.error);
      return [];
    }

    const actuators = response.data ? response.data : [];
    console.debug("Got Actuators List:\n" + JSON.stringify(actuators));
    return actuators;
  } catch (error) {
    console.error("Unexpected error while fetching actuators: ", error);
    return [];
  }
}

export async function getFlowmetersList() {
  console.trace("Fetch Flowmeters from " + process.env.BACKEND_URI);
  try {
    const response = await getAllV1SensorsFlowmetersGet();
    console.debug("Flowmeters Request: \n" + JSON.stringify(response.config));
    console.trace("Server Response Status: " + response.status);

    if (response.error) {
      console.error("Error fetching flowmeters: ", response.error);
      return [];
    }

    const flowmeters = response.data ? response.data : [];
    console.debug("Got Flowmeters List:\n" + JSON.stringify(flowmeters));
    return flowmeters;
  } catch (error) {
    console.error("Unexpected error while fetching flowmeters: ", error);
    return [];
  }
}
