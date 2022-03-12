import { Component } from "react";
import BuyToast from "../../components/BuyToast/BuyToast";
import ConnectButton from "../../components/ConnectButton/ConnectButton";
import ContractControls from "../../components/ContractControls/ContractControls";
import { resetBuyResult, setBuyResult, setIsBuying } from "../../state/transactions/transactions.reducers";
import { getBuyResult, isBuying } from "../../state/transactions/transactions.selectors";
import { NetworkLoader } from "../../state/wallet/wallet.loaders";

interface SettingsScreenProps {
  
}
 
interface SettingsScreenState {
  
}
 
class SettingsScreen extends Component<SettingsScreenProps, SettingsScreenState> {
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
  _open = () => {
    setIsBuying(true);
  }

  _setResultOk = () => {
    setBuyResult({result: 'ok'});
  }

  _setResultError = () => {
    setBuyResult({result: 'error', error: {code: 0, message: 'Somethign went wrong'}});
  }

  _resetResult = () => {
    resetBuyResult();
  }
}
 
export default SettingsScreen;