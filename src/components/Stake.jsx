import { useContext, useState } from "react";
import { providers, Contract, utils } from "ethers";
import toast from "react-hot-toast";

import { UserContext } from "../context/UserContext";
import { contractAbi, contractAddress } from "../smartContract";
import { RPC_NETWORK_URLS } from "../utils/connectors";

const Stake = () => {
  const { library, chainId } = useContext(UserContext);

  const [minting, setMinting] = useState(false);

  const StakeMatic = async () => {
    setMinting(true);

    if (library.connection.url !== "metamask") {
      library.provider.http.connection.url = RPC_NETWORK_URLS[chainId];
    }

    const provider = await library.provider;
    const web3Provider = new providers.Web3Provider(provider);

    const contract = new Contract(
      contractAddress,
      contractAbi,
      web3Provider.getSigner()
    );

    const tx = await contract.stake({ value: utils.parseEther("5") });

    await tx
      .wait()
      .then(() => {
        setMinting(false);
        toast.success("You have successfully minted an Allowlist NFT");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="mt-8 w-full p-4 shadow-md rounded-sm bg-gray-200">
      {!minting ? <button onClick={StakeMatic}>Mint</button> : "Staking......."}
    </div>
  );
};

export default Stake;
