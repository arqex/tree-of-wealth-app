import { ButtonHTMLAttributes, Component } from "react";
import Spinner from "../Spinner/Spinner";
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: number,
  loading?: boolean,
  loadingText?: string
}
 
interface ButtonState {
  
}
 
class Button extends Component<ButtonProps, ButtonState> {
  render() { 
    const {children, loading, ...props} = this.props;
    const content = loading ?
      this.renderLoading() :
      this.props.children
    ;

    return (
      <button className={styles.button}
        style={{width: this.props.width}}
        disabled={loading} {...props}>
        { content }
      </button>
    );
  }

  renderLoading() {
    const {loadingText} = this.props;
    const spinner = (
      <span className={styles.dots}>
        <Spinner size={10} />
      </span>
    );

    if( loadingText ){
      return (
        <span className={styles.loading}>
          {loadingText}
          <span className={styles.separator}></span>
          {spinner}
        </span>
      );
    }
    return (
      <span className={styles.loading}>
        {spinner}
      </span>
    );
  }
}
 
export default Button;