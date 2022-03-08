import styles from './Toast.module.css';

export interface ToastProps {
  isOpen: boolean,
  children: any
}

export function Toast({isOpen, children}: ToastProps) {
  let cn = mergeClasses(
    styles.toast,
    isOpen && styles.open
  );

  return (
    <div className={styles.container}>
      <div className={cn}>
        {children}
      </div>
    </div>
  )
}

function mergeClasses( ...args: any[] ){
  return args.filter(Boolean).join(' ');
}