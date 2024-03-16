// components/MainPane.tsx
import { type FC } from "react";

import { Box, Flex, Heading, useColorMode, Text, Button } from "@chakra-ui/react";

import BalanceMoneriumEUR from "@/components/atomicComponents/BalanceMoneriumEUR";
import styles from "@/styles/mainPane.module.css";

const MainPane: FC = () => {
  // const { isConnected } = useAccount();
  const { colorMode } = useColorMode();

  return (
    <Box
      className={styles.container}
      border={colorMode === "light" ? "none" : "1px solid rgba(152, 161, 192, 0.24)"}
    >
      <Heading as="h2" fontSize={"2rem"} mb={10} className="text-shadow">
        Kelza Markets
      </Heading>

      <Box px={12}></Box>

      <Flex className={styles.content}>
        {/*<Status />*/}
        <Text>
          Kelza Markets is a decentralized market makers for Gnosis Pay users who wants to use their
          yield bearing tokens in their payments.
        </Text>
        <Text>
          By depositing you will earn the fee generated from the payments on top of EURe Lending APY
        </Text>
        <Box>
          <BalanceMoneriumEUR />
        </Box>
        <Text>
          <b>Estimated APY</b>: 10% + 8% (EURe Lending APY + Payment Fee APY)
        </Text>
        <Button
          mx={6}
          py={8}
          colorScheme={"green"}
          onClick={() => {
            window.open("/deposit", "_self");
          }}
          // onClick={handleSignMessage}
          // isLoading={isPending}
          // className="custom-button"
        >
          <Heading size={"md"}>Deposit</Heading>
        </Button>
      </Flex>
    </Box>
  );
};

export default MainPane;
