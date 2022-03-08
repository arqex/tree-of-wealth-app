
import { Component } from 'react';
import './App.css';
import BuyToast from './components/BuyToast/BuyToast';
import ConnectButton from './components/ConnectButton/ConnectButton';
import ContractControls from './components/ContractControls/ContractControls';
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
    const result = NetworkLoader();
    return (
      <div className="App">
        <BuyToast inProcess={ isBuying() } result={ getBuyResult() } />
        <header className="App-header">
          The tree of wealth {JSON.stringify(result.data)}
        </header>
        <div>
          The tree will grant wealth to whoever may ever hosted it.
        </div>
        <div>
          <div>
            <button>How does it work?</button>
            <ConnectButton />
          </div>
        </div>
        <ContractControls />
        <button onClick={ this._open }>Open loading</button>
        <button onClick={ this._setResultOk }>Set result ok</button>
        <button onClick={ this._setResultError }>Set result error</button>
        <button onClick={ this._resetResult }>Reset result</button>
      </div>
    );
  }

  componentDidMount() {
    setUIRefresher( this._forceUpdate )
    stateManager.addChangeListener(this._forceUpdate );
  }

  _forceUpdate = () => this.forceUpdate();

  _open = () => {
    setIsBuying(true);
  }

  _setResultOk = () => {
    setBuyResult({result: 'ok'});
  }

  _setResultError = () => {
    setBuyResult({result: 'error', error: 'Somethign went wrong'});
  }

  _resetResult = () => {
    resetBuyResult();
  }
}
