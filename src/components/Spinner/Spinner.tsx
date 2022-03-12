import { Component } from "react";
import BeatLoader from "react-spinners/BeatLoader";

interface SpinnerProps {
  size?: number,
  color?: string
}
 
interface SpinnerState {
  
}
 
class Spinner extends Component<SpinnerProps, SpinnerState> {
  render() { 
    return (
      <BeatLoader
        size={ this.props.size || 16 }
        color={ this.props.color || 'rgba(0,0,0,.8)'} />
    );
  }
}
 
export default Spinner;