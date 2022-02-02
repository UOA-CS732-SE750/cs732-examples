import { Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { Outlet } from 'react-router-dom';
import ArticlesDrawer from './ArticlesDrawer';

export default function ArticlesPage({ articles }) {

    return (
        <>
            <ArticlesDrawer articles={articles} />

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Outlet />
            </Box>
        </>
    );
}