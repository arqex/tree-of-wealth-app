import { BigNumber, BigNumberish, ethers } from 'ethers';
import { Component } from 'react';
import Button from '../../../../components/Button/Button';
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMesage';
import { withdraw } from '../../../../state/transactions/transactions.actions';
import { resetWithdrawResult, TransactionResult } from '../../../../state/transactions/transactions.reducers';
import { isWithdrawing, getWithdrawResult } from '../../../../state/transactions/transactions.selectors';
import styles from '../homeContents.module.css';

interface WithdrawDialogProps {
  amount: BigNumber
}

interface WithdrawDialogState {
  prevAmount: BigNumberish
}


export class WithdrawDialog extends Component<WithdrawDialogProps, WithdrawDialogState> {
  state = {
    prevAmount: 0
  }

  render() {
    const result = getWithdrawResult();

    if( result?.result === 'ok' ){
      return this.renderWithdrawFinished();
    }

    const {amount} = this.props;

    return (
      <div className={styles.pod}>
        <div className={styles.p}>The Tree has been holding some coins for you...</div>
        <div className={styles.p}>
          <span className={styles.amount}>{ethers.utils.formatEther(amount)}</span>
          <span className={styles.matic}>MATIC</span>
        </div>
        { this.renderWithdrawingText(result) }
        <div>
          <Button onClick={ withdraw }
            loadingText="Withdrawing"
            loading={ isWithdrawing() }
            width={160}>
              Withdraw
          </Button>
        </div>
      </div>
    );
  }

  renderWithdrawFinished() {
    return (
      <div className={styles.pod}>
        <div className={styles.p}>The coins are all yours, handle them wisely.</div>
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

  renderWithdrawingText(result?: TransactionResult) {
    if( isWithdrawing() ){
      return (
        <div className={styles.p}>
          Withdraw in process, it might take some minutes...
        </div>
      )
    }
    if( result?.error ){
      return (
        <div className={styles.p}>
          <ErrorMessage onClose={ resetWithdrawResult }>
            { result.error.message }
          </ErrorMessage>
        </div>
      )
    }
  }

  componentDidUpdate({amount: prevAmount}: WithdrawDialogProps) {
    const {amount: currentAmount} = this.props;

    if( prevAmount && !prevAmount.eq(currentAmount) && prevAmount.gt(0) ){
      this.setState({prevAmount});
    }
  }
}