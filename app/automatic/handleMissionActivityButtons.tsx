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
          Pause Mission Execution
        </Button>
        <Button
          variant="solid"
          color="blue"
          onClick={() => setMissionServiceActive(true)}
        >
          Continue Mission Execution
        </Button>
      </Flex>
    </>
  );
};
