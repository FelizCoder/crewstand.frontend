import { InputNumber, Button } from "antd";

export interface InputControllerProps {
  value: number;
  min: number;
  max: number;
  precision: number;
  disabled?: boolean;
  onValueChange: (value: number) => void;
  onConfirm: (value: number) => void;
}

export const InputConfirmed: React.FC<InputControllerProps> = ({
  value,
  min,
  max,
  precision,
  disabled,
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
        disabled={disabled}
      />
      <Button type="primary" onClick={() => onConfirm(value)} disabled={disabled}>
        Confirm
      </Button>
    </div>
  );
};
