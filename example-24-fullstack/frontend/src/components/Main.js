import { Typography, makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        height: 300,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        marginBottom: theme.spacing(2)
    }
}));

export default function Main({ image, title, children }) {

    const classes = useStyles();

    return (
        <main>
            {image && <Paper className={classes.paper} style={{ backgroundImage: `url(${image})` }} />}
            <Typography variant="h3" component="h3" gutterBottom>{title}</Typography>
            {children}
        </main>
    );
}