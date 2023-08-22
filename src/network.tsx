import React, { useEffect, useContext, useState } from 'react';
// import type { ConnectOptions, WalletState } from '@web3-onboard/core';
import { useConnectWallet, useWallets } from '@web3-onboard/react';
import delay from './utils/delay';
import { reConnectWallets, updateWallets } from './utils/wallets';

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

interface ProviderProps {
  children?: React.ReactNode;
  isAutoConnectDisabled?: Boolean;
}

export const NetworkProvider: React.ComponentType<ProviderProps> = ({ children, isAutoConnectDisabled }) => {
  const [, connect] = useConnectWallet();
  const connectedWallets = useWallets();
  const [walletInitialized, setWalletInitialized] = useState(false);

  useEffect(() => {
    (async () => {
      // Wait for wallet providers to be injected.
      await delay(100);
      reConnectWallets(connect, () => setWalletInitialized(true));
    })();
  }, [connect]);

  useEffect(() => {
    if (!walletInitialized) return;

    updateWallets(connectedWallets);

    if (!isAutoConnectDisabled && !connectedWallets.length) {
      connect();
    }
  }, [connectedWallets, walletInitialized, isAutoConnectDisabled, connect]);

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
