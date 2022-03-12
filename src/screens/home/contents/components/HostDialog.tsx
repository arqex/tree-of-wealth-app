import { BigNumber, BigNumberish, ethers } from 'ethers';
import { Component } from 'react';
import Button from '../../../../components/Button/Button';
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMesage';
import { buy, withdraw } from '../../../../state/transactions/transactions.actions';
import { resetBuyResult, resetWithdrawResult, TransactionResult } from '../../../../state/transactions/transactions.reducers';
import { isBuying, getBuyResult } from '../../../../state/transactions/transactions.selectors';
import styles from '../homeContents.module.css';

interface HostDialogProps {
  amount: BigNumber
}

interface HostDialogState {
  prevAmount: BigNumberish
}


export class HostDialog extends Component<HostDialogProps, HostDialogState> {
  state = {
    prevAmount: 0
  }

  render() {
    const result = getBuyResult();

    if( result?.result === 'ok' ){
      return this.renderBuyFinished();
    }

    const {amount} = this.props;

    return (
      <div className={styles.pod}>
        <div className={styles.p}>Current price of hosting The Tree is...</div>
        <div className={styles.p}>
          <span className={styles.amount}>{ethers.utils.formatEther(amount)}</span>
          <span className={styles.matic}>MATIC</span>
        </div>
        { this.renderBuyingText(result) }
        <div>
          <Button onClick={ e => buy(amount) }
            loadingText="Becoming host"
            loading={ isBuying() }
            width={160}>
              Withdraw
          </Button>
        </div>
      </div>
    );
  }

  renderBuyFinished() {
    return (
      <div className={styles.pod}>
        <div className={styles.p}>The coins have been withdrawn.</div>
        <div className={styles.p}>
          <span className={styles.amount}>{ethers.utils.formatEther(this.state.prevAmount)}</span>
          <span className={styles.matic}>MATIC</span>
        </div>
        <div>
            <Button onClick={ resetWithdrawResult }
              width={160}>
                Close
            </Button>
          </div>
      </div>
    )
  }

  renderBuyingText(result?: TransactionResult ) {
    if( isBuying() ){
      return (
        <div className={styles.p}>
          Hosting in process, it might take some minutes...
        </div>
      )
    }
    if( result?.error ){
      return (
        <div className={styles.p}>
          <ErrorMessage onClose={ resetBuyResult }>
            { result.error.message }
          </ErrorMessage>
        </div>
      )
    }
  }
}