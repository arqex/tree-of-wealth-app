import { ethers } from "ethers";
import { AccountLoader, invalidateAccount, invalidateNetwork } from "./wallet.loaders";
// import { onSignerConnected } from "./wallet.reducers";
import { getWeb3Provider, setWeb3Provider } from "./wallet.selectors";
import detectEthereumProvider from '@metamask/detect-provider'
// import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { getMainNetworkDetails } from '../../utils/networks';
import { onSignerConnected } from "./wallet.reducers";


export async function initializeWallet() {
  let provider = window.ethereum as ethers.providers.ExternalProvider;

  if( !provider ){
    provider = await detectEthereumProvider() as ethers.providers.ExternalProvider;
  }

  if( provider ){
    onProviderAvailable(provider);
  }
  /*
  else {
    const coinbaseWallet = new CoinbaseWalletSDK({
      appName: 'The tree of wealth',
      appLogoUrl: ''
    });
    let network = getMainNetworkDetails();
    // @ts-ignore
    ethereum = coinbaseWallet.makeWeb3Provider(network.rpc, network.chainId) as ethers.providers.ExternalProvider;
    setWeb3Provider(ethereum);
  }
  */
}

export function onProviderAvailable(provider: ethers.providers.ExternalProvider){
  setWeb3Provider(provider);
  // Listen to network and account changes
  // @ts-ignore
  provider.on('accountsChanged', invalidateAccount );
  // @ts-ignore
  provider.on('networkChanged', (chainId) => {
    invalidateNetwork();
    emitNetworkChange(chainId);
  });
  // @ts-ignore
  provider.on('chainChanged', (chainId) => {
    invalidateNetwork();
    emitNetworkChange(chainId);
  });

  // Load the current account
  AccountLoader();
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

export async function switchNetworkWallet() {
  const network = getMainNetworkDetails();
  const provider = getWeb3Provider();

  try {
    // @ts-ignore
    let result = await provider.request({
      method: "wallet_switchEthereumChain", 
      params: [{
        chainId: getHexChainId(network.chainId)
      }]
    });
    console.log( result );
  }
  catch( err: any ){
    // The chain doesn't exist yet in the wallet
    if( err?.code === 4902 ){
      try {
        // @ts-ignore
        let result = await provider.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: getHexChainId(network.chainId),
            chainName: network.name,
            nativeCurrency: {
              name: network.symbol,
              symbol: network.symbol,
              decimals: 18,
            },
            rpcUrls: [network.rpc],
            blockExplorerUrls: [network.blockExplorer]
          }]
        });  
        console.log( result );
      }
      catch( err ) {
        console.log( err );
      }
    }

    throw err;
  }
}

function getHexChainId( id: number ){
  return `0x${id.toString(16)}`;
}


let provider: ethers.providers.Web3Provider;
function getProvider(): ethers.providers.Web3Provider {
  if( !provider ) {
    // @ts-ignore
    provider = new ethers.providers.Web3Provider(window.ethereum);
  }
  return provider;
}