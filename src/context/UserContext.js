import React, { createContext, useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import { connectors, uauth } from "../utils/connectors";
import Loader from "../components/Loader";

const CHAIN_ID = 5;

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const { account, activate, deactivate, chainId, library } = useWeb3React();

  const [UD, setUD] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [allowlistNFT, setAllowlistNFT] = useState({
    isActivated: false,
    isChainIdWrong: false,
  });

  const disconnect = () => {
    localStorage.removeItem("provider");
    setUD();
    deactivate();
  };

  const getUD = () => {
    uauth.uauth
      .user()
      .then((res) => {
        setUD(res.sub);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let walletName = localStorage.getItem("provider");
    activate(connectors[walletName]).then(() => {
      if (walletName === "uauth") getUD();
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
        UD,
        setUD,
        getUD,
      }}
    >
      {isLoading ? <Loader /> : children}
    </UserContext.Provider>
  );
};
