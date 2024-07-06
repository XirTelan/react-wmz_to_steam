"use client";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  Card,
  CardBody,
  Divider,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  Wrap,
  WrapItem,
  Flex,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Tooltip,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { CountPageProps } from "../../types";
import { QuestionOutlineIcon } from "@chakra-ui/icons";

const WEBMONEY_TAX = 0.18;
const WEBMONEY_MAXFEE = 50;
const WEBMONEY_COMISSION = 0.008;

const CountNeed = ({ curRates, steamRates }: CountPageProps) => {
  const [wmzRate, setWmzRate] = useState<string | number>(0);
  const [targetKZT, setTargetKZT] = useState<string | number>(0);
  const res = (() => {
    const paymentAmount = Number(targetKZT) / steamRates.KZT;
    const webMoneyFee = Math.min(WEBMONEY_MAXFEE, paymentAmount * WEBMONEY_TAX);
    const totalBeforeComission = paymentAmount + webMoneyFee;
    const webMoneyComission = totalBeforeComission * WEBMONEY_COMISSION;
    const targetWMZ = totalBeforeComission + webMoneyComission;
    return {
      paymentAmount,
      webMoneyFee,
      webMoneyComission,
      targetWMZ,
      targetRUB: targetWMZ * Number(wmzRate),
    };
  })();
  return (
    <div>
      <Flex gap={4} justify={"space-between"}>
        <Box>
          <Text mt={4} fontSize="md">
            How much KZT do you need?
          </Text>
          <InputGroup size="sm">
            <InputLeftAddon>₸</InputLeftAddon>
            <NumberInput
              colorScheme="green"
              step={0.1}
              defaultValue={0}
              value={targetKZT}
              onChange={(event) => {
                setTargetKZT(event);
              }}
              min={0}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </InputGroup>
        </Box>
        <Box>
          <Text mt={4} fontSize="md">
            RUB per WMZ Rate
          </Text>
          <InputGroup size="sm">
            <InputLeftAddon>₽</InputLeftAddon>
            <NumberInput
              colorScheme="green"
              step={0.01}
              defaultValue={0}
              value={wmzRate}
              onChange={(event) => {
                setWmzRate(event);
              }}
              min={0}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </InputGroup>
        </Box>
      </Flex>

      <Divider my={4} />
      <Box mt={4}>
        <Wrap>
          <WrapItem>
            <Card>
              <CardHeader>
                <Heading size="md">Required WMZ</Heading>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Stat>
                    <StatLabel>
                      Payment Amount: {"  "}
                      <Tooltip
                        label="Shows how much you can get on steam"
                        aria-label="A tooltip"
                      >
                        <QuestionOutlineIcon />
                      </Tooltip>{" "}
                    </StatLabel>
                    <StatNumber>
                      {!isNaN(res.paymentAmount)
                        ? res.paymentAmount.toFixed(2)
                        : "0.00"}{" "}
                    </StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Service fee (18%):</StatLabel>
                    <StatNumber>
                      {!isNaN(res.webMoneyFee)
                        ? `+ ${res.webMoneyFee.toFixed(2)}`
                        : "0.00"}{" "}
                    </StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>WebMoney Comission (0.08%):</StatLabel>
                    <StatNumber>
                      {!isNaN(res.webMoneyComission)
                        ? `+ ${res.webMoneyComission.toFixed(2)}`
                        : "0.00"}{" "}
                    </StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Total WMZ:</StatLabel>
                    <StatNumber color="green.300">
                      {!isNaN(res.targetWMZ)
                        ? `${res.targetWMZ.toFixed(2)}`
                        : "0.00"}{" "}
                    </StatNumber>
                  </Stat>
                </Stack>
              </CardBody>
            </Card>
          </WrapItem>
          <WrapItem>
            <Card>
              <CardHeader>
                <Heading size="md">Total RUB:</Heading>
              </CardHeader>
              <CardBody>
                <Stat>
                  <StatNumber color="green.300">
                    {!isNaN(res.targetRUB) ? res.targetRUB.toFixed(2) : "0.00"}{" "}
                    ₽
                  </StatNumber>
                </Stat>
              </CardBody>
            </Card>
          </WrapItem>
        </Wrap>
      </Box>
    </div>
  );
};

export default CountNeed;
