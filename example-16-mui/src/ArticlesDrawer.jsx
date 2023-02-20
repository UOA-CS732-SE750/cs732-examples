import { Box, Divider, Drawer, List, ListItem, ListItemText, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

/**
 * Renders a MUI Drawer with one ListItem for each article. Clicking on that list item will navigate to that article's page.
 * 
 * Also renders one extra ListItem for adding a new article.
 */
export default function ArticlesDrawer({ articles }) {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
            }}>
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {articles.map(article => (
                        <ListItem button key={article.id} component={Link} to={`${article.id}`}>
                            <ListItemText primary={article.title} />
                        </ListItem>
                    ))}

                    <Divider />

                    <ListItem button component={Link} to="new">
                        <ListItemText primary="New Article" />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
}