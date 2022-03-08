import { ethers } from "ethers";
import { stateManager } from "../stateManager";

export function getWeb3Provider() : ethers.providers.ExternalProvider | undefined {
  //@ts-ignore
  return window.ethereum;
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