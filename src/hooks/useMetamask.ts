/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo, useCallback } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { formatBalance } from "../utils/formmatter";

const initialWalletState = { accounts: [], balance: "", chainId: "" };

const useMetamask = () => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const [wallet, setWallet] = useState(initialWalletState);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const disableConnect = useMemo(
    () => Boolean(wallet) && isConnecting,
    [isConnecting, wallet]
  );

  const updateWallet = useCallback(async (accounts: any) => {
    const balance = formatBalance(
      await window.ethereum!.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })
    );

    const chainId = await window.ethereum!.request({
      method: "eth_chainId",
    });
    setWallet({ accounts, balance, chainId });
  }, []);

  const handleConnect = useCallback(async () => {
    setIsConnecting(true);
    setError(false);

    try {
      const accounts: [] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setError(false);
      updateWallet(accounts);
    } catch (err: any) {
      setError(true);
      setErrorMessage(err.message);
    } finally {
      setIsConnecting(false);
    }
  }, [updateWallet]);

  useEffect(() => {
    const refreshAccounts = (accounts: any) => {
      if (accounts.length > 0) {
        updateWallet(accounts);
      } else {
        setWallet(initialWalletState);
      }
    };

    const refreshChain = (chainId: any) => {
      setWallet((wallet) => ({ ...wallet, chainId }));
    };

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));

      if (provider) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        refreshAccounts(accounts);
        window.ethereum.on("accountsChanged", refreshAccounts);
        window.ethereum.on("chainChanged", refreshChain);
      }
    };

    getProvider();

    return () => {
      window.ethereum?.removeListener("accountsChanged", refreshAccounts);
      window.ethereum?.removeListener("chainChanged", refreshChain);
    };
  }, [updateWallet]);

  return {
    hasProvider,
    wallet,
    disableConnect,
    handleConnect,
    error,
    errorMessage,
    setError,
  };
};

export default useMetamask;
