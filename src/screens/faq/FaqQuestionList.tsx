
import { Component } from "react";
import Link from "../../components/Link/Link";
import { Text } from "../../components/Text/Text";
import faqItems, { FaqItem } from './FaqItems';
import styles from './FaqScreen.module.css';

interface FaqQuestionListProps {
  onSelected: any
}
 
interface FaqQuestionListState {
  
}
 
class FaqQuestionList extends Component<FaqQuestionListProps, FaqQuestionListState> {
  render() { 
    return (
      <div className={styles.questionList}>
        <ul>
          { faqItems.map( this._renderQuestion ) }
        </ul>
      </div>
    );
  }

  _renderQuestion = (item: FaqItem ) => {
    return (
      <li>
        <Link className={styles.questionItem} key={item.id} href={`#${item.id}`} onClick={this.props.onSelected}>
          <Text>{item.question}</Text>
        </Link>
      </li>
    );
  }
}
 
export default FaqQuestionList;