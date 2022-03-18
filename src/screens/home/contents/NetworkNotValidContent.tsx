import { Component } from "react";
import Pod from "../../../components/Pod/Pod";
import { Text } from "../../../components/Text/Text";
import { getMainNetworkDetails } from "../../../utils/networks";
import { Network } from "@ethersproject/networks";

interface NetworkNotValidContentProps {
  network: Network
}
 
interface NetworkNotValidContentState {
  
}
 
class NetworkNotValidContent extends Component<NetworkNotValidContentProps, NetworkNotValidContentState> {
  render() { 
    const networkDetails = getMainNetworkDetails();

    return (
      <Pod>
        <Text type="h2" block>Your wallet is connected to an unknown network...</Text>
        <Text block>...but The Tree of Wealth lives in the <b>MATIC</b> network, so please switch the network in your wallet to use the following settings:</Text>
        <ul>
          <li>Network name: <b>{networkDetails.name}</b></li>
          <li>RCP address: <b>{networkDetails.rpc}</b></li>
          <li>Chain id: <b>{networkDetails.chainId}</b></li>
          <li>Coin symbol: <b>{networkDetails.symbol}</b></li>
          <li>Block explorer: <b>{networkDetails.blockExplorer}</b></li>
        </ul>
      </Pod>
    )
  }
}
 
export default NetworkNotValidContent;