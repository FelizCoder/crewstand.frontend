import { Button, Flex } from "antd";
import React from "react";
import { handleSolenoidChange } from "../apiCalls";

export const HandleAllButtons = () => {
  return (
    <>
      <Flex wrap gap={"small"}>
        <Button
          variant="solid"
          color="danger"
          onClick={() => handleSolenoidChange(-1, false)}
        >
          close all
        </Button>
        <Button
          variant="solid"
          color="blue"
          onClick={() => handleSolenoidChange(-1, true)}
        >
          open all
        </Button>
      </Flex>
    </>
  );
};
