import { stateManager } from "../stateManager";

export const setBecomingHost = stateManager.reducer<boolean>( (store, isBecomingHost) => ({
  ...store,
  hostTransaction: {
    inProcess: isBecomingHost,
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
export const setHostResult = stateManager.reducer<TransactionResult>( (store, result) => ({
  ...store,
  hostTransaction: {
    inProcess: false,
    result: result.result,
    error: result.error
  }
}));

export const resetHostResult = stateManager.reducer<void>( (store) => {
  return {
    ...store,
    hostTransaction: {
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