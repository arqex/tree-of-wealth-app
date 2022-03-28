import { Component } from "react";
import Button from "../../components/Button/Button";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMesage";
import Pod from "../../components/Pod/Pod";
import Spinner from "../../components/Spinner/Spinner";
import { Text } from "../../components/Text/Text";
import { resetBuyResult, resetWithdrawResult, TransactionResult } from "../../state/transactions/transactions.reducers";
import { getBuyResult, getWithdrawResult } from "../../state/transactions/transactions.selectors";
import { mergeClasses } from "../../utils/mergeClasses";
import styles from './TransactionLayer.module.css';

type TransactionState = "none" | "withdrawing" | "hosting";

interface TransactionLayerProps {
  transaction: TransactionState
}
 
interface TransactionLayerState {
  inTransaction: boolean,
  showingTransactionMessage: boolean,
  lastTransaction: TransactionState
}
 
class TransactionLayer extends Component<TransactionLayerProps, TransactionLayerState> {
  // @ts-ignore
  state = {
    inTransaction: false,
    showingTransactionMessage: false,
    lastTransaction: "none"
  }

  render() { 
    let classes = mergeClasses(
      styles.transactionLayer,
      this.state.inTransaction && styles.inTransaction
    )
    return (
      <div className={classes}>
        {this.renderTransactionMessage()}
        <div className={styles.transactionContent}>
          {this.props.children}
        </div>
      </div>
    );
  }

  renderTransactionMessage() {
    const {showingTransactionMessage, lastTransaction} = this.state;
    if( showingTransactionMessage ){
      if( lastTransaction === 'withdrawing' ){
        const result = getWithdrawResult();
        if( result && result.error?.code !== 4001 ){
          return this.renderWithdrawResult();
        }
        return this.renderWithdrawing();
      }
      if( lastTransaction === 'hosting' ){
        const result = getBuyResult();
        if( result && result.error?.code !== 4001 ){
          return this.renderHostResult();
        }
        return this.renderBecomingHost();
      }
    }
  }

  renderWithdrawResult() {
    const result = getWithdrawResult();

    if( !result ) return;

    if( result.result === 'ok' ){
      return (
        <div className={styles.transactionMessage}>
          <Pod>
            <Text type="h2" block>Thanks to The Tree, your coins should be in your wallet.</Text>
            <Text block>Why don't you commemorate this awesome event by sharing it in your social networks? You will help The Tree to have more hosts and the community will thank you for doing so.</Text>
            <div>
              <Button width={160} onClick={ this._close }>Close</Button>
            </div>
          </Pod>
        </div>
      );
    }

    return this.renderTransactError(result, 'I was not possible to transfer the coins to your wallet because of the following reason:');
  }

  renderWithdrawing() {
    return (
      <div className={styles.transactionMessage}>
        <Pod>
          <Text type="h2" margin="m">Withdrawing...</Text>
          <Text block>Please accept the transaction in your wallet.</Text>
          <div className={styles.spinner}>
            <Spinner />
          </div>
          <Text type="small">Withdraw process might take some minutes to finish.</Text>
        </Pod>
      </div>
    )
  }

  renderHostResult() {
    const result = getBuyResult();

    if( !result ) return;

    if( result.result === 'ok' ){
      return (
        <div className={styles.transactionMessage}>
          <Pod>
            <Text type="h2" block>Your are now the new host of The Tree.</Text>
            <Text block>The Tree comes with the great responsibility of spreading the word. Maybe the next host is waiting among your friends, share it in your favorite social network.</Text>
            <div>
              <Button width={160} onClick={ this._close }>Close</Button>
            </div>
          </Pod>
        </div>
      );
    }

    return this.renderTransactError(result, 'I was not possible to transfer The Tree to your wallet because of the following reason:');
  }

  renderTransactError( result: TransactionResult, message: string ) {
    return (
      <div className={styles.transactionMessage}>
        <Pod>
          <Text type="h2" block>Oh my! Something weird happened.</Text>
          <Text block>{message}</Text>
          <div style={{marginBottom: 20}}>
            <ErrorMessage>{result.error?.message}</ErrorMessage>
          </div>
          <div>
            <Button width={160} onClick={ this._close }>Close</Button>
          </div>
        </Pod>
      </div>
    );
  }

  renderBecomingHost() {
    return (
      <div className={styles.transactionMessage}>
        <Pod>
          <Text type="h2" margin="m">Becoming the host...</Text>
          <Text block>Please accept the transaction in your wallet.</Text>
          <div className={styles.spinner}>
            <Spinner />
          </div>
          <Text>It might take some minutes to finish...</Text>
        </Pod>
      </div>
    )
  }

  componentDidUpdate( {transaction: prev}: TransactionLayerProps ){
    const {transaction: current} = this.props;
    if( prev === 'none' && prev !== current ){
      this.setState({
        showingTransactionMessage: true,
        lastTransaction: current
      });
      setTimeout( () => this.setState({inTransaction: true}));
    }

    const result = getBuyResult() || getWithdrawResult();
    if( result?.error?.code === 4001 ){
      this._close();
    }

    /*
    else if( current === 'none' && prev !== current ){
      this.setState({
        inTransaction: false
      });
      setTimeout( () => this.setState({showingTransactionMessage: false}), 300 );
    }
    */
  }

  closed = false;
  _close = () => {
    if( !this.closed ){
      this.closed = true;
      this.setState({
        inTransaction: false
      });
      setTimeout( () => {
        resetWithdrawResult();
        resetBuyResult();
        this.setState({showingTransactionMessage: false});
        this.closed = false;
      }, 300 );
    }
  }
}
 
export default TransactionLayer;