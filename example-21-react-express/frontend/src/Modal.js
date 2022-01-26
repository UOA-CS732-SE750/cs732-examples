import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ dismissOnClickOutside, onCancel, style, children }) {
    return ReactDOM.createPortal(
        <div className={styles.modalContainer} onClick={e => {
            if (dismissOnClickOutside && e.target.parentElement === modalRoot) {
                onCancel();
            }
        }}>
            <div className="box" style={style}>
                {children}
            </div>
        </div>
        , modalRoot
    );
}