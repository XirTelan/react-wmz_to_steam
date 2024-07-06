import { AbsoluteCenter, Box, extendTheme, Spinner } from "@chakra-ui/react";
import React from "react";
import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Box position="relative" h="100vh">
      <AbsoluteCenter p="4" axis="both">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="green.500"
          size="xl"
        />
      </AbsoluteCenter>
    </Box>
  );
};

export default Loading;
