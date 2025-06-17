import { Button } from "antd";
import { queueRandomDayMission } from "./apiCalls";

export function RandomDayMissionButton() {
  return (
    <>
      <Button type="primary" onClick={queueRandomDayMission}>
        <span className="material-symbols-outlined">routine</span>
        Random Day
      </Button>
    </>
  );
}
