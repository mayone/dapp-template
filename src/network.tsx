import React, { useEffect, useContext, useState } from 'react';
import type { ConnectOptions, WalletState } from '@web3-onboard/core';
import { useConnectWallet, useWallets } from '@web3-onboard/react';
import delay from './utils/delay';

interface ContextData {
  data?: any;
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

const reConnect = async (
  prevConnectedWallets: any,
  connect: (options?: ConnectOptions) => Promise<WalletState[]>,
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
  }

  onComplete();
};

interface ProviderProps {
	children?: React.ReactNode;
}

export const NetworkProvider: React.ComponentType<ProviderProps> = ({ children }) => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const connectedWallets = useWallets();
  const [walletInitialized, setWalletInitialized] = useState(false);

  useEffect(() => {
    const prevConnectedWalletsStr = window.localStorage.getItem('connectedWallets');
    const prevConnectedWallets = prevConnectedWalletsStr ? JSON.parse(prevConnectedWalletsStr) : null;

    reConnect(prevConnectedWallets, connect, () => setWalletInitialized(true));
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
    <NetworkContext.Provider
      value={[
        {
          // Data
        },
        {
          // Actions
        },
      ]}
    >
      {children}
    </NetworkContext.Provider>
  )
}

export function useNetwork() {
  return useContext(NetworkContext);
}
