import { Component } from "react";
import Button from "../../../components/Button/Button";
import Link from "../../../components/Link/Link";
import Modal, { ModalContent, ModalTitle } from "../../../components/Modal/Modal";
import { Text } from "../../../components/Text/Text";
import { requestAddressConnection } from "../../../state/wallet/wallet.actions";
import { isWalletAvailable } from "../../../state/wallet/wallet.selectors";
import { scrollToAnchor } from "../../../utils/scrollToAnchor";

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
        <Text type="h2" margin="l">The Tree will grant wealth to anyone who has ever hosted it.</Text>
        <Button width={160} href="#about" onClick={ scrollToAnchor }>How does it work?</Button>
        <span style={{width: 10, display: 'inline-block'}} />
        <Button width={160} onClick={ this._onConnectWallet }>
          Connect wallet
        </Button>
        <Modal isOpen={this.state.isWalletModalOpen}
          onRequestClose={this._closeModal } maxWidth="500px">
            <ModalTitle>Install a wallet</ModalTitle>
            <ModalContent>
              <div>
                Right now the only supported wallet is Metamask. Please follow <Link href="https://metamask.io/download/">this link to install Metamask</Link>.
              </div>
            </ModalContent>
        </Modal>
      </div>
    );
  }

  _onConnectWallet = () => {
    if( isWalletAvailable() ){
      requestAddressConnection();
    }

    this.setState({isWalletModalOpen: true});
  }

  _closeModal = () => {
    this.setState({isWalletModalOpen: false});
  }
}
 
export default NoConnectedContent;