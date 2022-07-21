import React, { useEffect, useContext, useState } from 'react';
import type { OnboardAPI } from '@web3-onboard/core';
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

export const NetworkProvider: React.ComponentType<{ children: any }> = ({ children }) => {
  // const [{web3Onboard}] = useWeb3();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const connectedWallets = useWallets();
  const [walletInitialized, setWalletInitialized] = useState(false);

  useEffect(() => {
    const prevConnectedWalletsStr = window.localStorage.getItem('connectedWallets');
    const prevConnectedWallets = prevConnectedWalletsStr ? JSON.parse(prevConnectedWalletsStr) : null;

    if (prevConnectedWallets?.length) {
      (async () => {
        await delay(100);
        // await connect({
        //   autoSelect: prevConnectedWallets[0],
        // });
        for (const walletLabel of prevConnectedWallets.reverse()) {
          await connect({
            autoSelect: {
              label: walletLabel,
              disableModals: true,
            },
          });
        }
        setWalletInitialized(true);
      })();
    } else {
      (async () => {
        await delay(100);
        await connect();
        setWalletInitialized(true);
      })();
    }
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
