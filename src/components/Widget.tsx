import React from "react";
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  StackDivider,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";
import { RatesType } from "../../types";
const Widget = ({ label, description, rates }: WidgetProps) => {
  return (
    <section>
      <Card>
        <CardHeader>
          <Heading size="md">{label}</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Text fontSize="sm">1 USD to</Text>
            <Flex gap={"1rem"} align={"center"}>
              <Heading size="xs" textTransform="uppercase">
                KZT:
              </Heading>
              <Text color="green.300" fontSize="sm">
                {rates.KZT.toFixed(2)}
              </Text>
            </Flex>
            <Flex gap={"1rem"} align={"center"}>
              <Heading size="xs" textTransform="uppercase">
                RUB:
              </Heading>
              <Text color="green.300" fontSize="sm">
                {rates.RUB.toFixed(2)}
              </Text>
            </Flex>
          </Stack>
        </CardBody>
      </Card>
    </section>
  );
};

type WidgetProps = {
  label: string;
  description?: string;
  rates: RatesType;
};

export default Widget;
