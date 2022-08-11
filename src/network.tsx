import React, { useEffect, useContext, useState } from 'react';
import type { OnboardAPI, ConnectOptions } from '@web3-onboard/core';
import { useConnectWallet, useWallets } from '@web3-onboard/react';
import { useWeb3 } from './web3';
import delay from './utils/delay';

interface ContextData {
  web3Onboard?: OnboardAPI;
}

interface ContextActions {
  action?: any;
}

type Context = [ContextData, ContextActions];

const NetworkContext = React.createContext<Context>([
  // { defaultContract },
  {},
  {},
]);

const autoConnect = async (
  prevConnectedWallets: any,
  connect: (options?: ConnectOptions) => Promise<void>,
  onComplete: () => void,
) => {
  await delay(100);
  if (prevConnectedWallets?.length) {
    for (const walletLabel of prevConnectedWallets.reverse()) {
      await connect({
        autoSelect: {
          label: walletLabel,
          disableModals: true,
        },
      });
    }
  } else {
    await connect();
  }

  onComplete();
};

export const NetworkProvider: React.ComponentType<{ children: any }> = ({ children }) => {
  // const [{web3Onboard}] = useWeb3();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const connectedWallets = useWallets();
  const [walletInitialized, setWalletInitialized] = useState(false);

  useEffect(() => {
    const prevConnectedWalletsStr = window.localStorage.getItem('connectedWallets');
    const prevConnectedWallets = prevConnectedWalletsStr ? JSON.parse(prevConnectedWalletsStr) : null;

    autoConnect(prevConnectedWallets, connect, () => setWalletInitialized(true));
  }, [connect]);

  useEffect(() => {
    if (!walletInitialized) return;

    const connectedWalletsLabelArray = connectedWallets.map(
      ({ label }) => label
    )
    window.localStorage.setItem(
      'connectedWallets',
      JSON.stringify(connectedWalletsLabelArray),
    )

    if (!connectedWallets.length) {
      connect();
    }
  }, [connectedWallets, walletInitialized, connect]);

  // if (connecting) {
  //   return null;
  // }

  return (
    <>
      {children}
    </>
  )
}

export function useNetwork() {
  return useContext(NetworkContext);
}
