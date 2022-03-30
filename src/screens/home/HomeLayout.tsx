import { Component } from "react";
import styles from './Home.module.css';
import tree from './tree.png';
import {Text} from '../../components/Text/Text';

interface HomeLayoutProps {
  title: string,
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
          <img src={tree} alt="The Tree" />
        </div>
        <Text type="h1" margin="xs">{title}</Text>
        <div className={styles.layoutContent}>{content}</div>
      </div>
    );
  }
}
 
export default HomeLayout;