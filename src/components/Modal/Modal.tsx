import ReactModal from 'react-modal';
import styles from './Modal.module.css';

ReactModal.setAppElement('#root');

interface ModalProps extends ReactModal.Props {
  width?: string,
  minWidth?: string,
  maxWidth?: string
}

export default function Modal(props: ModalProps) {
  const cn = {
    base: styles.modal,
    afterOpen: styles.modalOpen,
    beforeClose: styles.modalClose
  };

  const st = {
    overlay: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,.4)',
      zIndex: 2
    },
    
    content: {
      width: props.width || '',
      minWidth: props.minWidth || '',
      maxWidth: props.maxWidth || '',
    }
  }
  return (
    <ReactModal style={st}
      className={cn}
      closeTimeoutMS={300} {...props} />
  );
}


export function ModalTitle(props: any) {
  return <div className={styles.title}>{props.children}</div>;
}

export function ModalContent(props: any) {
  return <div className={styles.content}>{props.children}</div>;
}

export function ModalControls(props: any) {
  return <div className={styles.controls}>{props.children}</div>;
}