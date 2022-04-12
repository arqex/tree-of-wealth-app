import { ethers } from 'ethers';
import Lorese from 'lorese';
import { NftActivity, NftDetails, Owner } from './state.types';
import { RCPError } from './transactions/transactions.reducers';

interface Store {
  knownAddresses: string[],
  connectedSignerAddress: string,
  connectedNetwork: ethers.providers.Network | undefined,
  contract: {
    owner: string | undefined,
    currentPrice: ethers.BigNumber | undefined
    currentHostAddress: string | undefined,
    repeatingOwner: string | undefined,
    solidaryValue: ethers.BigNumber | undefined,
    hostsCount: ethers.BigNumber | undefined,
    priceRaise: number
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
  setSolidaryOwnerTransaction: {
    inProcess: boolean,
    result: 'ok' | 'error' | undefined,
    error: RCPError | undefined
  },
  nftDetails: {
    [id: string]: NftDetails
  },
  nftActivity: {
    [id: string]: NftActivity[]
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
    solidaryValue: undefined,
    hostsCount: undefined,
    priceRaise: 0.001
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
  setSolidaryOwnerTransaction: {
    inProcess: false,
    result: undefined,
    error: undefined
  },
  nftDetails: {},
  nftActivity: {}
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

if( typeof window !== 'undefined' ){
  // @ts-ignore
  window.stateManager = stateManager;
}