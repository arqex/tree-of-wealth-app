import { Component } from "react";
import styles from './Pod.module.css';

interface PodProps {
  
}
 
interface PodState {
  
}
 
class Pod extends Component<PodProps, PodState> {
  state = {};

  render() { 
    return (
      <div className={styles.pod}>
        {this.props.children}
      </div>
    );
  }
}
 
export default Pod;