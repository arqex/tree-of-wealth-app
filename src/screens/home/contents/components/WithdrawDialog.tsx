import { BigNumber, BigNumberish, ethers } from 'ethers';
import { Component } from 'react';
import Button from '../../../../components/Button/Button';
import Pod from '../../../../components/Pod/Pod';
import { withdraw } from '../../../../state/transactions/transactions.actions';
import { resetWithdrawResult } from '../../../../state/transactions/transactions.reducers';
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
      <Pod>
        <div className={styles.p}>The Tree has been holding some coins for you...</div>
        <div className={styles.p}>
          <span className={styles.amount}>{ethers.utils.formatEther(amount)}</span>
          <span className={styles.matic}>MATIC</span>
        </div>
        <div>
          <Button onClick={ withdraw }
            loadingText="Withdrawing"
            loading={ isWithdrawing() }
            width={160}>
              Withdraw
          </Button>
        </div>
      </Pod>
    );
  }

  renderWithdrawFinished() {
    return (
      <Pod>
        <div className={styles.p}>The coins are all yours, handle them wisely.</div>
        <div className={styles.p}>
          <span className={styles.amount}>{ethers.utils.formatEther(this.state.prevAmount)}</span>
          <span className={styles.matic}>MATIC</span>
        </div>
        <div>
            <Button onClick={ () => resetWithdrawResult() }
              width={160}>
                Close
            </Button>
          </div>
      </Pod>
    )
  }

  componentDidUpdate({amount: prevAmount}: WithdrawDialogProps) {
    const {amount: currentAmount} = this.props;

    if( prevAmount && !prevAmount.eq(currentAmount) && prevAmount.gt(0) ){
      this.setState({prevAmount});
    }
  }
}