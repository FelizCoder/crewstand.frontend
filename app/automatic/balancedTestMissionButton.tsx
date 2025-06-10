import { Button } from "antd";
import { queueBalancedTestMission } from "./apiCalls";

export function BalancedTestMissionButton() {
  return (
    <>
      <Button type="primary" onClick={queueBalancedTestMission}>
        <span className="material-symbols-outlined">casino</span>
        Balanced Test Set
      </Button>
    </>
  );
}
