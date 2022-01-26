import styles from './NewArticleDialog.module.css';
import { useContext, useState } from 'react';
import Modal from './Modal';
import { AppContext } from './AppContextProvider';
import { useHistory } from 'react-router-dom';

export default function NewArticleDialog() {

    const { addArticle } = useContext(AppContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const history = useHistory();

    // Handles when a new article is added.
    function handleAddArticle() {

        // Add the new article
        const newArticle = addArticle({ title, content });

        // Redirect the user to it
        history.replace(`/articles/${newArticle.id}`);
    }

    // Handles when we should cancel this dialog.
    function handleCancelNewArticle() {
        history.goBack();
    }

    return (
        <Modal style={{ width: '50%', height: 'auto' }} dismissOnClickOutside={true} onCancel={handleCancelNewArticle}>
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
                        onClick={handleAddArticle}>
                        Add
                    </button>
                </div>
            </div>
        </Modal>
    );
}