import { Component, LinkHTMLAttributes } from "react";
import { scrollToAnchor } from "../../utils/scrollToAnchor";

interface LinkProps extends LinkHTMLAttributes<HTMLLinkElement> {
  
}
 
interface LinkState {
  
}
 
class Link extends Component<LinkProps, LinkState> {
  render() { 
    const {children, onClick, href, ...props} = this.props;
    let newTabAttributes: any = {};
    if( href?.startsWith('http') ) {
      newTabAttributes = {
        target: '_blank',
        rel: 'noopener norereffer'
      };
    }
    return (
      // @ts-ignore
      <a onClick={this._onClick}
       {...newTabAttributes}
       href={href}
       {...props}>
        {children}
      </a>
    );
  }

  _onClick = (e: any) => {
    const {onClick} = this.props;
    const href = e.currentTarget.getAttribute('href');
    if( href[0] === '/' ){
      e.preventDefault();
      // @ts-ignore
      window.history.pushState({}, '', href);
      // @ts-ignore
      window.onpopstate();
    }
    else if( href[0] === '#' ){
      scrollToAnchor(e);
    }

    onClick && onClick(e);
  }
}
 
export default Link;