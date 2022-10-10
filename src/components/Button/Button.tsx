import { ButtonHTMLAttributes, Component } from "react";
import { mergeClasses } from "../../utils/mergeClasses";
import Icom from "../Icon/Icon";
import Spinner from "../Spinner/Spinner";
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: number,
  loading?: boolean,
  loadingText?: string,
  href?: string,
  transparent?: boolean,
  icon?: string
}
 
interface ButtonState {
  
}
 
class Button extends Component<ButtonProps, ButtonState> {
  render() { 
    const {children, loading, href, icon, transparent, ...props} = this.props;
    const content = loading ?
      this.renderLoading() :
      this.props.children
    ;

    console.log('Icon', icon);

    if( href ){
      return(
        // @ts-ignore
        <a className={styles.button}
          style={{width: this.props.width}}
          disabled={loading}
          href={href}
          {...props}>
            { icon && <Icom name={icon} />}
            { content }
        </a>

      )
    }

    const classes = mergeClasses(
      styles.button,
      transparent && styles.transparent,
      icon && styles.withIcon
    )

    return (
      <button className={classes}
        style={{width: this.props.width}}
        disabled={loading} {...props}>
        { icon && <span className={styles.icon}><Icom name={icon} /></span>}
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