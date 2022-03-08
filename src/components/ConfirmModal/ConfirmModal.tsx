import { Component } from "react";
import Modal from "../Modal/Modal";
import styles from './ConfirmModal.module.css';

interface ConfirmModalProps {
  isOpen: boolean,
  onRequestClose: any,
  title: string,
  content: any,
  controls: any
}
 
interface ConfirmModalState {
  
}
 
export default class ConfirmModal extends Component<ConfirmModalProps, ConfirmModalState> {
  state = {

  }

  render() { 
    const {title, content, controls} = this.props;
    return (
      <Modal isOpen={this.props.isOpen} onRequestClose={this.props.onRequestClose
      } maxWidth="500px">
        <div className={ styles.title }>{ title }</div>
        <div className={ styles.content }>{ content }</div>
        <div className={ styles.controls }>{ controls }</div>
      </Modal>
    );
  }
}
