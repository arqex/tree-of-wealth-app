import { Component } from "react";
import HomeLayout from "./HomeLayout";
import styles from './Home.module.css';
import Button from "../../components/Button/Button";
import { isWalletAvailable } from "../../state/wallet/wallet.selectors";
import { isValidNetwork } from "../../utils/networks";
import { AccountLoader, NetworkLoader } from "../../state/wallet/wallet.loaders";
import { Network } from "@ethersproject/networks";
import { HasBeenHostLoader, HostLoader } from "../../state/contract/contract.loaders";
import { requestAddressConnection } from "../../state/wallet/wallet.actions";
import NoConenctedContent from "./contents/NoConnectedContent";
import FormerHostContent from "./contents/FormerHostContent";
import CurrentHostContent from "./contents/CurrentHostContent";
import PotentialNewBuyerContent from "./contents/PotentialNewBuyerContent";
import Spinner from "../../components/Spinner/Spinner";

interface HomeScreenProps {
  
}
 
interface HomeScreenState {
  
}
 
class HomeScreen extends Component<HomeScreenProps, HomeScreenState> {
  render() { 
    return (
      <div className={styles.container}>
        { this.renderContent() }
      </div>
    )
  }

  renderContent() {
    const  {data: network, isLoading: isNetworkLoading} = NetworkLoader();
    const {data: account} = AccountLoader();

    if( isNetworkLoading || !network ){
      return this.renderLoading();
    }

    if( !isValidNetwork(network.chainId) ){
      return this.renderNetworkNotValid(network);
    }

    if( !account ){
      return <NoConenctedContent />;
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

  renderNetworkNotValid(network: Network) {
    return null;
  }
}
 
export default HomeScreen;