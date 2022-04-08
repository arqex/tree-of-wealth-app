import { stateManager } from "../stateManager";

export const onSignerConnected = stateManager.reducer<string>( (store, connectedSignerAddress) => {
  return {
    ...store,
    connectedSignerAddress
  }
})


export const setIsWalletAvailable = stateManager.reducer<boolean>( (store, isWalletAvailable) => {
  return {
    ...store, 
    isWalletAvailable
  }
});