import { Component } from "react";
import { Text } from "../../components/Text/Text";
import styles from './FaqScreen.module.css';
import faqItems, { FaqItem } from './FaqItems';
import { mergeClasses } from "../../utils/mergeClasses";
import FaqQuestionList from "./FaqQuestionList";
import Button from "../../components/Button/Button";

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
      <div className={styles.faqScreen}>

        <div className={styles.bg_layer1} />
        <div className={styles.bg_layer2} />
          <div className={styles.bg_layer3} />
        <header className={styles.contentHeader}>
          <div className={styles.contentHeaderContent}>
            <div className={styles.title}>
              <Text type="h2">The Tree of Wealth FAQ</Text>
            </div>
            <div className={styles.headerButton}>
              <Button href="/">Host The Tree</Button>
            </div>
            { this.renderMenuToggler() }
          </div>
        </header>
        <div className={styles.container}>
          <div className={styles.content}>
            { this.renderAnswerList()}
          </div>
          { this.renderMenu() }
        </div>
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
          <div className={styles.menuHeader}>
            <Button href="/">Host The Tree</Button>
            <Button transparent onClick={this._toggle} icon="close">
              Close
            </Button>
          </div>
          <Text type="h3">Questions</Text>
          <FaqQuestionList onSelected={ this._close } />
        </div>
        <a href="#1" className={styles.menuOverlay} onClick={this._toggle}> </a>
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

  renderMenuToggler() {
    return (
      <div className={styles.menuToggler}>
        <Button onClick={ this._toggle }>Questions</Button>
      </div>
    );
  }

  _renderAnswer = (item: FaqItem ) => {
    return (
      <div className={styles.answerItem} key={item.id} id={item.id} >
        <div className={styles.answerItemQuestion}>
          <Text type="h3" block><b>{item.question}</b></Text>
        </div>
        <div className={styles.answerItemAnswer}>
          { item.answer }
        </div>
      </div>
    );
  }

  _close = () => {
    if( this.animating ) return;
    if( this.state.isMenuOpen ){
      this._toggle();
    }
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