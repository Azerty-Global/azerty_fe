// components/MainPane.tsx
import { type FC } from "react";

import { Box, Flex, Heading, useColorMode, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import { BalanceMoneriumEUR, TransferEURe } from "@/components/atomicComponents";
import styles from "@/styles/mainPane.module.css";

const DepositPane: FC = () => {
  const { isConnected } = useAccount();
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
        {isConnected ? <TransferEURe /> : <ConnectButton />}
      </Flex>
    </Box>
  );
};

export default DepositPane;
