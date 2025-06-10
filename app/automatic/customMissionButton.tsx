import { Button, Drawer } from "antd";
import { useState } from "react";
import QueueMissionForm from "./queueMissionForm";
import { SolenoidValve } from "../api";

interface CustomMissionButtonProps {
  valves: SolenoidValve[];
}

export function CustomMissionButton({valves}: CustomMissionButtonProps) {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const showDrawer = () => {
    setDrawerOpen(true);
  };

  const onDrawerClose = () => {
    setDrawerOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        <span className="material-symbols-outlined">summarize</span> Custom Mission
      </Button>

      <Drawer
        title="Queue Mission"
        placement="right"
        open={drawerOpen}
        onClose={onDrawerClose}
      >
        <QueueMissionForm valves={valves}/>
      </Drawer>
    </>
  );
}
