import { BigNumber, BigNumberish, ethers } from 'ethers';
import { Component } from 'react';
import Button from '../../../../components/Button/Button';
import { host } from '../../../../state/transactions/transactions.actions';
import { isBecomingHost } from '../../../../state/transactions/transactions.selectors';
import styles from '../homeContents.module.css';

interface HostDialogProps {
  amount: BigNumber,
  onButtonClicked?: Function
}

interface HostDialogState {
  prevAmount: BigNumberish
}


export class HostDialog extends Component<HostDialogProps, HostDialogState> {
  state = {
    prevAmount: 0
  }

  render() {
    const {amount} = this.props;

    return (
      <div className={styles.pod}>
        <div className={styles.p}>Current price of hosting The Tree is...</div>
        <div className={styles.p}>
          <span className={styles.amount}>{ethers.utils.formatEther(amount)}</span>
          <span className={styles.matic}>ETH</span>
        </div>
        <div>
          <Button onClick={ this._onBuyClicked }
            loadingText="Becoming host"
            loading={ isBecomingHost() }
            width={180}>
              Become the host
          </Button>
        </div>
      </div>
    );
  }

  _onBuyClicked = () => {
    host( this.props.amount );
    if( this.props.onButtonClicked ){
      this.props.onButtonClicked();
    }
  }
}