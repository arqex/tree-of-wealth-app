import { Component } from "react";
import styles from './Home.module.css';
import { isValidNetwork } from "../../utils/networks";
import { AccountLoader, NetworkLoader } from "../../state/wallet/wallet.loaders";
import { Network } from "@ethersproject/networks";
import { HasBeenHostLoader, HostLoader } from "../../state/contract/contract.loaders";
import NoConenctedContent from "./contents/NoConnectedContent";
import FormerHostContent from "./contents/FormerHostContent";
import CurrentHostContent from "./contents/CurrentHostContent";
import PotentialNewBuyerContent from "./contents/PotentialNewBuyerContent";
import Spinner from "../../components/Spinner/Spinner";
import HomeLayout from "./HomeLayout";
import TransactionLayer from "./TransactionLayer";
import { getTransactionStatus } from "../../state/transactions/transactions.selectors";
import Pod from "../../components/Pod/Pod";
import NetworkNotValidContent from "./contents/NetworkNotValidContent";

interface HomeScreenProps {
  
}
 
interface HomeScreenState {
  
}
 
class HomeScreen extends Component<HomeScreenProps, HomeScreenState> {
  render() { 
    return (
      <div className={styles.container}>
        <HomeLayout
          title="The Tree of Wealth"
          content={ this.renderTransactionContainer() } />
      </div>
    )
  }
  
  renderTransactionContainer() {
    let transactionStatus: any = getTransactionStatus();
    if( transactionStatus !== 'withdrawing' && transactionStatus !== 'hosting' ){
      transactionStatus = 'none';
    }

    return (
      <TransactionLayer
        transaction={transactionStatus}>
          {this.renderContent()}
      </TransactionLayer>
    )
  }

  renderContent() {
    const {data: network, isLoading: isNetworkLoading} = NetworkLoader();
    const {data: account} = AccountLoader();

    if( isNetworkLoading || !network ){
      return this.renderLoading();
    }

    if( !account ){
      return <NoConenctedContent />;
    }

    if( !isValidNetwork(network.chainId) ){
      return <NetworkNotValidContent network={network} />;
    }


    const {data: currentHost} = HostLoader();
    const {data: hasBeenHost} = HasBeenHostLoader(account);

    if( currentHost === undefined || hasBeenHost === undefined ){
      return this.renderLoading();
    }

    if( currentHost === account ){
      return <CurrentHostContent />
    }
    else if( hasBeenHost ){
      return <FormerHostContent />
    }

    return <PotentialNewBuyerContent />;
  }

  renderLoading() {
    return <Spinner />;
  }
}
 
export default HomeScreen;