import { Component, LinkHTMLAttributes } from "react";

interface LinkProps extends LinkHTMLAttributes<HTMLLinkElement> {
  
}
 
interface LinkState {
  
}
 
class Link extends Component<LinkProps, LinkState> {
  render() { 
    const {children, onClick, ...props} = this.props;
    return (
      // @ts-ignore
      <a onClick={this._onClick} {...props}>
        {children}
      </a>
    );
  }

  _onClick = (e: any) => {
    const {onClick} = this.props;
    const href = e.target.getAttribute('href');
    if( href[0] === '/' ){
      e.preventDefault();
      // @ts-ignore
      window.history.pushState({}, '', href);
      // @ts-ignore
      window.onpopstate();
    }

    onClick && onClick(e);
  }
}
 
export default Link;