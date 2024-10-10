import { debug } from "console";
import { ActuatorEnum, getAllV1ActuatorsGet, SolenoidValve, ProportionalValve, Pump, client } from "../api";
import { Switch, Slider } from "antd";

client.setConfig({
    baseURL: "http://localhost:5000"
})

export default async function Page() {
    debug('Actuators Page');	
    const response = await getAllV1ActuatorsGet();
    const actuators = response.data ? response.data : [];
    debug(JSON.stringify(actuators));

    return (
        <div>
            <h1>Actuators Page</h1>
            {actuators.map(actuator => (
                <div key={actuator.type + String(actuator.id)}>
                    <h2>{actuator.type} - ID: {actuator.id}</h2>
                    {isSolenoidValve(actuator) && (
                        <Switch
                            checked={actuator.open}
                            // onChange={(checked) => handleSolenoidChange(actuator.id, checked)}
                        />
                    )}
                    {isProportionalValve(actuator) && (
                        <Slider
                            defaultValue={actuator.position}
                            // onChange={(value) => handleProportionalValveChange(actuator.id, value)}
                            min={0}
                            max={100}
                        />
                    )}
                    {isPump(actuator) && (
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

// async function handleSolenoidChange(id: number, open: boolean) {
//     const config = new Configuration({
//         basePath: "http://localhost:5000"
//     });
//     const api = new ActuatorsApi(config);
//     await api.updateSolenoidV1ActuatorsIdPut({ id, open });
// }

// async function handleProportionalValveChange(id: number, position: number) {
//     const config = new Configuration({
//         basePath: "http://localhost:5000"
//     });
//     const api = new ActuatorsApi(config);
//     await api.updateProportionalValveV1ActuatorsIdPut({ id, position });
// }

// async function handlePumpChange(id: number, running: boolean) {
//     const config = new Configuration({
//         basePath: "http://localhost:5000"
//     });
//     const api = new ActuatorsApi(config);
//     await api.updatePumpV1ActuatorsIdPut({ id, running });
//}

function isSolenoidValve(actuator: SolenoidValve | ProportionalValve | Pump): actuator is SolenoidValve {
    return actuator.type === ActuatorEnum.SOLENOID_VALVE;
}

function isProportionalValve(actuator: SolenoidValve | ProportionalValve | Pump): actuator is ProportionalValve {
    return actuator.type === ActuatorEnum.PROPORTIONAL_VALVE;
}

function isPump(actuator: SolenoidValve | ProportionalValve | Pump): actuator is Pump {
    return actuator.type === ActuatorEnum.PUMP;
}