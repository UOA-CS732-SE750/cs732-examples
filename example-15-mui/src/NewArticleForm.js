import { Typography, Button, TextField } from '@mui/material';
import { useState } from 'react';

export default function NewArticleForm({ onAddArticle }) {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        onAddArticle(title, content);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h2" component="h2" gutterBottom>New Article</Typography>
            <TextField
                autoFocus
                margin="dense"
                id="new-article-name"
                label="Title"
                type="text"
                fullWidth
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
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
                required
            />
            <Button type="submit" variant="contained">
                Add
            </Button>
        </form>
    );
}