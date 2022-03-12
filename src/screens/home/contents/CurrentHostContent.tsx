import { Component } from "react";
import { AvailableToWithdrawLoader } from "../../../state/contract/contract.loaders";
import { requestAddressConnection } from "../../../state/wallet/wallet.actions";
import { getConnectedAddress, isWalletAvailable } from "../../../state/wallet/wallet.selectors";
import HomeLayout from "../HomeLayout";
import { LearnMoreLink } from "./components/LearnMoreLinkt";
import { WithdrawDialog } from "./components/WithdrawDialog";
import styles from './homeContents.module.css';

interface CurrentHostContentProps {
  
}
 
interface CurrentHostContentState {
  
}
 
class CurrentHostContent extends Component<CurrentHostContentProps, CurrentHostContentState> {
  state = {
    isWalletModalOpen: false
  }

  render() {
    return (
      <HomeLayout 
        title="The Tree of Wealth"
        subtitle="Welcome dear Host, The Tree will always be grateful."
        content={ this.renderContent() }
      />
    );
  }

  renderContent() {
    return (
      <div>
        <div className={styles.section}>
          <p>
            While you are the host you can use The Tree as any other NFT. The only thing you can’t do it transfer or sell it. Check it out at <a>OpenSea</a>.
          </p>
          <p>
            Being the host of the tree is an honor. Surely all your friends at our favorite social media would love to know
          </p>
          <p>
            <a>Twitter</a> - <a>Facebook</a> - <a>Instagram</a> - <a>TikTok</a>
          </p>
        </div>
          { this.renderWithdraw() }
          <LearnMoreLink />
      </div>
    );
  }

  renderWithdraw() {
    const address = getConnectedAddress();
    const {data: amount, isLoading, error, retry} = AvailableToWithdrawLoader(address);

    if( error ){
      return (
        <div className={`${styles.section} ${styles.pod}`}>
          There was an error loading the amount available to withdraw. <a >Retry to load</a>
        </div>
      );
    }

    if( amount !== undefined && amount?.toNumber() > 0 ){
      return (
        <div className={styles.section}>
          <WithdrawDialog amount={amount} />
        </div>
      );
    }
    
    return (
      <div className={`${styles.section} ${styles.pod}`}>
        The Tree is not holding any coins for you yet.
      </div>
    );
  }

  _onConnectWallet = () => {
    if( isWalletAvailable() ){
      requestAddressConnection();
    }

    this.setState({isWalletModalOpen: true});
  }
}
 
export default CurrentHostContent;