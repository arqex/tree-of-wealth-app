import { ethers } from "ethers";
import { stateManager } from "../stateManager";

let web3Provider: ethers.providers.ExternalProvider | undefined;
export function setWeb3Provider( provider: ethers.providers.ExternalProvider ){
  web3Provider = provider;
}

export function getWeb3Provider() : ethers.providers.ExternalProvider | undefined {
  return web3Provider;
}

export function isWalletAvailable() {
  return getWeb3Provider() !== undefined;
}

export async function getChainId() {
  return await getProvider().getNetwork();
}

export const getNetworkId = stateManager.selector<void,number|undefined>( store => {
 return store.connectedNetwork?.chainId;
})

let provider: ethers.providers.Web3Provider;
export function getProvider(): ethers.providers.Web3Provider {
  if( !provider ) {
    // @ts-ignore
    provider = new ethers.providers.Web3Provider(getWeb3Provider(), "any"); // any will make the provider work even if the network change
  }
  return provider;
}

export const getConnectedAddress = stateManager.selector<void,string>( store => {
  return store.connectedSignerAddress;
});

export const getCurrentChainId = stateManager.selector<void,number>( store => {
  const {connectedNetwork} = store;
  if( !connectedNetwork ){
    throw new Error('No connected network');
  }

  return connectedNetwork.chainId;
});

export function getSigner() {
  return getProvider().getSigner();
}

export async function getAccounts() {
  return await getProvider().listAccounts();
}

export type WalletType = 'outsider' | 'host' | 'former_host' | 'repeating_host';
export const getWalletType = stateManager.selector<void, WalletType>( store => {
  const {connectedSignerAddress: address} = store;
  if( !address ) return 'outsider';

  if( store.contract.currentHostAddress === address ){
    return 'host'
  }

  if( store.hosts[address]?.hasEverBeenOwner ){
    return 'former_host';
  }

  return 'outsider';
})