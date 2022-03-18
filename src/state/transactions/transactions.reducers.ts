import { stateManager } from "../stateManager";

export const setIsBuying = stateManager.reducer<boolean>( (store, isBuying) => ({
  ...store,
  buyTransaction: {
    inProcess: isBuying,
    result: undefined,
    error: undefined
  }
}));

export interface RCPError {
  code: number,
  message: string
}

export interface TransactionResult {
  result: 'ok' | 'error',
  error?: RCPError
}
export const setBuyResult = stateManager.reducer<TransactionResult>( (store, result) => ({
  ...store,
  buyTransaction: {
    inProcess: false,
    result: result.result,
    error: result.error
  }
}));

export const resetBuyResult = stateManager.reducer<void>( (store) => {
  return {
    ...store,
    buyTransaction: {
      inProcess: false,
      result: undefined,
      error: undefined
    }
  };
});

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



export const setIsSettingRepeatingOwner = stateManager.reducer<boolean>( (store, isWithdrawing) => ({
  ...store,
  setRepeatingOwnerTransaction: {
    inProcess: isWithdrawing,
    result: undefined,
    error: undefined
  }
}));

export const setRepeatingOwnerResult = stateManager.reducer<TransactionResult>( (store, result) => ({
  ...store,
  setRepeatingOwnerTransaction: {
    inProcess: false,
    result: result.result,
    error: result.error
  }
}));

export const resetRepeatingOwnerResult = stateManager.reducer<void>( (store) => ({
  ...store,
  setRepeatingOwnerTransaction: {
    inProcess: false,
    result: undefined,
    error: undefined
  }
}));