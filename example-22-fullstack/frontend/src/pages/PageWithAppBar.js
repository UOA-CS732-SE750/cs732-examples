import { Box, Container, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { AppBarWithRRTabs } from '../components/RR6-Integration';
import Footer from '../components/Footer';
import dayjs from 'dayjs';

export default function PageWithAppBar({ title, tabs }) {
    return (
        <Box sx={{
            display: 'flex',
            minHeight: '100vh',
            flexDirection: 'column',
            backgroundColor: (theme) => theme.palette.background.paper
        }}>
            <AppBarWithRRTabs title={title} tabs={tabs} />
            <Container maxWidth="lg" sx={{ marginTop: (theme) => theme.spacing(3), flexGrow: 1 }}>
                <Toolbar />
                <Outlet />
            </Container>
            <Footer title={title} description={`Meeting all your blogging needs since ${dayjs().get('year')}`} />
        </Box>
    );
}