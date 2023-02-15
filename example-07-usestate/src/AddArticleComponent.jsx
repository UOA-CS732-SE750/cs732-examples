import { useState } from 'react';

/**
 * This component allows users to add new articles to the webapp.
 * 
 * It demonstrates how we can maintain user input as component state.
 */
export default function AddArticleComponent({ onAddArticle }) {

    // Obtain the state of this article component, which will be displayed in the rendered input controls.
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    return (
        <div className="add-article">
            <h2>Add article</h2>
            <div className="form">
                <div className="form-row">
                    <label>Title:</label>
                    {/** 
                      * The value of this input should equal our "title" state.
                      * Whenever the user types into this <input>, its onInput event is raised.
                      * At this point, we should save the new title using the setTitle function,
                      * which was obtained with useState() above.
                      */}
                    <input type="text" value={title} onInput={e => setTitle(e.target.value)} />
                </div>
                <div className="form-row">
                    <label>Content:</label>
                    {/* Getting / setting the content works the same way as the title (see above). */}
                    <textarea rows={5} value={content} onInput={e => setContent(e.target.value)} />
                </div>
                <div className="form-row" style={{ flexDirection: 'row-reverse' }}>
                    {/* When we click the "Add" button, we'll raise an event to be handled by the parent component. */}
                    <button className="right-align"
                        style={{ flexBasis: '100px', flexGrow: 0 }}
                        onClick={() => onAddArticle(title, content)}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}