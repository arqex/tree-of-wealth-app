import { Component } from "react";
import HostToast from "../../components/HostToast/HostToast";
import ConnectButton from "../../components/ConnectButton/ConnectButton";
import ContractControls from "../../components/ContractControls/ContractControls";
import { resetHostResult, setHostResult, setBecomingHost } from "../../state/transactions/transactions.reducers";
import { getHostResult, isBecomingHost } from "../../state/transactions/transactions.selectors";
import { NetworkLoader } from "../../state/wallet/wallet.loaders";
import { getItemMeta } from "../../state/contract/contract.actions";

interface SettingsScreenProps {
  
}
 
interface SettingsScreenState {
  
}
 
class SettingsScreen extends Component<SettingsScreenProps, SettingsScreenState> {
  render() { 
    const result = NetworkLoader();
    return (
      <div className="App">
        <HostToast inProcess={ isBecomingHost() } result={ getHostResult() } />
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
        <button onClick={ () => getItemMeta(1) }>Get meta</button>
      </div>
    );
  }
  _open = () => {
    setBecomingHost(true);
  }

  _setResultOk = () => {
    setHostResult({result: 'ok'});
  }

  _setResultError = () => {
    setHostResult({result: 'error', error: {code: 0, message: 'Somethign went wrong'}});
  }

  _resetResult = () => {
    resetHostResult();
  }
}
 
export default SettingsScreen;