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

export const isSettingOrphanOwner = stateManager.selector<void, boolean>( store => (
  store.setOrphanOwnerTransaction.inProcess
));

export const geSetOrphanOwnerResult = stateManager.selector<void, TransactionResult | undefined>( store => {
  const {result, error} = store.setOrphanOwnerTransaction;
  if( result ){
    return {result, error};
  }
});