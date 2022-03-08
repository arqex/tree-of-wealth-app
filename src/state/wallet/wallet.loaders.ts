import { ethers } from "ethers";
import { refreshUI, stateManager } from "../stateManager";
import { emitNetworkChange } from "./wallet.actions";
import { getAccounts, getChainId, getNetworkId } from "./wallet.selectors";

let isNetworkValid = true;

export function invalidateNetwork() {
  isNetworkValid = false;
  refreshUI();
}

export const NetworkLoader = stateManager.loader<void, ethers.providers.Network>({
  selector: (store) => {
    return store.connectedNetwork;
  },
  load: async function() {
    return getChainId()
      .then( stateManager.reducer( (store, network)  => {
        // emitNetworkChange(network.chainId);
        isNetworkValid = true;
        return {
          ...store,
          connectedNetwork: network
        };
      }))
      .then( () => {
        let chainId = getNetworkId();
        chainId && emitNetworkChange(chainId);
      })
      .catch( err => {
        console.log( err );
      })
    ;
  },
  isValid() {
    return isNetworkValid;
  }
});

let isAccountValid = true;
export function invalidateAccount() {
  isAccountValid = false;
  refreshUI();
}
export const AccountLoader = stateManager.loader<void, string>({
  selector(store) {
    return store.connectedSignerAddress;
  },
  load: async function() {
    return getAccounts()
      .then( stateManager.reducer( (store, accounts) => {
      isAccountValid = true;
      return {
        ...store,
        connectedSignerAddress: accounts[0]
      }
    }));
  },
  isValid() {
    return isAccountValid;
  }
});
