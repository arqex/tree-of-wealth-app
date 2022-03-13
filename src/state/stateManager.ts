import { ethers } from 'ethers';
import Lorese from 'lorese';
import { RCPError } from './transactions/transactions.reducers';

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
    repeatingOwner: string | undefined,
    repeatingValue: ethers.BigNumber | undefined,
    hostsCount: ethers.BigNumber | undefined
  },
  hosts: {[address: string]: Owner},
  buyTransaction: {
    inProcess: boolean,
    result: 'ok' | 'error' | undefined,
    error: RCPError | undefined
  },
  withdrawTransaction: {
    inProcess: boolean,
    result: 'ok' | 'error' | undefined,
    error: RCPError | undefined
  },
  setRepeatingOwnerTransaction: {
    inProcess: boolean,
    result: 'ok' | 'error' | undefined,
    error: RCPError | undefined
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
    repeatingOwner: undefined,
    repeatingValue: undefined,
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
  setRepeatingOwnerTransaction: {
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