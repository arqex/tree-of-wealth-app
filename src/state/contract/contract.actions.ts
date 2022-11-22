import { ethers } from "ethers";
import { getValidChainId, getSigner } from "../wallet/wallet.selectors";
import contractSpec from './TreeOfWealth.json';
import {TreeOfWealth} from '../../../types/ethers-contracts';
import { getContractAddress, isValidNetwork } from "../../utils/networks";
import { invalidateAvailableToWithdraw, invalidateHost, invalidateHostsCount, invalidatePrice } from "./contract.loaders";
import { refreshUI } from "../stateManager";

export function getContract(): TreeOfWealth | undefined {
  let signer = getSigner();
  if( !signer ) return;

  const chainId = getValidChainId();
  const address = getContractAddress(chainId);

  return new ethers.Contract(address, contractSpec.abi, signer) as TreeOfWealth;
}

export function bindContractListeners( chainId: number ){
  if ( isValidNetwork(chainId) ){
    let contract = getContract();
    if( contract ){
      contract.on('Transfer', (prevHost, currentHost) => {
        console.log('Transfer event received!');
        invalidateHost();
        invalidateAvailableToWithdraw();
        invalidatePrice();
        invalidateHostsCount();
        refreshUI();
      });
    }
  }
}

export function getItemMeta(id: number) {
  getContract()?.functions.tokenURI(id).then( response => {
    console.log( response );
  })
}