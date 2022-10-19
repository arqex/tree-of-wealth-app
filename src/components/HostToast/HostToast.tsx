import { Component } from "react";
import { resetHostResult, TransactionResult } from "../../state/transactions/transactions.reducers";
import { Toast } from "../Toast/Toast";

interface HostToastProps {
  inProcess: boolean,
  result?: TransactionResult
}
 
interface HostToastState {
  isShowing: boolean,
  cache: HostToastProps
}
 
class HostToast extends Component<HostToastProps, HostToastState> {
  state = {
    isShowing: false,
    cache: {
      inProcess: false
    }
  }

  render() {
    const {isShowing} = this.state;
    const {inProcess, result} = this.getProps();

    return (
      <Toast isOpen={isShowing}>
        { this.renderContent(inProcess, result) }
      </Toast>
    );
  }

  renderContent(inProcess: boolean, result?: TransactionResult ){
    if( inProcess ){
      return <div>Waiting for finishing buying The Tree...</div>;
    }
    else if( result?.result === 'ok' ){
      return <div>The wait has finished. You are the new owner of the Tree of Wealth. <a href="#1" onClick={ this._discard }>Close</a></div>
    }
    else if( result?.result === 'error' ){
      return <div>{result?.error}</div>;
    }
  }

  getProps(): HostToastProps {
    if( this.state.isShowing ){
      return this.props;
    }
    return this.state.cache;
  }

  _discard = () => {
    resetHostResult();
  }

  componentDidUpdate({inProcess, result}: HostToastProps){
    if( !this.props.inProcess && !this.props.result ){
      if( inProcess || result ){
        this.setState({
          cache: {inProcess, result},
          isShowing: false
        });
        setTimeout( () => {
          this.setState({cache:{inProcess: false}});
        }, 300);
      }
    }

    if( (this.props.inProcess || this.props.result) && !this.state.isShowing ){
      this.setState({isShowing: true});
    }
  }
}
 
export default HostToast;