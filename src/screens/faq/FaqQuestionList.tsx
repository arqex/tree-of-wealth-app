
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
        { faqItems.map( this._renderQuestion ) }
      </div>
    );
  }

  _renderQuestion = (item: FaqItem ) => {
    return (
      <Link className={styles.questionItem} key={item.id} href={`#${item.id}`} onClick={this.props.onSelected}>
        <Text>{item.question}</Text>
      </Link>
    );
  }
}
 
export default FaqQuestionList;