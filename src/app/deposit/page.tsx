"use client";
import { Box, Flex } from "@chakra-ui/react";

import { DepositPane, Footer, Header } from "@/components";

export default function Home() {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Header />

      <Box as="main" flex={1} p={4}>
        <DepositPane />
      </Box>

      <Footer />
    </Flex>
  );
}
