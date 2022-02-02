import { Box, Typography } from '@mui/material';
import { createTheme } from '@mui/system';
import MUIRichTextEditor from 'mui-rte';

const RTE_CONTROLS = [
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'link',
    'media',
    'numberList',
    'bulletList',
    'code'
];

export default function RichTextEditor({ error, editorState, onChange }) {

    return (
        <>
            <Box sx={(theme) => ({
                border: error ? `1px solid ${theme.palette.secondary.main}` : `1px solid ${theme.palette.primary.main}`,
                padding: theme.spacing(1),
                paddingBottom: theme.spacing(5)
            })}>
                <MUIRichTextEditor editorState={editorState} label="Start typing..." controls={RTE_CONTROLS} onChange={onChange} />
            </Box>
            {error && <Typography color="secondary" variant="caption">Please enter some text!</Typography>}
        </>
    );
}