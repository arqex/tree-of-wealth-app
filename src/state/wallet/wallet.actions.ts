import { ethers } from "ethers";
import { AccountLoader, invalidateAccount, invalidateNetwork } from "./wallet.loaders";
import { onSignerConnected } from "./wallet.reducers";
import { setWeb3Provider } from "./wallet.selectors";
import detectEthereumProvider from '@metamask/detect-provider'

export async function initializeWallet() {
  const ethereum = await detectEthereumProvider() as ethers.providers.ExternalProvider;
  if( ethereum ){
    setWeb3Provider(ethereum);
    // Listen to network and account changes
    // @ts-ignore
    ethereum.on('accountsChanged', invalidateAccount );
    // @ts-ignore
    ethereum.on('networkChanged', (chainId) => {
      invalidateNetwork();
      emitNetworkChange(chainId);
    });

    // Load the current account
    AccountLoader();
  }
}

let networkChangeClbk: (chainId: number) => any;
export function onNetworkChanged( clbk: (chainId: number) => any ){
  networkChangeClbk = clbk;
}

export function emitNetworkChange( chainId: number ){
  console.log('Change chain id', chainId );
  networkChangeClbk && networkChangeClbk(chainId);
}

export async function requestAddressConnection() {
  let provider = getProvider();
  await provider.send("eth_requestAccounts", []); 

  // Walled connected
  let accounts = await provider.listAccounts();
  onSignerConnected( accounts[0] );
}

export function disconnectAddress(){

}


let provider: ethers.providers.Web3Provider;
function getProvider(): ethers.providers.Web3Provider {
  if( !provider ) {
    // @ts-ignore
    provider = new ethers.providers.Web3Provider(window.ethereum);
  }
  return provider;
}