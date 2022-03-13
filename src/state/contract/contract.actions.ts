import { ethers } from "ethers";
import { getCurrentChainId, getSigner } from "../wallet/wallet.selectors";
import contractSpec from './TreeOfWealth.json';
import {TreeOfWealth} from '../../../types/ethers-contracts';
import { getContractAddress, isValidNetwork } from "../../utils/networks";
import { invalidateAvailableToWithdraw, invalidateHost, invalidateHostsCount, invalidateRepeatingValue, invalidatePrice } from "./contract.loaders";
import { refreshUI } from "../stateManager";
import { resetBuyResult, resetWithdrawResult } from "../transactions/transactions.reducers";

export function getContract(): TreeOfWealth | undefined {
  let signer = getSigner();
  if( !signer ) return;

  const chainId = getCurrentChainId();
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
        invalidateRepeatingValue();
        invalidatePrice();
        invalidateHostsCount();
        refreshUI();
        resetBuyResult();
        resetWithdrawResult();
      });

      contract.on('OrphanOwnerChange', () => {
        console.log('Orphan owner event received!');
        invalidateAvailableToWithdraw();
        refreshUI();
      });
    }
  }
}