import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
    border: {
        border: `1px solid ${theme.palette.primary.main}`,
        padding: theme.spacing(1),
        paddingBottom: theme.spacing(5)
    },
    borderError: {
        border: `1px solid ${theme.palette.secondary.main}`,
        padding: theme.spacing(1),
        paddingBottom: theme.spacing(5)
    }
}));

export default function RichTextEditor({ error, editorState, onChange }) {
    const classes = useStyles();

    return (
        <>
            <div className={error ? classes.borderError : classes.border}>
                <MUIRichTextEditor editorState={editorState} label="Start typing..." controls={RTE_CONTROLS} onChange={onChange} />
            </div>
            {error && <Typography color="secondary" variant="caption">Please enter some text!</Typography>}
        </>
    );
}