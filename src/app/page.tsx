import CountGet from "@/components/CountGet";
import Widget from "@/components/Widget";
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
import { getExchangeRate, getSteamHelperRate } from "@/actions/api";
import CountNeed from "@/components/CountNeed";
import Calculator from "@/components/Calculator";

export const dynamic = "force-dynamic";

export default async function Home() {
  const currencyRates = await getExchangeRate();

  if (!currencyRates) return <div>Error</div>;
  return (
    <main>
      <Calculator currencyRates={currencyRates} />
    </main>
  );
}
