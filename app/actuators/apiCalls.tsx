"use server";
import { ActuatorEnum, client, getAllV1ActuatorsGet, setStateV1ActuatorsProportionalSetPost, setStateV1ActuatorsPumpSetPost, setStateV1ActuatorsSolenoidSetPost } from "../api";

client.setConfig({
  baseURL: process.env.BACKEND_URI,
  proxy: false,
});

export async function handleSolenoidChange(id: number, open: boolean) {
  console.debug("handleSolenoidChange: " + id + " " + open);
  const response = await setStateV1ActuatorsSolenoidSetPost({
    body: {
      type: ActuatorEnum.SOLENOID_VALVE,
      id: id,
      open: open
    }
  });
  console.debug("Server Response: \n" + JSON.stringify(response.data));
};

export async function handleProportionalValveChange(id: number, value: number) {
  console.debug("handleProportionalValveChange: " + id + " " + value);
  const response = await setStateV1ActuatorsProportionalSetPost({
    body: {
      type: ActuatorEnum.PROPORTIONAL_VALVE,
      id: id,
      position: value
    }
  }).then(
    (response) => { if (response.data) { return response.data }}
  )
  
  response ? 
  console.debug("Server Response: \n" + JSON.stringify(response)) :
  console.warn("Could not read server Response");

  return response;
}

export async function handlePumpChange(id: number, checked: boolean) {
  console.debug("handlePumpChange: " + id + " " + checked);
  const response = await setStateV1ActuatorsPumpSetPost({
    body: {
      type: ActuatorEnum.PUMP,
      id: id,
      running: checked
    }
  });
  console.debug("Server Response: \n" + JSON.stringify(response.data));
}
export async function getActuatorsList() {
  console.debug("Fetch Actuators from " + process.env.BACKEND_URI);
  try {
    const response = await getAllV1ActuatorsGet();
    console.debug("Server Request: \n" + JSON.stringify(response.config));
    console.debug("Server Response Status: " + response.status);
    
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

