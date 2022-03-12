import { Component } from "react";
import Button from "../../../components/Button/Button";
import { requestAddressConnection } from "../../../state/wallet/wallet.actions";
import { isWalletAvailable } from "../../../state/wallet/wallet.selectors";
import HomeLayout from "../HomeLayout";

interface NoConenctedContentProps {
  
}
 
interface NoConenctedContentState {
  
}
 
class NoConenctedContent extends Component<NoConenctedContentProps, NoConenctedContentState> {
  state = {
    isWalletModalOpen: false
  }

  render() { 
    return (
      <HomeLayout 
        title="The Tree of Wealth"
        subtitle="This tree will grant wealth to anyone who has ever hosted it."
        content={
          <div>
            <Button width={160}>How does it work?</Button>
            <span style={{width: 10, display: 'inline-block'}} />
            <Button width={160} onClick={ this._onConnectWallet }>
              Connect wallet
            </Button>
          </div>
        }
      />
    );
  }

  _onConnectWallet = () => {
    if( isWalletAvailable() ){
      requestAddressConnection();
    }

    this.setState({isWalletModalOpen: true});
  }
}
 
export default NoConenctedContent;