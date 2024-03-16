import type { FC } from "react";

import { useAccount, useReadContracts } from "wagmi";

import { InfoText } from "@/components";
import { erc20Abi, formatUnits } from "viem";
import addresses from "../../../addresses";

const Balance: FC = (): JSX.Element => {
  const { address } = useAccount();
  // const { data } = useBalance({ address });
  const moneriumEURAddress = addresses["MONERIUM_EURO"];
  const { data } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: moneriumEURAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [address as `0x${string}`],
      },
      {
        address: moneriumEURAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: "decimals",
      },
      {
        address: moneriumEURAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: "symbol",
      },
    ],
  });
  console.log("result", data);

  // @ts-ignore
  // const displayBalance = formatUnits(result[0]?.data, result[1]?.data);
  const displayBalance = data ? formatUnits(data[0], data[1]) : "0";

  return <InfoText label="EURe Balance" value={displayBalance} />;
};

export default Balance;
