import { InputNumber, Button } from "antd";

export interface InputControllerProps {
  value: number;
  min: number;
  max: number;
  precision: number;
  onValueChange: (value: number) => void;
  onConfirm: (value: number) => void;
}

export const InputConfirmed: React.FC<InputControllerProps> = ({
  value,
  min,
  max,
  precision,
  onValueChange,
  onConfirm,
}) => {
  const handleChange = (value: number | null) => {
    if (value !== null) {
      onValueChange(value);
    }
  };

  return (
    <div style={{ height: "50%" }}>
      <InputNumber
        style={{ flex: "none" }}
        min={min}
        max={max}
        value={value}
        precision={precision}
        onChange={handleChange}
        changeOnWheel={true}
      />
    </div>
  );
};
