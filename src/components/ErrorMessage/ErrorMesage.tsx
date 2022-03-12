import styles from './ErrorMessage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

interface ErrorMessageProps {
  children: any,
  onClose?: Function
}
export function ErrorMessage(props: ErrorMessageProps){
  return (
    <div className={styles.container}>
      {props.children}
      {props.onClose && closeButton(props.onClose)}
    </div>
  )
}

function closeButton( onClose: any ){
  return (
    <div className={ styles.closeWrapper }>
      <button className={ styles.button} onClick={ onClose }>
        <FontAwesomeIcon icon={faCircleXmark} />
      </button>
    </div>
  );
}