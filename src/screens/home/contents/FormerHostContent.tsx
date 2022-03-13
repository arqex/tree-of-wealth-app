import { BigNumber, ethers } from "ethers";
import { Component } from "react";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import Spinner from "../../../components/Spinner/Spinner";
import { AvailableToWithdrawLoader, PriceLoader } from "../../../state/contract/contract.loaders";
import { getWithdrawResult, isBuying, isWithdrawing } from "../../../state/transactions/transactions.selectors";
import { getConnectedAddress } from "../../../state/wallet/wallet.selectors";
import HomeLayout from "../HomeLayout";
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
      <HomeLayout 
        title="The Tree of Wealth"
        subtitle="Welcome dear former host, it's always nice to see you again."
        content={ this.renderContent() }
      />
    );
  }

  renderContent() {
    return (
      <div>
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
      <div className={styles.p}>
        Current price for hosting the tree is {formatted} MATIC. <a onClick={ this._openModal }>Host it again</a>.
      </div>
    );
  }

  renderWithdraw() {
    const address = getConnectedAddress();
    let {data: amount, isLoading, error, retry} = AvailableToWithdrawLoader(address);

    if( isLoading ){
      return <Spinner />
    }

    if( error ){
      return (
        <div className={`${styles.section} ${styles.pod}`}>
          There was an error loading the amount available to withdraw. <a >Retry to load</a>
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
        <div className={styles.p}>
          There hasn't been any new host since the last time you withdraw from The Tree.
        </div>
        <div className={styles.p}>
          If you'd like to help The Tree to have more hosts you can share it with the world on your favorite social network
        </div>
        <div className={styles.p}>
          <a>Twitter</a> - <a>Facebook</a> - <a>Instagram</a> - <a>TikTok</a>
        </div>
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
        <div className={styles.p}><a>Know more about these donations</a></div>
        <HostDialog amount={price} />
      </div>
    )
  }

  _openModal = () => {
    this.setState({isHostAgainModalOpen: true})
  }

  _closeModal = () => {
    if( !isBuying() ){
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