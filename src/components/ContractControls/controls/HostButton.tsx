import { Component } from "react";
import { HostLoader, PriceLoader } from "../../../state/contract/contract.loaders";
import { host } from "../../../state/transactions/transactions.actions";
import { formatPrice } from "../../../utils/format";
import ConfirmModal from "../../ConfirmModal/ConfirmModal";
interface HostButtonProps {
  
}
 
interface HostButtonState {
  isModalOpen: boolean,
  isBecomingHost: boolean
}
 
export class HostButton extends Component<HostButtonProps, HostButtonState> {
  state = {
    isModalOpen: false,
    isBecomingHost: false
  };

  render() { 
    const {isModalOpen, isBecomingHost} = this.state;
    const {data: owner} = HostLoader();
    const {data: price} = PriceLoader();

    return (
      <div>
        <button
          disabled={owner === undefined}
          onClick={ this._openModal }>
            { isBecomingHost ? 'Transferring The Tree...' : 'Become a host'}
        </button>
        <ConfirmModal isOpen={isModalOpen}
          onRequestClose={ this._closeModal }
          title="Become the host of the Tree of Wealth"
          content={
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              <div>Current price:</div>
              <div>{ formatPrice(price) }</div>
            </div>
          }
          controls={
            <button onClick={ this._pay }>Host The Tree</button>
          } />
      </div>
    );
  }

  _openModal = () => {
    this.setState({isBecomingHost: true});
    this.setState({isModalOpen: true});
  }

  _closeModal = () => {
    this.setState({isBecomingHost: false});
    this.setState({isModalOpen: false});
  }

  _pay = () => {
    const {data: price} = PriceLoader();
    if( price ){
      host(price);
    }
  }
}
 