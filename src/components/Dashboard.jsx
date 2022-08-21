import { useContext, useState } from "react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { providers, Contract, utils } from "ethers";

import { UserContext } from "../context/UserContext";
import { contractAbi, contractAddress } from "../smartContract";
const Dashboard = ({ data }) => {
  const { isLoggedIn, account, library, chainId } = useContext(UserContext);
  const [earning, setEearning] = useState(0);
  const [withdraw, setWitdraw] = useState(false);

  const getEarnings = async () => {
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

    const res = await contract.earned(data.creator, account);

    console.log(parseFloat(res) / 10 ** 18);
    setEearning(parseFloat(res));
  };

  const withdrawStakedToken = async () => {
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

    await contract.withdraw(data.creator, utils.parseEther("0.00002"));

    console.log("Witdraw success");
  };

  const withdrawRewardToken = async () => {
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

    await contract.getReward(data.creator);

    console.log("Witdraw success");
  };

  return (
    <div className="m-8 mx-auto max-w-xl px-2">
      <div
        className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 
        dark:hover:bg-gray-700"
      >
        {/* GOLDEN CODE */}
        <div className="w-full h-96 md:h-auto md:w-48">
          <Image
            src={data.profileImage}
            alt="hero image"
            width="100%"
            height="100%"
            layout="responsive"
          />
        </div>

        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data.name}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {data.description}
          </p>
          <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
            <Link href={`/${data.id}`}>
              <a className="bg-gradient-to-r from-green-400 to-green-600 p-2 block text-white rounded-sm text-center">
                Public Page
              </a>
            </Link>
            {data.creator === account && (
              <Link href={`/dashboard/${data.id}/settings`}>
                <a className="bg-gradient-to-r from-green-400 to-green-600 p-2 block text-white rounded-sm text-center">
                  Settings
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="bg-red-500 flex justify-between">
        <div
          onClick={getEarnings}
          className="bg-green-500 flex flex-col justify-between"
        >
          <span>Total Earnings</span>
          <span>{earning}</span>
        </div>
        <div onClick={withdrawStakedToken} className="bg-pink-500">
          <span>Withdraw Funds</span>
          <span>{withdraw ? "DONE" : "NONE"}</span>
        </div>
        <div onClick={withdrawRewardToken} className="bg-blue-500">
          <span>Witdraw Rewards</span>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Dashboard;

// <Link href={`/dashboard/${data.id}/member`}>
//                 <a className="bg-gradient-to-r from-green-400 to-green-600 p-2 block text-white rounded-sm text-center">
//                   Member
//                 </a>
//               </Link>
