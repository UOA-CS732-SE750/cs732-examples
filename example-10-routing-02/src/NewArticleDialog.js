import styles from './NewArticleDialog.module.css';
import { useState } from 'react';
import Modal from './Modal';

export default function NewArticleDialog({ onAddArticle, onCancelNewArticle }) {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    return (
        <Modal style={{ width: '50%', height: 'auto' }} dismissOnClickOutside={true} onCancel={onCancelNewArticle}>
            <h2>Add article</h2>
            <div className={styles.form}>
                <div className={styles.formRow}>
                    <label>Title:</label>
                    <input type="text" value={title} onInput={e => setTitle(e.target.value)} />
                </div>
                <div className={styles.formRow}>
                    <label>Content:</label>
                    <textarea rows={5} value={content} onInput={e => setContent(e.target.value)} />
                </div>
                <div className={styles.formRow} style={{ flexDirection: 'row-reverse' }}>
                    <button
                        style={{ flexBasis: '100px', flexGrow: 0 }}
                        onClick={() => onAddArticle(title, content)}>
                        Add
                    </button>
                </div>
            </div>
        </Modal>
    );
}