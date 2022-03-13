import { BigNumber, ethers } from "ethers";
import { stateManager } from "../stateManager";
import { getConnectedAddress } from "../wallet/wallet.selectors";
import { getContract } from "./contract.actions";

let isValidPrice = true;
export function invalidatePrice(){
  isValidPrice = false;
}
export const PriceLoader = stateManager.loader<void, BigNumber>({
  selector(store) {
    return store.contract.currentPrice
  },
  load: async function() {
    let contract = getContract();
    if( !contract ) throw new Error('No contract available');

    contract.functions.currentPrice()
      .then( stateManager.reducer( (store, result: [BigNumber]) => {
        isValidPrice = true;
        return {
          ...store,
          contract: {
            ...store.contract,
            currentPrice: result[0]
          }
        }
      }));
  },
  isValid() {
    return isValidPrice;
  }
});

let isValidHost = true;
export function invalidateHost() {
  isValidHost = false;
}
export const HostLoader = stateManager.loader<void, string>({
  selector(store) {
    return store.contract.currentHostAddress
  },
  load: async function() {
    let contract = getContract();
    if( !contract ) throw new Error('No contract available');

    contract.functions.currentHost()
      .then( stateManager.reducer( (store, result: [string]) => {
        isValidHost = true;
        return {
          ...store,
          contract: {
            ...store.contract,
            currentHostAddress: result[0]
          }
        }
      }));
  },
  isValid() {
    return isValidHost;
  }
});

export const RepeatingOwnerLoader = stateManager.loader<void, string>({
  selector(store) {
    return store.contract.repeatingOwner
  },
  load: async function() {
    let contract = getContract();
    if( !contract ) throw new Error('No contract available');

    contract.functions.currentRepeatingOwner()
      .then( stateManager.reducer( (store, result: [string]) => {
        return {
          ...store,
          contract: {
            ...store.contract,
            repeatingOwner: result[0]
          }
        }
      }));
  }
});

let isValidRepeatingValue = true;
export function invalidateRepeatingValue() {
  isValidRepeatingValue = false;
}
export const RepeatingValueLoader = stateManager.loader<void, BigNumber>({
  selector(store) {
    return store.contract.repeatingValue
  },
  load: async function() {
    let contract = getContract();
    if( !contract ) throw new Error('No contract available');

    contract.functions.repeatingValue()
      .then( stateManager.reducer( (store, result: [BigNumber]) => {
        isValidRepeatingValue = true;
        return {
          ...store,
          contract: {
            ...store.contract,
            repeatingValue: result[0]
          }
        }
      }));
  },
  isValid() {
    return isValidRepeatingValue;
  }
});

let isValidHostsCount = true;
export function invalidateHostsCount() {
  isValidHostsCount = false;
}
export const HostsCountLoader = stateManager.loader<void, BigNumber>({
  selector(store) {
    return store.contract.hostsCount
  },
  load: async function() {
    let contract = getContract();
    if( !contract ) throw new Error('No contract available');

    contract.functions.hostsCount()
      .then( stateManager.reducer( (store, result: [BigNumber]) => {
        isValidPrice = true;
        return {
          ...store,
          contract: {
            ...store.contract,
            hostsCount: result[0]
          }
        }
      }));
  },
  isValid() {
    return isValidHostsCount;
  }
});

export const HasBeenHostLoader = stateManager.loader<string, boolean>({
  selector(store, address) {
    if( !address ) throw new Error('No connected address');
    return store.hosts[address]?.hasEverBeenOwner;
  },
  load: async function(address) {
    let contract = getContract();
    if( !contract ) throw new Error('No contract available');

    contract.functions.hasBeenHost(address)
      .then( stateManager.reducer( (store, result: [boolean]) => {
        return {
          ...store,
          hosts: {
            ...store.hosts,
            [address]: {
              ...( store.hosts[address] || {}),
              address,
              hasEverBeenOwner: result[0]
            }
          }
        }
      }));
  }
});

let isValidHostAvailableToWithdraw:{[address:string]: boolean} = {};
export function invalidateAvailableToWithdraw() {
  const address = getConnectedAddress();
  if( !address ) throw new Error('No connected address');
  isValidHostAvailableToWithdraw[address] = false;
}
export const AvailableToWithdrawLoader = stateManager.loader<string, ethers.BigNumber>({
  selector(store, address) {
    if( !address ) throw new Error('No connected address');
    return store.hosts[address]?.availableToWithdraw;
  },
  load: async function(address) {
    let contract = getContract();
    if( !contract ) throw new Error('No contract available');
    
    contract.functions.availableToWithdraw()
      .then( stateManager.reducer( (store, result: [BigNumber]) => {
        isValidHostAvailableToWithdraw[address] = true;
        return {
          ...store,
          hosts: {
            ...store.hosts,
            [address]: {
              ...( store.hosts[address] || {}),
              address,
              availableToWithdraw: result[0]
            }
          }
        }
      }));
  },
  isValid(address) {
    return isValidHostAvailableToWithdraw[address] !== false;
  }
});

export const ContractOwnerLoader = stateManager.loader<void, string>({
  selector( store ) {
    return store.contract.owner;
  },
  load: async function() {
    let contract = getContract();
    if( !contract ) throw new Error('No contract available');

    contract.functions.owner()
      .then( stateManager.reducer( (store, result: [string]) => {
        return {
          ...store,
          contract: {
            ...store.contract,
            owner: result[0]
          }
        }
      }));
  }
})