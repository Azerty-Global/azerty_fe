// components/MainPane.tsx
import { type FC, useEffect, useState } from "react";

import { Box, Flex, Heading, useColorMode, Text, Button } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { readContracts } from "@wagmi/core";
import { erc20Abi, formatUnits, parseEther } from "viem";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import addresses from "@/addresses";
import creditModule from "@/app/abi/creditModule.json";
import { InfoText } from "@/components";
import { useNotify } from "@/hooks";
import styles from "@/styles/mainPane.module.css";
import { wagmiConfig } from "@/wagmi";

const RealDemo: FC = () => {
  const { address } = useAccount();
  const sdai_address = addresses["SDAI"];
  const credit_module = addresses["CREDIT_MODULE"];
  const [amountInWallet, setAmountInWallet] = useState<string>("0");
  const { data, error, isError, writeContract } = useWriteContract();
  const { data: receipt } = useWaitForTransactionReceipt({ hash: data });
  const { notifyError, notifySuccess } = useNotify();
  const coffeeEURAmount = "0.1";
  const [selectedCurrency, setSelectedCurrency] = useState<string>(sdai_address);
  const [conversionRate, setConversionRate] = useState<any>();
  const [canSafePay, setCanSafePay] = useState<boolean>(false);

  useEffect(() => {
    if (receipt) {
      notifySuccess({
        title: `TX successfully sent!`,
        message: `Hash: ${receipt.transactionHash}`,
      });
    }

    if (isError && error) {
      notifyError({
        title: "An error occured:",
        message: error.message,
      });
    }
  }, [receipt, isError, error, notifyError, notifySuccess]);

  const handleCanSafePay = () => {
    readContracts(wagmiConfig, {
      contracts: [
        {
          address: credit_module as `0x${string}`,
          // @ts-expect-error: data will be full
          abi: creditModule,
          functionName: "canSafePay",
          args: [address, parseEther(coffeeEURAmount)],
        },
      ],
    }).then((result) => {
      if (result[0]) {
        const arr: any = result[0].result;
        console.log("arr", arr);
        setCanSafePay(arr[0]);
        setConversionRate(arr[2]);
        setSelectedCurrency(arr[1]);

        writeContract({
          abi: erc20Abi,
          address: arr[1] as `0x${string}`,
          functionName: "approve",
          args: [credit_module as `0x${string}`, parseEther(coffeeEURAmount)],
        });
      }
    });
  };

  const handleCoffee = () => {
    // if (receiver.length === 0 || !isAddress(receiver)) {
    //   return notifyError({
    //     title: "Error:",
    //     message: "The receiver address is not set!",
    //   });
    // }

    writeContract({
      abi: creditModule,
      address: credit_module as `0x${string}`,
      functionName: "pay",
      args: [
        address,
        parseEther(coffeeEURAmount),
        selectedCurrency as `0x${string}`,
        "0xAaE8Bed6675a54c52b5731557075b39837F20c09",
        conversionRate,
      ],
    });
  };

  useEffect(() => {
    readContracts(wagmiConfig, {
      contracts: [
        {
          address: sdai_address as `0x${string}`,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [address as `0x${string}`],
        },
        {
          address: sdai_address as `0x${string}`,
          abi: erc20Abi,
          functionName: "decimals",
        },
      ],
    }).then((result) => {
      if (result[0]) {
        // @ts-expect-error: data will be full
        setAmountInWallet(formatUnits(result[0].result, result[1].result));
      }
    });
  }, [address]);
  return (
    <Box>
      <Text>You are connected with your SAFE</Text>
      <InfoText label={"sDAI Balance"} value={amountInWallet} />
      {!canSafePay && <Button onClick={handleCanSafePay}>Can Safe Pay</Button>}
      {canSafePay && <Button onClick={handleCoffee}>Pay</Button>}
    </Box>
  );
};

const NotSafe: FC = () => {
  return <Box>You are not connected with SAFE, please switch to SAFE account!</Box>;
};
const DemoPane: FC = () => {
  const { isConnected, connector } = useAccount();
  const { colorMode } = useColorMode();
  console.log("connector", connector);

  return (
    <Box
      className={styles.container}
      border={colorMode === "light" ? "none" : "1px solid rgba(152, 161, 192, 0.24)"}
    >
      <Heading as="h2" fontSize={"2rem"} mb={10} className="text-shadow">
        Demo
      </Heading>

      <Box px={12}></Box>

      <Flex className={styles.content}>
        {isConnected ? (
          connector?.id == "walletConnect" ? (
            <RealDemo />
          ) : (
            <NotSafe />
          )
        ) : (
          <ConnectButton />
        )}
      </Flex>
    </Box>
  );
};

export default DemoPane;
