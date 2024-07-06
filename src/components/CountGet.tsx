"use client";
import {
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  Flex,
  Divider,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Card,
  CardBody,
  Wrap,
  WrapItem,
  StatArrow,
  InputGroup,
  InputLeftAddon,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CountPageProps, RatesType } from "../../types";

const WEBMONEY_TAX = 0.18;
const WEBMONEY_COMISSION = 0.008;
const CountGet = ({ curRates, steamRates }: CountPageProps) => {
  const [rubToWmz, setRubToWmz] = useState<string | number>(0);
  const [totalRub, setTotalRub] = useState<string | number>(0);
  const res = (() => {
    const totalWmz = Number(totalRub) / Number(rubToWmz);
    const wmzToUse = totalWmz / (1 + WEBMONEY_TAX + WEBMONEY_COMISSION);
    const webMoneyFee = wmzToUse * WEBMONEY_TAX;
    const webMoneyComission = Math.max(
      0.01,
      (wmzToUse + webMoneyFee) * WEBMONEY_COMISSION
    );
    const totalKZT = wmzToUse * steamRates.KZT;
    const rubToKZT = (Number(totalRub) / curRates.RUB) * curRates.KZT;
    const percents = ((totalKZT - rubToKZT) / rubToKZT) * 100;
    const wmzFinal = totalWmz - webMoneyFee - webMoneyComission;
    return {
      totalWmz,
      wmzFinal,
      webMoneyFee,
      webMoneyComission,
      totalKZT,
      rubToKZT,
      percents,
    };
  })();
  return (
    <Box>
      <Flex gap={4} justify={"space-between"}>
        <Box>
          <Text mt={4} fontSize="md">
            1 WMZ to RUB Rate
          </Text>
          <InputGroup size="sm">
            <InputLeftAddon>₽</InputLeftAddon>
            <NumberInput
              colorScheme="green"
              step={0.1}
              defaultValue={0}
              value={rubToWmz}
              min={0}
              onChange={(event) => {
                setRubToWmz(event);
              }}
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
            RUB Total
          </Text>
          <InputGroup size="sm">
            <InputLeftAddon>₽</InputLeftAddon>
            <NumberInput
              defaultValue={0}
              min={0}
              value={totalRub}
              onChange={(event) => setTotalRub(event)}
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
                <Heading size="md"> WMZ</Heading>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Stat>
                    <StatLabel>WMZ you&apos;ll get</StatLabel>
                    <StatNumber>
                      {!isNaN(res.totalWmz) ? res.totalWmz.toFixed(2) : "0.00"}{" "}
                    </StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Service Fee (18%)</StatLabel>
                    <StatNumber
                      color={res.webMoneyFee > 0 ? "red.400" : "white"}
                    >
                      {!isNaN(res.webMoneyFee)
                        ? `-${res.webMoneyFee.toFixed(2)}`
                        : 0}{" "}
                    </StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>WebMoney comission (0.08%)</StatLabel>
                    <StatNumber
                      color={res.webMoneyComission > 0 ? "red.400" : "white"}
                    >
                      {!isNaN(res.webMoneyComission)
                        ? `-${res.webMoneyComission.toFixed(2)}`
                        : 0}{" "}
                    </StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>WMZ you can transfer:</StatLabel>
                    <StatNumber color="green.300">
                      {!isNaN(res.wmzFinal)
                        ? `~${res.wmzFinal.toFixed(2)}`
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
                <Heading size="md">Expected RUB to KZT</Heading>
              </CardHeader>
              <CardBody>
                <Stat>
                  <StatLabel> (according to the exchange rate)</StatLabel>
                  <StatNumber color="green.300">
                    {!isNaN(res.rubToKZT) ? res.rubToKZT.toFixed(2) : 0} ₸
                  </StatNumber>
                </Stat>
              </CardBody>
            </Card>
          </WrapItem>
        </Wrap>
        <Card mt={4}>
          <CardBody>
            <Stat>
              <StatLabel>You will get</StatLabel>
              <StatNumber color="green.300">
                {!isNaN(res.totalKZT)
                  ? `~${res.totalKZT.toFixed(2) || 0} ₸`
                  : `0 ₸`}
              </StatNumber>
              {!isNaN(res.percents) && (
                <StatHelpText>
                  <StatArrow
                    type={res.percents > 0 ? "increase" : "decrease"}
                  />
                  {res.percents.toFixed(2)}% (relative to expected)
                </StatHelpText>
              )}
            </Stat>
          </CardBody>
        </Card>
        <Text></Text>
      </Box>
    </Box>
  );
};

export default CountGet;
