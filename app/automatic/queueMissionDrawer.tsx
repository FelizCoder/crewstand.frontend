import { Button, Drawer } from "antd";
import { useState } from "react";

export function QueueMissionButton() {
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
        Foo
      </Drawer>
    </>
  );
}
