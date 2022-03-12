import { Component } from "react";
import styles from './Home.module.css';
import tree from './tree.png';

interface HomeLayoutProps {
  title: string,
  subtitle?: string,
  content: any
}
 
interface HomeLayoutState {
  
}
 
class HomeLayout extends Component<HomeLayoutProps, HomeLayoutState> {
  render() { 
    const {title, content} = this.props;
    return (
      <div className={ styles.layoutContainer }>
        <div className={ styles.layoutImage}>
          <img src={tree} />
        </div>
        <div className={styles.title}>{title}</div>
        { this.renderSubtitle() }
        <div className={styles.layoutContent}>{content}</div>
      </div>
    );
  }

  renderSubtitle() {
    const {subtitle} = this.props;
    if( subtitle ){
      return <div className={ styles.subtitle }>{subtitle}</div>;
    }
  }
}
 
export default HomeLayout;