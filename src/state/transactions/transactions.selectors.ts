import { isValidNetwork } from "../../utils/networks";
import { stateManager } from "../stateManager"
import { TransactionResult } from "./transactions.reducers";

export const isBuying = stateManager.selector<void, boolean>( store => (
  store.buyTransaction.inProcess
));

export const getBuyResult = stateManager.selector<void, TransactionResult | undefined>( store => {
  const {result, error} = store.buyTransaction;
  if( result ){
    return {result, error};
  }
});

export const isWithdrawing = stateManager.selector<void, boolean>( store => (
  store.withdrawTransaction.inProcess
));

export const getWithdrawResult = stateManager.selector<void, TransactionResult | undefined>( store => {
  const {result, error} = store.withdrawTransaction;
  if( result ){
    return {result, error};
  }
});

export const isSettingSolidaryOwner = stateManager.selector<void, boolean>( store => (
  store.setSolidaryOwnerTransaction.inProcess
));

export const geSetSolidaryOwnerResult = stateManager.selector<void, TransactionResult | undefined>( store => {
  const {result, error} = store.setSolidaryOwnerTransaction;
  if( result ){
    return {result, error};
  }
});

export type TransactionStatus = 'out' | 'in' | 'withdrawing' | 'hosting';
export const getTransactionStatus = stateManager.selector<void, TransactionStatus>( store => {
  if( store.buyTransaction.inProcess ) return 'hosting';
  if( store.withdrawTransaction.inProcess ) return 'withdrawing';
  if( store.connectedSignerAddress && isValidNetwork(store.connectedNetwork?.chainId || 0) ){
    return 'in';
  }
  return 'out';
})

export const getPriceRaise = stateManager.selector<void, number>( store => {
  return store.contract.priceRaise;
})