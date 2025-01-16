import { useEffect, useState } from "react";
import { ProportionalValve } from "../../api";
import { handleProportionalValveStateChange } from "../apiCalls";
import InputNumber from "antd/es/input-number";
import { Button, Slider } from "antd";
import useWebSocket from "../../hooks/useWebSocket";
import { InputConfirmed } from "./inputConfirmed";

export interface ProportionalSliderProps {
  proportional: ProportionalValve;
  wsHostname: string;
  wsStateRoute: string;
  wsCurrentPositionRoute: string;
}

export const ProportionalSlider: React.FC<ProportionalSliderProps> = ({
  proportional,
  wsHostname,
  wsStateRoute,
  wsCurrentPositionRoute,
}) => {
  const [sliderValue, setSliderValue] = useState<number>(proportional.state);
  const [inputValue, setInputValue] = useState<number>(proportional.state);

  const { data: websocketState, error } = useWebSocket<number>({
    hostname: wsHostname,
    route: wsStateRoute,
  });

  useEffect(() => {
    if (websocketState !== undefined) {
      setSliderValue(websocketState);
      setInputValue(websocketState);
    }
  }, [websocketState]);

  const handleConfirm = (value: number) => {
    handleProportionalValveStateChange(proportional.id, value);
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <div style={{ height: "50%" }}>
          <InputConfirmed
            value={inputValue}
            min={0}
            max={100}
            precision={0}
            onValueChange={setInputValue}
            onConfirm={handleConfirm}
          />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div className="bold-text" style={{ alignSelf: "flex-start" }}>
            {proportional.id}
          </div>
          <Slider
            style={{ width: "100%" }}
            value={sliderValue}
            onChange={(value) => {
              setSliderValue(value);
            }}
            onChangeComplete={(value) => {
              handleProportionalValveStateChange(proportional.id, value);
            }}
            min={0}
            max={100}
          />
        </div>
      </div>
    </div>
  );
};
