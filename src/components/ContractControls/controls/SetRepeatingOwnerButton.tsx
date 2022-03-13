import { ChangeEvent, Component } from "react";
import { ContractOwnerLoader } from "../../../state/contract/contract.loaders";
import { setRepeatingOwner } from "../../../state/transactions/transactions.actions";
import { getConnectedAddress } from "../../../state/wallet/wallet.selectors";

interface SetRepeatingOwnerButtonProps {
  
}
 
interface SetRepeatingOwnerButtonState {
  address: string,
  error: string,
  setting: boolean
}
 
export class SetRepeatingOwnerButton extends Component<SetRepeatingOwnerButtonProps, SetRepeatingOwnerButtonState> {
  state = {
    address: '',
    error: '',
    setting: false
  }
  
  render() { 
    const {data: owner} = ContractOwnerLoader();
    if( !owner ) return null;
  
    const connectedAddress = getConnectedAddress();
    if( connectedAddress !== owner ) return null;

    const {address} = this.state;

    return (
      <div>
        <div>
          <label htmlFor="orphanOwnerAddr">New address for the orphan owner:</label>
        </div>
        <div>
          <input name="orphanOwnerAddr" value={ address } onChange={ this._updateAddress } />
        </div>
        {this.renderError()}
        <button disabled={!address} onClick={ this._startSetting }>Set orphan owner</button>
      </div>
    );
  }

  renderError() {
    const {error} = this.state;
    if( !error ) return;

    return (
      <div>{ error }</div>
    )
  }

  _updateAddress = (e: ChangeEvent<HTMLInputElement> ) => {
    this.setState({address: e.target.value});
  }

  _startSetting = () => {
    const {address} = this.state;
    if( !validateAddress(address) ){
      this.setState({error: 'Address is not valid'});
      return;
    }

    this.setState({
      error: '',
      setting: true
    })
    setRepeatingOwner( address, 'Repeating' );
  }
}


function validateAddress( address: string ){
  if( address.length !== 42 ) return false;
  if( !address.match(/^0x[0-9A-Fa-f]*$/) ) return false;

  return true;
}