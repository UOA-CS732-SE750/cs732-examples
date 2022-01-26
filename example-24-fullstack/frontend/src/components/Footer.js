import { Container, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6, 0),
    },
    online: {
        color: 'green'
    },
    offline: {
        color: 'red'
    }
}));

export default function Footer({ title, description }) {

    const classes = useStyles();

    const isOnline = true;

    return (
        <footer className={classes.footer}>
            <Container maxWidth="lg">
                <hr />
                <Typography variant="h6" align="center" gutterBottom>
                    {title}
                    <em> (currently </em>
                    {isOnline ? (
                        <em className={classes.online}>online</em>
                    ) : (
                        <em className={classes.offline}>offline</em>
                    )}
                    <em>)</em>
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="textSecondary"
                    component="p"
                >
                    {description}
                </Typography>
            </Container>
        </footer>
    )
}