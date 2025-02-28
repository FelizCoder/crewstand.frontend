import React, { useEffect } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, Select, Space } from "antd";
import { queueMission, TrajectoryItem } from "./apiCalls";
import { SolenoidValve } from "../api";

interface QueueMissionFormProps {
  valves: SolenoidValve[];
}


const QueueMissionForm: React.FC<QueueMissionFormProps> = ({valves}) => {
  // Enhance state management with useState
  const [valve, setValve] = React.useState<string | undefined>(undefined);
  const [trajectory, setTrajectory] = React.useState<TrajectoryItem[]>([]);
  const [inputError, setInputError] = React.useState<string | undefined>(
    undefined
  );
  const [form] = Form.useForm();

  useEffect(() => {
    if (valve == undefined) {
      setInputError("Valve is required!");
    } else if (trajectory.length == 0) {
      setInputError("Trajectory is required!");
    } else if (!isValidTrajectory()) {
      setInputError(
        "Invalid trajectory! Time values must be in ascending order and unique."
      );
    } else {
      setInputError(undefined);
    }
  }, [trajectory, valve]);

  const isValidTrajectory = (): boolean => {
    for (let i = 1; i < trajectory.length; i++) {
      if (trajectory[i].time <= trajectory[i - 1].time) {
        return false;
      }
    }
    return true;
  };

  const handleAddPoint = () => {
    const index = trajectory.length;
    const lastTime = index > 0 ? trajectory[index - 1].time : 0;
    const newTime = lastTime + 10;
    const newFlow = 0.0;
    const newTrajectory = [...trajectory, { time: newTime, flow: newFlow }];
    setTrajectory(newTrajectory);
    form.setFieldValue(`trajectory_time_${index}`, newTime);
    form.setFieldValue(`trajectory_flow_${index}`, newFlow);
  };

  const handleRemovePoint = (indexToRemove: number) => {
    // Remove the point from the trajectory
    const newTrajectory = trajectory.filter(
      (_, index) => index !== indexToRemove
    );
    // Update the trajectory state
    setTrajectory(newTrajectory);

    // Define the shape of fieldsObj
    type FieldsObj = { [key: string]: number };
    // Synchronize the form fields with the updated trajectory state
    form.setFieldsValue({
      ...newTrajectory.reduce((fieldsObj: FieldsObj, item, index) => {
        fieldsObj[`trajectory_time_${index}`] = item.time;
        fieldsObj[`trajectory_flow_${index}`] = item.flow;
        return fieldsObj;
      }, {} as FieldsObj),
    });
  };

  const handleTimeChange = (value: number, index: number) => {
    const updatedTrajectory = [...trajectory];
    updatedTrajectory[index].time = value;
    setTrajectory(updatedTrajectory);
  };

  const handleFlowChange = (value: number, index: number) => {
    const updatedTrajectory = [...trajectory];
    updatedTrajectory[index].flow = value;
    setTrajectory(updatedTrajectory);
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (valve == undefined) {
      console.error("Valve must be specified!");
      return;
    }

    queueMission(parseInt(valve), trajectory)
      .then(() => {
        console.debug("Mission queued successfully!");
      })
      .catch((error) => {
        console.error("Failed to queue mission. Please check the inputs.");
        console.error("Error:", error);
      });
  };

  return (
    <Form form={form} name="queue_mission" autoComplete="off">
      <Form.Item
        label="Valve"
        name="valve"
        rules={[{ required: true, message: "Please select a valve!" }]}
      >
        <Select value={valve} onChange={setValve} placeholder="Select valve">
          {valves.map((valve) => (
            <Select.Option key={valve.id} value={valve.id}>
              Valve {valve.id}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <p>Flow Trajectory:</p>
      {trajectory.map((point, index) => (
        <Space
          key={index} // Ensures unique and changing keys to force re-render
          style={{ display: "flex", marginBottom: 8 }}
          align="baseline"
        >
          <Form.Item
            key={`time_item_${index}`} // Use a dynamic key
            name={`trajectory_time_${index}`}
            initialValue={point.time}
            rules={[{ required: true, message: "Missing Time" }]}
          >
            <Input
              placeholder="Time (s)"
              type="number"
              min={0}
              style={{ width: "120px" }}
              onChange={(e) => handleTimeChange(e.target.valueAsNumber, index)}
            />
          </Form.Item>
          <Form.Item
            key={`flow_item_${index}`} // Use a dynamic key
            name={`trajectory_flow_${index}`}
            initialValue={point.flow}
            rules={[{ required: true, message: "Missing flow rate" }]}
          >
            <Input
              placeholder="Flow rate (l/min)"
              type="number"
              min={0}
              style={{ width: "120px" }}
              onChange={(e) => handleFlowChange(e.target.valueAsNumber, index)}
            />
          </Form.Item>
          <MinusCircleOutlined
            onClick={() => {
              handleRemovePoint(index);
            }}
          />
        </Space>
      ))}

      <Form.Item>
        <Button
          type="dashed"
          onClick={() => {
            handleAddPoint();
          }}
          block
          icon={<PlusOutlined />}
        >
          Add Point
        </Button>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={inputError !== undefined}
        >
          Submit Mission
        </Button>
        {inputError && <Alert message={inputError} type="error" showIcon />}
      </Form.Item>
    </Form>
  );
};

export default QueueMissionForm;
