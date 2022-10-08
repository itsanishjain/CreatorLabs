import React, { createContext, useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import { connectors } from "../utils/connectors";
import Loader from "../components/Loader";

const CHAIN_ID = 5;

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const { account, activate, deactivate, chainId, library } = useWeb3React();

  const [isLoading, setIsLoading] = useState(true);
  const [allowlistNFT, setAllowlistNFT] = useState({
    isActivated: false,
    isChainIdWrong: false,
  });

  const disconnect = () => {
    localStorage.removeItem("provider");
    deactivate();
  };

  useEffect(() => {
    activate(connectors[localStorage.getItem("provider")]).then(() => {
      setIsLoading(false);
    });
  }, [activate]);

  useEffect(() => {
    if (!account) return;
  }, [account, library]);

  return (
    <UserContext.Provider
      value={{
        account,
        chainId,
        library,
        activate,
        disconnect,
        deactivate,
        allowlistNFT,
        isLoggedIn: !!account,
      }}
    >
      {isLoading ? <Loader /> : children}
    </UserContext.Provider>
  );
};
