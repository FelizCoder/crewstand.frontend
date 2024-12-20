import { useEffect, useState } from "react";
import { ProportionalValve } from "../../api";
import { handleProportionalValveStateChange } from "../apiCalls";
import InputNumber from "antd/es/input-number";
import { Button, Slider } from "antd";
import useWebSocket from "../../hooks/useWebSocket";

export interface ProportionalSliderProps {
  actuator: ProportionalValve;
  wsHostname: string;
  wsStateRoute: string;
  wsCurrentPositionRoute: string;
}

export const ProportionalSlider: React.FC<ProportionalSliderProps> = ({
  actuator,
  wsHostname,
  wsStateRoute,
  wsCurrentPositionRoute,
}) => {
  const [sliderValue, setSliderValue] = useState<number>(actuator.state);
  const [inputValue, setInputValue] = useState<number>(actuator.state);

  const { data: websocketState, error } = useWebSocket<number>({
    hostname: wsHostname,
    route: wsStateRoute,
  });

  useEffect(() => {
    if (websocketState) {
      setSliderValue(websocketState);
      setInputValue(websocketState);
    }
  }, [websocketState]);

  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <div style={{ height: "50%" }}>
          <InputNumber
            style={{ flex: "none" }}
            min={0}
            max={100}
            value={inputValue}
            precision={0}
            onChange={(value) => {
              if (value) {
                setInputValue(value);
              }
            }}
            changeOnWheel={true}
          />
          <Button
            type="primary"
            onClick={() => {
              handleProportionalValveStateChange(actuator.id, inputValue);
            }}
          >
            Confirm
          </Button>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div className="bold-text" style={{ alignSelf: "flex-start" }}>
            {actuator.id}
          </div>
          <Slider
            style={{ width: "100%" }}
            value={sliderValue}
            onChange={(value) => {
              setSliderValue(value);
            }}
            onChangeComplete={(value) => {
              handleProportionalValveStateChange(actuator.id, value);
            }}
            min={0}
            max={100}
          />
        </div>
      </div>
    </div>
  );
};
