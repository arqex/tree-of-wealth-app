import { ethers } from 'ethers';
import Lorese from 'lorese';

interface Owner {
  address: string,
  hasEverBeenOwner: boolean | undefined,
  availableToWithdraw: ethers.BigNumber | undefined
}

interface Store {
  knownAddresses: string[],
  connectedSignerAddress: string,
  connectedNetwork: ethers.providers.Network | undefined,
  contract: {
    owner: string | undefined,
    currentPrice: ethers.BigNumber | undefined
    currentHostAddress: string | undefined,
    orphanOwner: string | undefined,
    orphanValue: ethers.BigNumber | undefined,
    hostsCount: ethers.BigNumber | undefined
  },
  hosts: {[address: string]: Owner},
  buyTransaction: {
    inProcess: boolean,
    result: 'ok' | 'error' | undefined,
    error: string | undefined
  },
  withdrawTransaction: {
    inProcess: boolean,
    result: 'ok' | 'error' | undefined,
    error: string | undefined
  },
  setOrphanOwnerTransaction: {
    inProcess: boolean,
    result: 'ok' | 'error' | undefined,
    error: string | undefined
  }
}

// We will have a store with 2 attributes
const store: Store = {
  knownAddresses: [],
  connectedSignerAddress: '',
  connectedNetwork: undefined,
  contract: {
    owner: undefined,
    currentPrice: undefined,
    currentHostAddress: undefined,
    orphanOwner: undefined,
    orphanValue: undefined,
    hostsCount: undefined
  },
  hosts: {},
  buyTransaction: {
    inProcess: false,
    result: undefined,
    error: undefined
  },
  withdrawTransaction: {
    inProcess: false,
    result: undefined,
    error: undefined
  },
  setOrphanOwnerTransaction: {
    inProcess: false,
    result: undefined,
    error: undefined
  }
}

// Create our state manager
export const stateManager = Lorese(store);

let uiRefresher = () => {
  console.warn('UI refresher not set');
}
export function setUIRefresher( refresher: () => any ){
  uiRefresher = refresher;
}

let isRefreshing = false;
export function refreshUI(){
  if( !isRefreshing ){
    isRefreshing = true;
    setTimeout( () => {
      isRefreshing = false;
      uiRefresher();
    })
  }
}