import { Drawer, Divider, makeStyles, List, ListItem, ListItemText, Toolbar } from '@material-ui/core';
import { Link, NavLink, useLocation, useRouteMatch } from 'react-router-dom';

// Hax
const drawerWidth = 180;

/**
 * Custom Material-UI style tweaks
 */
const useStyles = makeStyles((theme) => ({
    drawer: {
        flexShrink: 0,
        width: drawerWidth
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerContainer: {
        overflow: 'auto'
    },
    activeListItem: {
        color: theme.palette.primary.main
    }
}));

export default function ArticleSidebar({ articles }) {
    const classes = useStyles();
    const { url } = useRouteMatch();
    const { pathname } = useLocation();

    return (
        <Drawer variant="permanent" anchor="left" className={classes.drawer} classes={{ paper: classes.drawerPaper }}>
            <Toolbar variant="dense" />
            <div className={classes.drawerContainer}>
                <List>
                    {articles.map((article) => (
                        <ListItem button key={article.id} component={NavLink} to={`${url}/${article.id}`} activeClassName={classes.activeListItem}>
                            <ListItemText primary={article.title} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    <ListItem button component={Link} to={`${pathname}/newArticle`}>
                        <ListItemText primary="New article" />
                    </ListItem>
                </List>
            </div>
        </Drawer>
    );
}