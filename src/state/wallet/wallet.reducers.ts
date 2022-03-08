import { stateManager } from "../stateManager";

export const onSignerConnected = stateManager.reducer<string>( (store, connectedSignerAddress) => {
  return {
    ...store,
    connectedSignerAddress
  }
})