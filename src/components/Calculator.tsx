"use client";
import {
  Container,
  Grid,
  GridItem,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Divider,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CountGet from "./CountGet";
import CountNeed from "./CountNeed";
import Widget from "./Widget";
import { RatesData, RatesType, SteamData } from "../../types";
import { getSteamHelperRate } from "@/actions/api";
import Loading from "./Loading";

const Calculator = ({ currencyRates }: { currencyRates: RatesType }) => {
  const [steamRates, setSteamRates] = useState<RatesType | null | undefined>();
  useEffect(() => {
    const loadData = async () => {
      try {
        //must be on client side since req from rsc vercel deploy will get 403
        const res = await fetch(
          "https://api.steaminventoryhelper.com/steam-rates?base=USD",
          {
            headers: {
              authority: "api.steaminventoryhelper.com",
              Origin: "api.steaminventoryhelper.com",
            },
            next: { revalidate: 3600 },
          }
        );
        if (!res.ok) {
          console.error(`${res.status}\n${JSON.stringify(res)}`);
          return null;
        }
        const data: SteamData = await res.json();
        if (!data.success) return undefined;
        setSteamRates(data.data.rates);
      } catch (error) {
        console.error(error);
        throw new Error(`getSteamHelperRate error: ${JSON.stringify(error)}`);
      }
    };
    loadData();
  }, []);
  if (!steamRates) return <Loading />;
  return (
    <div>
      <Container maxW={"container.xl"} mt={4}>
        <Grid templateColumns="1fr 30%" gap={"1rem"}>
          <GridItem>
            <Tabs colorScheme="green" variant="enclosed-colored">
              <TabList>
                <Tab>How much will you get</Tab>
                <Tab>How much do you need</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <CountGet curRates={currencyRates} steamRates={steamRates} />
                </TabPanel>
                <TabPanel>
                  <CountNeed curRates={currencyRates} steamRates={steamRates} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </GridItem>
          <GridItem>
            <Widget label={"Currency exchange rates"} rates={currencyRates} />
            <Divider my={"1rem"} />
            <Widget label={"Steam exchange rates "} rates={steamRates} />
          </GridItem>
        </Grid>
      </Container>
    </div>
  );
};

export default Calculator;
