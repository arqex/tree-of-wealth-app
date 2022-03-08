import { stateManager } from "../stateManager";

export const setIsBuying = stateManager.reducer<boolean>( (store, isBuying) => ({
  ...store,
  buyTransaction: {
    inProcess: isBuying,
    result: undefined,
    error: undefined
  }
}));

export interface TransactionResult {
  result: 'ok' | 'error',
  error?: string
}
export const setBuyResult = stateManager.reducer<TransactionResult>( (store, result) => ({
  ...store,
  buyTransaction: {
    inProcess: false,
    result: result.result,
    error: result.error
  }
}));

export const resetBuyResult = stateManager.reducer<void>( (store) => ({
  ...store,
  buyTransaction: {
    inProcess: false,
    result: undefined,
    error: undefined
  }
}));

export const setIsWithdrawing = stateManager.reducer<boolean>( (store, isWithdrawing) => ({
  ...store,
  withdrawTransaction: {
    inProcess: isWithdrawing,
    result: undefined,
    error: undefined
  }
}));

export const setWithdrawResult = stateManager.reducer<TransactionResult>( (store, result) => ({
  ...store,
  withdrawTransaction: {
    inProcess: false,
    result: result.result,
    error: result.error
  }
}));

export const resetWithdrawResult = stateManager.reducer<void>( (store) => ({
  ...store,
  withdrawTransaction: {
    inProcess: false,
    result: undefined,
    error: undefined
  }
}));



export const setIsSettingOrphanOwner = stateManager.reducer<boolean>( (store, isWithdrawing) => ({
  ...store,
  setOrphanOwnerTransaction: {
    inProcess: isWithdrawing,
    result: undefined,
    error: undefined
  }
}));

export const setOrphanOwnerResult = stateManager.reducer<TransactionResult>( (store, result) => ({
  ...store,
  setOrphanOwnerTransaction: {
    inProcess: false,
    result: result.result,
    error: result.error
  }
}));

export const resetOrphanOwnerResult = stateManager.reducer<void>( (store) => ({
  ...store,
  setOrphanOwnerTransaction: {
    inProcess: false,
    result: undefined,
    error: undefined
  }
}));