import { Component } from "react";
import Link from "../../../components/Link/Link";
import { Text } from "../../../components/Text/Text";
import { AvailableToWithdrawLoader } from "../../../state/contract/contract.loaders";
import { requestAddressConnection } from "../../../state/wallet/wallet.actions";
import { getConnectedAddress, isWalletAvailable } from "../../../state/wallet/wallet.selectors";
import { getOpenSeaURL } from "../../../utils/networks";
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
      <div>
        <Text type="h2" margin="l">Welcome dear Host, The Tree will always be grateful.</Text>
        <div className={styles.section}>
          <Text block>
            While you are the host you can use The Tree as any other NFT. The only thing you can’t do it transfer or sell it. Check it out at <Link href={getOpenSeaURL()}>OpenSea</Link>.
          </Text>
          <Text block>
            Being the host of The Tree is an honor. Surely all your friends at our favorite social media would love to know
          </Text>
          <Text block>
            <a href="#1">Twitter</a> - <a href="#1">Facebook</a> - <a href="#1">Instagram</a> - <a href="#1">TikTok</a>
          </Text>
        </div>
          { this.renderWithdraw() }
          <LearnMoreLink />
      </div>
    );
  }

  renderWithdraw() {
    const address = getConnectedAddress();
    const {data: amount, error} = AvailableToWithdrawLoader(address);

    if( error ){
      return (
        <div className={`${styles.section} ${styles.pod}`}>
          There was an error loading the amount available to withdraw. <a href="#1" >Retry to load</a>
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