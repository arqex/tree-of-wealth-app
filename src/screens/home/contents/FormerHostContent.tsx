import { BigNumber } from "ethers";
import { Component } from "react";
import Spinner from "../../../components/Spinner/Spinner";
import { AvailableToWithdrawLoader } from "../../../state/contract/contract.loaders";
import { getWithdrawResult, isWithdrawing } from "../../../state/transactions/transactions.selectors";
import { getConnectedAddress } from "../../../state/wallet/wallet.selectors";
import HomeLayout from "../HomeLayout";
import { LearnMoreLink } from "./components/LearnMoreLinkt";
import { WithdrawDialog } from "./components/WithdrawDialog";
import styles from './homeContents.module.css';

interface FormerHostContentProps {
  
}
 
interface FormerHostContentState {
  
}
 
class FormerHostContent extends Component<FormerHostContentProps, FormerHostContentState> {
  state = {
    isWalletModalOpen: false
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
      </div>
    )
  }

  renderPrice() {
    
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
}

function isWithdrawVisible( amount: BigNumber ) {
  return amount.toNumber() > 0 ||
    isWithdrawing() ||
    Boolean(getWithdrawResult())
  ;
}
 
export default FormerHostContent;