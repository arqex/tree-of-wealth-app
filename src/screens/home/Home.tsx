import { Component } from "react";
import styles from './Home.module.css';
import { isValidNetwork } from "../../utils/networks";
import { AccountLoader, NetworkLoader } from "../../state/wallet/wallet.loaders";
import { HasBeenHostLoader, HostLoader } from "../../state/contract/contract.loaders";
import NoConnectedContent from "./contents/NoConnectedContent";
import FormerHostContent from "./contents/FormerHostContent";
import CurrentHostContent from "./contents/CurrentHostContent";
import PotentialNewHostContent from "./contents/PotentialNewHostContent";
import Spinner from "../../components/Spinner/Spinner";
import HomeLayout from "./HomeLayout";
import TransactionLayer from "./TransactionLayer";
import { getTransactionStatus } from "../../state/transactions/transactions.selectors";
import NetworkNotValidContent from "./contents/NetworkNotValidContent";
import TreeIntroduction from "./TreeIntroduction";
import { isWalletAvailable } from "../../state/wallet/wallet.selectors";
import classnames from 'classnames';

interface HomeScreenProps {
  
}
 
interface HomeScreenState {
  
}
 
class HomeScreen extends Component<HomeScreenProps, HomeScreenState> {
  render() { 
    return (
      <div className={styles.container}>
        <div className={styles.homeSection} id="main">
          <div className={ styles.bg }>
            <div className={styles.bg_layer1} />
            <div className={styles.bg_layer2} />
            <div className={styles.bg_layer3} />
          </div>
          <HomeLayout
            title="The Tree of Wealth"
            content={ this.renderTransactionContainer() } />
        </div>
        <div className={classnames(styles.homeSection, styles.aboutSection)} id="about">
          <div className={ styles.bg }>
            <div className={styles.bg_layer4} />
            <div className={styles.bg_layer5} />
            <div className={styles.bg_layer6} />
          </div>
          <TreeIntroduction />
        </div>
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
    if( !isWalletAvailable() ){
      return <NoConnectedContent />;
    }
    const {data: network, isLoading: isNetworkLoading} = NetworkLoader();
    const {data: account} = AccountLoader();

    if( isNetworkLoading || !network ){
      return this.renderLoading();
    }

    if( !account ){
      return <NoConnectedContent />;
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

    return <PotentialNewHostContent />;
  }

  renderLoading() {
    return <Spinner />;
  }
}
 
export default HomeScreen;