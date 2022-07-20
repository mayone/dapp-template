import React from 'react';
import { Web3Provider } from './web3';
import { NetworkProvider } from './network';
import logo from './logo.svg';
import './App.css';

const wrapHOC = <P,>(WrappedComponent: React.ComponentType<P>) => (props: P) => {
  return (
    <Web3Provider>
      <NetworkProvider>
        <WrappedComponent {...props} />
      </NetworkProvider>
    </Web3Provider>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

const WrappedApp = wrapHOC(App)

export default WrappedApp;
