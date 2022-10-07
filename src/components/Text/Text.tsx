import { Component } from 'react';
import { mergeClasses } from '../../utils/mergeClasses';
import styles from './Text.module.css';

interface TextProps {
  type?: 'h1' | 'h2' | 'h3' | 'small',
  color?: 'main' | 'secondary' | 'link'
  block?: boolean,
  margin?: 'xs' | 's' | 'm' | 'l',
  className?: string
}
 
interface TextState {}
 
export class Text extends Component<TextProps, TextState> {
  render() {
    const {type, color, children, block, margin, className} = this.props;

    let classes = mergeClasses(
      styles.text,
      type && styles['type_' + type],
      styles['color_' + color],
      block && styles.block,
      styles['margin_' + margin],
      className
    );

    if( type === 'h1'){
      return <h1 className={classes}>{ children }</h1>;
    }
    else if( type === 'h2'){
      return <h2 className={classes}>{ children }</h2>;
    }
    else if( type === 'h3'){
      return <h3 className={classes}>{ children }</h3>;
    }

    return <span className={ classes }>{ children }</span>;
  }
}