import { Toolbar, Typography, Box } from "@mui/material";
import { useLocation } from "react-router-dom";

/**
 * This is a "404 page not found" error page, of sorts. It uses React Router's useLocation() hook to get the current
 * path, and displays that path to the user as part of the error message.
 */
export function PageNotFound() {
    const { pathname } = useLocation();

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Typography variant="body1">
                Sorry, we couldn't find what you're looking for! Is the path <code>{pathname}</code> correct?
            </Typography>
        </Box>
    )
}

export function ArticleNotFound() {
    return (
        <Typography variant="body1">
            Sorry, we couldn't find the article you're looking for!
        </Typography>
    )
}