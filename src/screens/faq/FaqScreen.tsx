import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { Text } from "../../components/Text/Text";
import styles from './FaqScreen.module.css';
import {faBars} from '@fortawesome/free-solid-svg-icons'
import faqItems, { FaqItem } from './FaqItems';
import { mergeClasses } from "../../utils/mergeClasses";
import FaqQuestionList from "./FaqQuestionList";

interface FaqScreenProps {
  
}
 
interface FaqScreenState {
  isMenuOpen: boolean,
  isMenuVisible: boolean
}
 
export default class FaqScreen extends Component<FaqScreenProps, FaqScreenState> {
  state = {
    isMenuOpen: false,
    isMenuVisible: false
  }

  render() { 
    return (  
      <div className={styles.container}>
        <div className={styles.content}>
          <header className={styles.contentHeader}>
            <div className={styles.title}>
              <Text type="h2">The Tree of Wealth FAQ</Text>
            </div>
            <div className={styles.menuToggler}>
              <a onClick={ this._toggle }>
                <FontAwesomeIcon icon={ faBars } />
              </a>
            </div>
          </header>
          { this.renderAnswerList()}
        </div>
        { this.renderMenu() }
      </div>
    );
  }
  renderMenu() {
    const {isMenuOpen, isMenuVisible} = this.state;
    let classes = mergeClasses(
      styles.menuContainer,
      isMenuOpen && styles.open,
      isMenuVisible && styles.visible
    )
    return (
      <div className={classes}>
        <div className={styles.menu}>
          <FaqQuestionList />
        </div>
        <a className={styles.menuOverlay} onClick={this._toggle}></a>
      </div>
    )
  }
  renderAnswerList() {
    return (
      <div className={styles.answerList}>
        { faqItems.map( this._renderAnswer ) }
      </div>
    );
  }

  _renderAnswer = (item: FaqItem ) => {
    return (
      <div className={styles.answerItem} key={item.id} id={item.id} >
        <div className={styles.answerItemQuestion}>
          <Text type="h3" block>{item.question}</Text>
        </div>
        <div className={styles.answerItemAnswer}>
          { item.answer }
        </div>
      </div>
    );
  }

  renderQuestionList() {
    return (
      <div className={styles.questionList}>
        { faqItems.map( this._renderQuestion ) }
      </div>
    );
  }

  _renderQuestion = (item: FaqItem ) => {
    return (
      <a className={styles.questionItem} key={item.id}>
        <Text>{item.question}</Text>
      </a>
    );
  }

  animating = false;
  _toggle = () => {
    if( this.animating ) return;

    const {isMenuOpen} = this.state;
    this.animating = true;

    if( isMenuOpen ){
      this.setState({isMenuVisible: false});
      setTimeout( () => {
        this.setState({isMenuOpen: false});
        this.animating = false;
      }, 300);
    }
    else {
      this.setState({isMenuOpen: true});
      setTimeout( () => {
        this.setState({isMenuVisible: true});
        this.animating = false;
      });
    }
  }
}