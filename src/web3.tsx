import React, { useEffect, useContext, useState } from 'react';
import type { OnboardAPI } from '@web3-onboard/core';
import initWeb3Onboard from './initWeb3Onboard';

interface ContextData {
  web3Onboard?: OnboardAPI;
}

interface ContextActions {
  action?: any;
}

type Context = [ContextData, ContextActions];

const Web3Context = React.createContext<Context>([
  // { defaultContract },
  {},
  {},
]);

export const Web3Provider: React.ComponentType<{children: any}> = ({ children }) => {
  const [web3Onboard, setWeb3Onboard] = useState<OnboardAPI>();

  useEffect(() => {
    setWeb3Onboard(initWeb3Onboard);
  }, []);

  if (!web3Onboard) return <div>Loading...</div>;

  return (
    <Web3Context.Provider
      value={[
        {
          web3Onboard,
        },
        {
          // Actions
        },
      ]}
    >
      {children}
    </Web3Context.Provider>
  );
};

export function useWeb3() {
  return useContext(Web3Context);
}
