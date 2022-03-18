
import { Component } from 'react';
import './App.css';
import { getCurrentScreenComponents, getRouter } from './router/router';
import { bindContractListeners } from './state/contract/contract.actions';
import { setUIRefresher, stateManager } from './state/stateManager';
import { getTransactionStatus } from './state/transactions/transactions.selectors';
import { onNetworkChanged } from './state/wallet/wallet.actions';
import { getWalletType } from './state/wallet/wallet.selectors';
import { mergeClasses } from './utils/mergeClasses';
import styles from './App.module.css';


export default class App extends Component {
  constructor(props: any) {
    super(props);
    onNetworkChanged(bindContractListeners);
  }

  render() {
    const Screen = getCurrentScreenComponents()[0];

		if (!Screen) return this.renderScreenNotFound();

    const transactionStatus = getTransactionStatus();
    const walletType = getWalletType();

    let classes = mergeClasses(
      styles.app,
      styles[`app_${transactionStatus}`],
      styles[`app_${walletType}`]
    );

		return (
      <div className={ classes }>
        <Screen />
      </div>
    );
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