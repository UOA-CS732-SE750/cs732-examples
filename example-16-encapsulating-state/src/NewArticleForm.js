import styles from './NewArticleForm.module.css';
import { useState } from 'react';
import { AppContext } from './AppContextProvider';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewArticleForm() {

    const { addArticle } = useContext(AppContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    // Handles when a new article is added.
    function handleAddArticle() {

        // Add the new article
        const newArticle = addArticle({ title, content });

        // Redirect the user to it
        navigate(`/articles/${newArticle.id}`, { replace: true });
    }

    return (
        <>
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
        </>
    );
}