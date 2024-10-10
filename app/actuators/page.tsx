import { ActuatorsApi, Configuration, ActuatorEnum } from "../api";
import { Switch, Slider } from "antd";

export default async function Page() {
    const config = new Configuration({
        basePath: "http://localhost:5000"
    });
    const api = new ActuatorsApi(config);
    const response = await api.getActuatorsV1ActuatorsGet();
    const actuators = response.data;

    return (
        <div>
            <h1>Actuators Page</h1>
            {actuators.map(actuator => (
                <div key={actuator.id}>
                    <h2>{actuator.type} - ID: {actuator.id}</h2>
                    {actuator.type === ActuatorEnum.SolenoidValve && (
                        <Switch
                            checked={actuator.open}
                            // onChange={(checked) => handleSolenoidChange(actuator.id, checked)}
                        />
                    )}
                    {actuator.type === ActuatorEnum.ProportionalValve && (
                        <Slider
                            defaultValue={actuator.position}
                            // onChange={(value) => handleProportionalValveChange(actuator.id, value)}
                            min={0}
                            max={100}
                        />
                    )}
                    {actuator.type === ActuatorEnum.Pump && (
                        <Switch
                            checked={actuator.running}
                            // onChange={(checked) => handlePumpChange(actuator.id, checked)}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

async function handleSolenoidChange(id: number, open: boolean) {
    const config = new Configuration({
        basePath: "http://localhost:5000"
    });
    const api = new ActuatorsApi(config);
    await api.updateSolenoidV1ActuatorsIdPut({ id, open });
}

async function handleProportionalValveChange(id: number, position: number) {
    const config = new Configuration({
        basePath: "http://localhost:5000"
    });
    const api = new ActuatorsApi(config);
    await api.updateProportionalValveV1ActuatorsIdPut({ id, position });
}

async function handlePumpChange(id: number, running: boolean) {
    const config = new Configuration({
        basePath: "http://localhost:5000"
    });
    const api = new ActuatorsApi(config);
    await api.updatePumpV1ActuatorsIdPut({ id, running });
}
