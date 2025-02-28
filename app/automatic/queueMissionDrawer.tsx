import { Button, Drawer } from "antd";
import { useState } from "react";
import QueueMissionForm from "./queueMissionForm";
import { SolenoidValve } from "../api";

interface QueueMissionButtonProps {
  valves: SolenoidValve[];
}

export function QueueMissionButton({valves}: QueueMissionButtonProps) {
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
        Queue Mission
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
