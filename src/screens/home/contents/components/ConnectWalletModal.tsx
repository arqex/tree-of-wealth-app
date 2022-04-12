import { Component } from "react";
import { ModalContent, ModalTitle } from "../../../../components/Modal/Modal";

import WalletConnectProvider from "@walletconnect/web3-provider";
import { getMainNetworkDetails } from "../../../../utils/networks";
import { setWeb3Provider } from "../../../../state/wallet/wallet.selectors";
import { onProviderAvailable } from "../../../../state/wallet/wallet.actions";

const network = getMainNetworkDetails();

//  Create WalletConnect Provider
const provider = new WalletConnectProvider({
  rpc: {
    [network.chainId]: network.rpc
  }
});


interface ConnectWalletModalProps {
  
}
 
interface ConnectWalletModalState {
  showWCQR: boolean
}
 
class ConnectWalletModal extends Component<ConnectWalletModalProps, ConnectWalletModalState> {
  state = {
    showWCQR: false
  };
  render() { 
    if( this.state.showWCQR ){
      return (
        <div>
          <ModalTitle>Scan this code with your mobile wallet</ModalTitle>
          <ModalContent>

          </ModalContent>
        </div>
      )
    }
    return (
      <div>
        <ModalTitle>Pick a wallet</ModalTitle>
        <ModalContent>
        </ModalContent>
      </div>
    );
  }

  _setQr = async () => {
    //  Enable session (triggers QR Code modal)
    await provider.enable();

    setWeb3Provider(provider);
    onProviderAvailable(provider);
  }
}
 
export default ConnectWalletModal;