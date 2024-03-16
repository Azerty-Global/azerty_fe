// components/MainPane.tsx
import { type FC } from "react";

import {
  Box,
  // Divider,
  Flex,
  Heading,
  useColorMode,
  Text,
  Button,
} from "@chakra-ui/react";
// import { useAccount } from "wagmi";

import styles from "@/styles/mainPane.module.css";
import BalanceMoneriumEUR from "@/components/MainPane2/components/BalanceMoneriumEUR";
import TransferEURe from "@/components/DepositPane/components/TransferEURe";
//
// import {
//   Status,
//   // Address,
//   // Chain,
//   // Balance,
//   // BlockNumber,
//   // TransferNative,
//   // SignMessage,
// } from "./components";
// import {BlockNumber} from "@/components/MainPane/components";

const DepositPane: FC = () => {
  // const { isConnected } = useAccount();
  const { colorMode } = useColorMode();

  return (
    <Box
      className={styles.container}
      border={colorMode === "light" ? "none" : "1px solid rgba(152, 161, 192, 0.24)"}
    >
      <Heading as="h2" fontSize={"2rem"} mb={10} className="text-shadow">
        Deposit EURe
      </Heading>

      <Box px={12}></Box>

      <Flex className={styles.content}>
        {/*<Status />*/}
        <Text>Deposit EURe to earn fees from payments.</Text>
        <Text></Text>
        <Box>
          <BalanceMoneriumEUR />
        </Box>
        <TransferEURe />
      </Flex>
    </Box>
  );
};

export default DepositPane;
