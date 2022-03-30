import { BigNumber, ethers } from "ethers";
import { Component } from "react";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import Spinner from "../../../components/Spinner/Spinner";
import { Text } from "../../../components/Text/Text";
import { AvailableToWithdrawLoader, PriceLoader } from "../../../state/contract/contract.loaders";
import { getWithdrawResult, isWithdrawing } from "../../../state/transactions/transactions.selectors";
import { getConnectedAddress } from "../../../state/wallet/wallet.selectors";
import { HostDialog } from "./components/HostDialog";
import { LearnMoreLink } from "./components/LearnMoreLinkt";
import { WithdrawDialog } from "./components/WithdrawDialog";
import styles from './homeContents.module.css';

interface FormerHostContentProps {
  
}
 
interface FormerHostContentState {
  isHostAgainModalOpen: boolean
}
 
class FormerHostContent extends Component<FormerHostContentProps, FormerHostContentState> {
  state = {
    isHostAgainModalOpen: false
  }

  render() {
    return (
      <div>
        <Text type="h2" margin="l">Welcome dear former host, it's always nice to see you again.</Text>
        { this.renderPrice() }
        { this.renderWithdraw() }
        <LearnMoreLink />
        { this.renderHostAgainModal() }
      </div>
    )
  }

  renderPrice() {
    const {data: price} = PriceLoader();
    const formatted = price ?
      ethers.utils.formatEther( price ) :
      '...'
    ;

    return (
      <Text block>
        Current price for hosting The Tree is {formatted} MATIC. <a href="#1" onClick={ this._openModal }>Host it again</a>.
      </Text>
    );
  }

  renderWithdraw() {
    const address = getConnectedAddress();
    let {data: amount, isLoading, error} = AvailableToWithdrawLoader(address);

    if( isLoading ){
      return <Spinner />
    }

    if( error ){
      return (
        <div className={`${styles.section} ${styles.pod}`}>
          There was an error loading the amount available to withdraw. <a href="#1" >Retry to load</a>
        </div>
      );
    }

    if( !amount ){
      amount = BigNumber.from(0)
    }
   
    if( isWithdrawVisible(amount) ){
      return (
        <div className={styles.section}>
          <WithdrawDialog amount={amount} />
        </div>
      );
    }

    return (
      <div className={styles.section}>
        <Text block>
          There hasn't been any new host since the last time you withdraw from The Tree.
        </Text>
        <Text block>
          If you'd like to help The Tree to have more hosts you can share it with the world on your favorite social network
        </Text>
        <Text block>
          <a href="#1">Twitter</a> - <a href="#1">Facebook</a> - <a href="#1">Instagram</a> - <a href="#1">TikTok</a>
        </Text>
      </div>
    );
  }

  renderHostAgainModal() {
    return (
      <ConfirmModal isOpen={ this.state.isHostAgainModalOpen }
        title="Becoming a host again"
        content={this.renderModalContent()}
        controls={[]}
        onRequestClose={ this._closeModal } />
    )
  }

  renderModalContent() {
    const {data: price} = PriceLoader();
    if(!price) return;

    return (
      <div>
        <div className={styles.p}>
          Hosting The Tree is an honor, the whole community is going to admire you.
        </div>
        <div className={styles.p}>
          But keep in mind that any coins generated by hosting The Tree again <b>won't be given to your wallet</b>, they are going to be donated to a solidary cause:
        </div>
        <div className={styles.p}>((NAME OF THE REPEATING VALUE OWNER HERE))</div>
        <div className={styles.p}><a href="#1">Know more about these donations</a></div>
        <HostDialog amount={price} onButtonClicked={ this._closeModal } />
      </div>
    )
  }

  _openModal = (e: any) => {
    e.preventDefault();
    this.setState({isHostAgainModalOpen: true})
  }

  _closeModal = () => {
    if( this.state.isHostAgainModalOpen ){
      this.setState({isHostAgainModalOpen: false})
    }
  }
}

function isWithdrawVisible( amount: BigNumber ) {
  return amount.toNumber() > 0 ||
    isWithdrawing() ||
    Boolean(getWithdrawResult())
  ;
}
 
export default FormerHostContent;