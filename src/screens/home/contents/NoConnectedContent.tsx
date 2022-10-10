import { Component } from "react";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import { Text } from "../../../components/Text/Text";
import { requestAddressConnection } from "../../../state/wallet/wallet.actions";
import { isWalletAvailable } from "../../../state/wallet/wallet.selectors";
import { scrollToAnchor } from "../../../utils/scrollToAnchor";
import { openConnectModal } from "../../../utils/web3ConnectModal";
import ConnectWalletModal from "./components/ConnectWalletModal";

interface NoConnectedContentProps {
  
}
 
interface NoConnectedContentState {
  
}
 
class NoConnectedContent extends Component<NoConnectedContentProps, NoConnectedContentState> {
  state = {
    isWalletModalOpen: false
  }

  render() { 
    return (
      <div>
        <Text type="h2" margin="l">Will grant wealth to anyone who has ever hosted it</Text>
        <Button width={160} href="#about" onClick={ scrollToAnchor }>How does it work?</Button>
        <span style={{width: 10, display: 'inline-block'}} />
        <Button width={160} onClick={ this._onConnectWallet }>
          Connect wallet
        </Button>
        <Modal isOpen={this.state.isWalletModalOpen}
          onRequestClose={this._closeModal } maxWidth="500px">
            <ConnectWalletModal />
        </Modal>
      </div>
    );
  }

  _onConnectWallet = async () => {
    if( isWalletAvailable() ){
      requestAddressConnection()
        .catch( err => {
          if( err?.code === -32002 ){
            console.log('Please check your metamask plugin');
          }
        })
    }
    else {
      openConnectModal();
    }
  }

  _closeModal = () => {
    this.setState({isWalletModalOpen: false});
  }
}
 
export default NoConnectedContent;