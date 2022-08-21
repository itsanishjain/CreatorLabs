import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { UserContext } from "../src/context/UserContext";
import Mint from "../src/components/Mint";

import allowlistNFTImage from "../src/images/AllowlistFinalNFT.png";

const ActivatePass = () => {
  const { isLoggedIn, allowlistNFT } = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) return router.push("/login");
  }, [isLoggedIn, router]);

  return (
    <div className="mt-8 max-w-3xl mx-auto flex flex-col items-center space-y-4">
      <p className="text-xl text-center">Activate Pass</p>
      <div className="w-full md:w-1/2 p-1">
        <div className="w-full h-auto overflow-hidden object-cover">
          {/* <Image src={allowlistNFTImage} alt="hero image" /> */}
          <div className="bg-gradient-to-b from-green-500 w-92 h-64 text-center">
            <span className="text-black text-2xl font-bold ">StakeLabs</span>
          </div>
        </div>
      </div>
      {!allowlistNFT.isActivated ? (
        <p className="font-mono text-xl text-green-400">Activated</p>
      ) : !allowlistNFT.isChainIdWrong ? (
        <Mint />
      ) : (
        <p>Please connect to Goerli Testnet</p>
      )}
    </div>
  );
};

export default ActivatePass;
