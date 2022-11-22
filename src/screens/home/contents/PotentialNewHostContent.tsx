import { Component } from "react";
import Spinner from "../../../components/Spinner/Spinner";
import { Text } from "../../../components/Text/Text";
import { PriceLoader } from "../../../state/contract/contract.loaders";
import { getConnectedAddress } from "../../../state/wallet/wallet.selectors";
import { formatAddress } from "../../../utils/format";
import { HostDialog } from "./components/HostDialog";
import { LearnMoreLink } from "./components/LearnMoreLinkt";
import styles from './homeContents.module.css';

interface PotentialNewHostContentProps {
  
}
 
interface PotentialNewHostContentState {
  
}
 
class PotentialNewHostContent extends Component<PotentialNewHostContentProps, PotentialNewHostContentState> {
  state = {
    isWalletModalOpen: false
  }

  render() {
    return (
      <div style={{marginTop: 20}}>
        <Text type="h2" margin="m">Welcome {formatAddress(getConnectedAddress())}, The Tree sees great potential in you.</Text>
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

    if( error ){
      return (
        <div className={`${styles.section} ${styles.pod}`}>
          There was an error loading the price of The Tree. <a href="#1">Retry to load</a>
        </div>
      );
    }
    
    if(!price) {
      return (
        <div style={{margin: '20px auto'}}>
          <Spinner />
        </div>
      )
    }

    return (
      <div className={`${styles.section}` }>
        <HostDialog amount={price} />
      </div>
    )
  }
}
 
export default PotentialNewHostContent;