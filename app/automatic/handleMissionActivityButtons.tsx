import { Button, Flex } from "antd";
import React from "react";
import { setMissionServiceActive } from "./apiCalls";

export const HandleMissionActivityButtons = () => {
  return (
    <>
      <Flex wrap gap={"small"}>
        <Button
          variant="solid"
          color="danger"
          onClick={() => setMissionServiceActive(false)}
        >
          Stop Mission Execution
        </Button>
        <Button
          variant="solid"
          color="blue"
          onClick={() => setMissionServiceActive(true)}
        >
          Start Mission Execution
        </Button>
      </Flex>
    </>
  );
};
