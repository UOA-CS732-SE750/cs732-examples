import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@material-ui/core';
import { useState } from 'react';

export default function NewArticleDialog({ onAddArticle, onCancelNewArticle }) {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    return (
        <Dialog open={true} onClose={onCancelNewArticle} aria-labelledby="new-article-dialog-title">
            <DialogTitle id="new-article-dialog-title">New Article</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Tell us your latest story!
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="new-article-name"
                    label="Title"
                    type="text"
                    fullWidth
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="new-article-content"
                    label="Content"
                    type="text"
                    multiline
                    rows={5}
                    fullWidth
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancelNewArticle} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => onAddArticle(title, content)} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}