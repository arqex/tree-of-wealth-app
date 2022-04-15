import * as React from 'react';
import styles from './LoadingText.module.css';

interface LoadingTextProps {
}
 
interface LoadingTextState {
  
}
 
class LoadingText extends React.Component<LoadingTextProps, LoadingTextState> {
  render() { 
    return (
      <div className={styles.container}>
        <div className={styles.placeholder}>{ this.props.children }</div>
        <div className={styles.bg}></div>
      </div>
    );
  }
}
 
export default LoadingText;