import { init } from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';
import carbonWallet from './carbonWallet';
import appLogo from '../assets/dapp-logo.svg';
import appIcon from '../assets/dapp-icon.svg';

const infuraKey = 'de6e66cb509c43e0897d062c93f15d9e';

const aminoXIcon = `
  <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_1767_2442)">
      <path d="M11.6514 95.9302H6.18625C5.13849 95.9324 4.10761 95.6665 3.1917 95.1576C2.2758 94.6488 1.50535 93.914 0.953693 93.0232C0.377516 92.1501 0.0512565 91.1359 0.0102632 90.0906C-0.0307302 89.0452 0.215107 88.0086 0.721136 87.093L4.32579 79.7674C4.83028 78.7505 5.60983 77.8955 6.57588 77.2994C7.54193 76.7034 8.65577 76.3901 9.7909 76.3953H15.256C16.3038 76.3931 17.3347 76.6591 18.2506 77.1679C19.1665 77.6768 19.9369 78.4115 20.4886 79.3023C21.0648 80.1755 21.391 81.1897 21.432 82.235C21.473 83.2803 21.2272 84.3169 20.7211 85.2325L17.1165 92.5581C16.6374 93.5948 15.8636 94.4675 14.8917 95.0672C13.9198 95.6669 12.7928 95.967 11.6514 95.9302Z" fill="url(#paint0_linear_1767_2442)"/>
      <path d="M95.3723 86.9767L53.5118 3.37208C53.0028 2.35899 52.2221 1.50733 51.2571 0.91222C50.292 0.317105 49.1805 0.00195312 48.0467 0.00195312C46.9129 0.00195312 45.8014 0.317105 44.8364 0.91222C43.8713 1.50733 43.0907 2.35899 42.5816 3.37208L12.349 63.8372C11.8978 64.7688 11.683 65.7971 11.7236 66.8314C11.7642 67.8657 12.0588 68.8741 12.5816 69.7674C13.1113 70.6261 13.8448 71.3408 14.7171 71.8479C15.5893 72.355 16.5733 72.6389 17.5816 72.6744H55.256C56.3038 72.6766 57.3347 72.4106 58.2506 71.9018C59.1665 71.393 59.9369 70.6582 60.4886 69.7674C61.0648 68.8943 61.391 67.8801 61.432 66.8347C61.473 65.7894 61.2272 64.7528 60.7211 63.8372L58.2793 58.9535C57.7748 57.9366 56.9952 57.0816 56.0292 56.4855C55.0631 55.8894 53.9493 55.5762 52.8142 55.5814H35.7211L48.163 30.6977L78.977 92.4418C79.4815 93.4587 80.261 94.3137 81.227 94.9098C82.1931 95.5059 83.3069 95.8191 84.4421 95.8139H89.9072C90.9549 95.8161 91.9858 95.5502 92.9017 95.0413C93.8176 94.5325 94.5881 93.7977 95.1397 92.907C95.6635 92.0139 95.9587 91.0055 95.9993 89.971C96.0399 88.9365 95.8245 87.908 95.3723 86.9767ZM48.0467 6.0465C48.8056 6.0465 49.5475 6.27154 50.1786 6.69318C50.8096 7.11482 51.3014 7.71411 51.5918 8.41527C51.8823 9.11643 51.9583 9.88796 51.8102 10.6323C51.6621 11.3767 51.2967 12.0604 50.76 12.597C50.2234 13.1337 49.5397 13.4991 48.7953 13.6472C48.051 13.7952 47.2794 13.7193 46.5783 13.4288C45.8771 13.1384 45.2778 12.6466 44.8562 12.0155C44.4346 11.3845 44.2095 10.6426 44.2095 9.8837C44.2186 8.86883 44.6258 7.8981 45.3435 7.18045C46.0611 6.4628 47.0318 6.0556 48.0467 6.0465ZM85.9537 89.0697C85.637 89.087 85.3226 89.0071 85.0525 88.8409C84.7824 88.6747 84.5694 88.43 84.4421 88.1395L53.6281 26.6279C53.1302 25.5969 52.3554 24.7247 51.3903 24.1087C50.4252 23.4926 49.3078 23.1571 48.163 23.1395C47.0123 23.1327 45.8821 23.444 44.8971 24.0391C43.9122 24.6342 43.1109 25.4898 42.5816 26.5116L28.977 53.6046C28.5257 54.5362 28.3109 55.5646 28.3515 56.5988C28.3921 57.6331 28.6867 58.6415 29.2095 59.5349C29.7509 60.435 30.5191 61.1773 31.4374 61.6875C32.3556 62.1976 33.3917 62.4577 34.4421 62.4418H51.1863C51.5029 62.4246 51.8174 62.5045 52.0875 62.6707C52.3576 62.8369 52.5705 63.0816 52.6979 63.3721C52.8336 63.636 52.9002 63.93 52.8915 64.2266C52.8828 64.5233 52.7991 64.8128 52.6481 65.0683C52.4971 65.3238 52.2839 65.5369 52.0282 65.6876C51.7726 65.8383 51.4829 65.9218 51.1863 65.9302H31.8839C30.5148 65.9277 29.169 65.5763 27.9733 64.9094C26.7777 64.2424 25.7717 63.2818 25.0503 62.1182C24.3288 60.9547 23.9158 59.6264 23.8501 58.2589C23.7843 56.8914 24.0681 55.5297 24.6746 54.3023L40.7211 22.2093C41.3997 20.864 42.4384 19.7334 43.7215 18.9435C45.0046 18.1536 46.4818 17.7353 47.9886 17.7353C49.4953 17.7353 50.9726 18.1536 52.2557 18.9435C53.5388 19.7334 54.5775 20.864 55.256 22.2093L87.4653 86.5116C87.6011 86.7755 87.6677 87.0695 87.659 87.3662C87.6503 87.6628 87.5665 87.9524 87.4155 88.2079C87.2646 88.4634 87.0513 88.6764 86.7957 88.8271C86.54 88.9779 86.2503 89.0613 85.9537 89.0697Z" fill="url(#paint1_linear_1767_2442)"/>
      <path d="M84.0929 16.1628C82.84 16.1666 81.6168 16.545 80.5807 17.2496C79.5446 17.9541 78.743 18.9525 78.2789 20.1163L60.7789 63.9535C61.2528 64.8607 61.4757 65.8779 61.4246 66.9001C61.3735 67.9222 61.0502 68.9122 60.4882 69.7675C59.7797 70.9053 58.7178 71.7794 57.465 72.2559L48.0464 95.814H59.7906C61.0417 95.8026 62.2615 95.421 63.2961 94.7175C64.3307 94.0139 65.1339 93.0198 65.6045 91.8605L95.8371 16.1628H84.0929Z" fill="url(#paint2_linear_1767_2442)"/>
    </g>
    <defs>
      <linearGradient id="paint0_linear_1767_2442" x1="0.0932276" y1="86.1628" x2="21.5118" y2="86.1628" gradientUnits="userSpaceOnUse">
        <stop stop-color="#1B42AD"/>
        <stop offset="1" stop-color="#00276E"/>
      </linearGradient>
      <linearGradient id="paint1_linear_1767_2442" x1="11.7211" y1="47.907" x2="96.0002" y2="47.907" gradientUnits="userSpaceOnUse">
        <stop stop-color="#1B42AD"/>
        <stop offset="1" stop-color="#00276E"/>
      </linearGradient>
      <linearGradient id="paint2_linear_1767_2442" x1="48.0464" y1="55.9884" x2="95.8371" y2="55.9884" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FF536C"/>
        <stop offset="1" stop-color="#FFA10A"/>
      </linearGradient>
      <clipPath id="clip0_1767_2442">
        <rect width="96" height="95.9302" fill="white"/>
      </clipPath>
    </defs>
  </svg>
`;

const injected = injectedModule({
  custom: [carbonWallet],
});

const mainnets = [
  {
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: `https://mainnet.infura.io/v3/${infuraKey}`,
    blockExplorerUrl: 'https://etherscan.io/',
  },
  {
    id: '0x38',
    token: 'BNB',
    label: 'BNB Smart Chain Mainnet',
    rpcUrl: 'https://bsc-dataseed1.binance.org/',
    blockExplorerUrl: 'https://bscscan.com/',
  },
  {
    id: '0x343B',
    token: 'ACT',
    label: 'Amino X',
    color: 'white',
    icon: aminoXIcon,
    rpcUrl: 'https://aminox.node.alphacarbon.network/',
    blockExplorerUrl: 'https://aminox.blockscout.alphacarbon.network/',
  },
  {
    id: '0x89',
    token: 'MATIC',
    label: 'Polygon Mainnet',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorerUrl: 'https://polygonscan.com/',
  },
];

const testnets = [
  // {
  //   id: '0x4',
  //   token: 'ETH',
  //   label: 'Rinkeby Testnet',
  //   rpcUrl: `https://rinkeby.infura.io/v3/${infuraKey}`,
  //   blockExplorerUrl: 'https://rinkeby.etherscan.io/',
  // },
  {
    id: '0x5',
    token: 'ETH',
    label: 'Goerli Testnet',
    rpcUrl: `https://goerli.infura.io/v3/${infuraKey}`,
    blockExplorerUrl: 'https://goerli.etherscan.io/',
  },
  {
    id: '0x61',
    token: 'BNB',
    label: 'BNB Smart Chain Testnet',
    rpcUrl: 'https://data-seed-prebsc-1-s3.binance.org:8545/',
    blockExplorerUrl: 'https://testnet.bscscan.com/',
  },
  {
    id: '0x343A',
    token: 'TACT',
    label: 'Amino X Testnet',
    color: 'white',
    icon: aminoXIcon,
    rpcUrl: 'https://aminoxtestnet.node.alphacarbon.network/',
    blockExplorerUrl:
      'https://aminoxtestnet.blockscout.alphacarbon.network/',
  },
  {
    id: '0x13881',
    token: 'MATIC',
    label: 'Mumbai',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com',
    blockExplorerUrl: 'https://mumbai.polygonscan.com/',
  },
];

const localTestnets = [
  {
    id: '0x539',
    token: 'ETH',
    label: 'ethereum geth',
    rpcUrl: 'http://localhost:8545',
    blockExplorerUrl: 'http://localhost',
  },
  {
    id: '0x22B8',
    token: 'TACT',
    label: 'Amino X Testnet',
    rpcUrl: 'http://localhost:9933',
    blockExplorerUrl: 'http://localhost',
  },
];

const initWeb3Onboard = init({
  wallets: [injected],
  chains:
    process.env.BUILD_MODE === 'production'
      ? mainnets
      : process.env.BUILD_MODE === 'staging'
        ? testnets
        : localTestnets,
  appMetadata: {
    name: 'DApp Template',
    // #NOTE: DApp Icon in Account Center
    icon: appIcon,
    // #NOTE: DApp Logo in Onboard
    logo: appLogo,
    description: 'Welcome to DApp Template',
    // gettingStartedGuide?: string;
    // explore?: string;
    // /** When no injected wallets detected, recommend the user to install some*/
    recommendedInjectedWallets: [
      {
        name: 'MetaMask',
        url: 'https://metamask.io/',
      },
      {
        name: 'Carbon wallet',
        url: 'https://chrome.google.com/webstore/detail/carbon-wallet/pnphepacpjpklpbacfmebicbgndobakn',
      },
    ],
    // agreement?: TermsOfServiceAgreementOptions | null;
  },
  connect: {
    showSidebar: false,
  },
  theme: 'system',
});

export default initWeb3Onboard;
