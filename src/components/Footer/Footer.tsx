"use client";
import { type FC } from "react";

import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { BlockNumber } from "@/components/MainPane/components";

const Footer: FC = () => {
  return (
    <Box as="footer" p={"1rem"} position="sticky" bottom={0} zIndex={10} textAlign={"center"}>
      <Flex w={"full"} justifyContent={"space-between"}>
        <Link href="https://github.com/Azerty-Global" target="_blank" rel="noopener noreferrer">
          Azerty Global (c) 2024
        </Link>
        <BlockNumber />
      </Flex>
    </Box>
  );
};

export default Footer;
