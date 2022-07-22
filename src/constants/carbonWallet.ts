import type { EIP1193Provider } from '@web3-onboard/common/dist/types';
import {
  InjectedWalletModule,
  InjectedNameSpace,
  InjectedProvider,
} from '@web3-onboard/injected-wallets/dist/types';
import carbonWalletIcon from '../assets/carbonwallet-icon.svg';

declare global {
  interface Window {
    carbon: EIP1193Provider;
  }
}

const carbonWallet: InjectedWalletModule = {
  // The label that will be displayed in the wallet selection modal
  label: 'Carbon Wallet',
  // The property on the window where the injected provider is defined
  // Example: window.ethereum
  injectedNamespace: 'carbon' as InjectedNameSpace,
  // A function that returns a bool indicating whether or not the provider is
  // of a certain identity. In this case, a unique property on the provider
  // is used to identify the provider.
  // In most cases this is in the format: `is<provider-name>`.
  // You may also include custom logic here if checking for the property
  // isn't sufficient.
  checkProviderIdentity: ({ provider }: { provider: InjectedProvider }) =>
    !!provider && !!provider['isCarbon'],

  // A method that returns a string of the wallet icon which will be displayed
  getIcon: async () => await carbonWalletIcon,
  // Returns a valid EIP1193 provider. In some cases the provider will need to be patched to satisfy the EIP1193 Provider interface
  getInterface: async () => ({
    provider: window.carbon,
  }),
  // A list of platforms that this wallet supports
  platforms: ['desktop'],
};

export default carbonWallet;
