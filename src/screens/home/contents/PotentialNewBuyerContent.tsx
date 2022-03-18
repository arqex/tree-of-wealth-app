import { BigNumber } from "ethers";
import { Component } from "react";
import Spinner from "../../../components/Spinner/Spinner";
import { Text } from "../../../components/Text/Text";
import { PriceLoader } from "../../../state/contract/contract.loaders";
import { getWithdrawResult, isWithdrawing } from "../../../state/transactions/transactions.selectors";
import { getConnectedAddress } from "../../../state/wallet/wallet.selectors";
import { formatAddress } from "../../../utils/format";
import { HostDialog } from "./components/HostDialog";
import { LearnMoreLink } from "./components/LearnMoreLinkt";
import styles from './homeContents.module.css';

interface PotentialNewBuyerContentProps {
  
}
 
interface PotentialNewBuyerContentState {
  
}
 
class PotentialNewBuyerContent extends Component<PotentialNewBuyerContentProps, PotentialNewBuyerContentState> {
  state = {
    isWalletModalOpen: false
  }

  render() {
    return (
      <div>
        <Text type="h2" margin="l">Welcome {formatAddress(getConnectedAddress())}, The Tree sees great potential in you.</Text>
        { this.renderPrice() }
        <LearnMoreLink />
      </div>
    )
  }

  renderPrice() {
    const {data: price, isLoading, error} = PriceLoader();
    if( isLoading ){
      return <Spinner />;
    }

    if( !price || error ){
      return (
        <div className={`${styles.section} ${styles.pod}`}>
          There was an error loading the price of The Tree. <a>Retry to load</a>
        </div>
      );
    }

    return (
      <div className={`${styles.section}` }>
        <HostDialog amount={price} />
      </div>
    )
  }
}

function isWithdrawVisible( amount: BigNumber ) {
  return amount.toNumber() > 0 ||
    isWithdrawing() ||
    Boolean(getWithdrawResult())
  ;
}
 
export default PotentialNewBuyerContent;