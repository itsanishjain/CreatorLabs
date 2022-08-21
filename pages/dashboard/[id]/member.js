import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { providers, Contract, utils } from "ethers";
import { UserContext } from "../../../src/context/UserContext";
import { contractAbi, contractAddress } from "../../../src/smartContract";
const Member = () => {
  const { isLoggedIn, account, library, chainId, isNFTOwned } =
    useContext(UserContext);
  const router = useRouter();

  const creatorAddress = "0x2eA3bF6B653375fb8facfB67F19937E46840a7d4";

  const getEarned = async () => {
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

    const res = await contract.earned(creatorAddress, account);

    console.log(parseFloat(res) / 10 ** 18);
  };

  const getRewardToken = async () => {
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

    const res = await contract.earned(creatorAddress, account);

    console.log(parseFloat(res) / 10 ** 18);
  };

  useEffect(() => {
    if (!isLoggedIn) return router.push("/login");
  }, [account, isLoggedIn, router]);

  return (
    <div className="mt-8 bg-white">
      <p>Member</p>
      <button onClick={getEarned}>Calculate Eearned</button>
      <button>Withdraw my tokens</button>
      <button>Withdraw my Stake</button>
    </div>
  );
};

export default Member;
