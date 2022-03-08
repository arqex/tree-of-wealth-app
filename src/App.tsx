
import { Component } from 'react';
import './App.css';
import BuyToast from './components/BuyToast/BuyToast';
import ConnectButton from './components/ConnectButton/ConnectButton';
import ContractControls from './components/ContractControls/ContractControls';
import { getCurrentScreenComponents, getRouter } from './router/router';
import { bindContractListeners } from './state/contract/contract.actions';
import { setUIRefresher, stateManager } from './state/stateManager';
import { resetBuyResult, setBuyResult, setIsBuying } from './state/transactions/transactions.reducers';
import { getBuyResult, isBuying } from './state/transactions/transactions.selectors';
import { onNetworkChanged } from './state/wallet/wallet.actions';
import { NetworkLoader } from './state/wallet/wallet.loaders';


export default class App extends Component {
  constructor(props: any) {
    super(props);
    onNetworkChanged(bindContractListeners);
  }

  render() {
    const Screen = getCurrentScreenComponents()[0];

		if (!Screen) return this.renderScreenNotFound();

		return <Screen />;
  }

	renderScreenNotFound() {
		return <div>404 page not found</div>;
	}

  componentDidMount() {
    setUIRefresher( this._forceUpdate )
    stateManager.addChangeListener(this._forceUpdate );
    getRouter().onChange(this._forceUpdate);
  }

  _forceUpdate = () => this.forceUpdate();

}
