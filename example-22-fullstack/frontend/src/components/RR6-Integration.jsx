import { Link as RouterLink, useLocation, useResolvedPath } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Tabs, Tab } from '@mui/material';

/**
 * A MUI AppBar with a title and a set of tabs. The current tab is highlighted based on the current React Router location.
 */
export function AppBarWithRRTabs({ title, tabs }) {

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>

                <Typography variant="h6" mr={2} component={RouterLink} to="/" sx={{ color: "inherit", textDecoration: "inherit" }}>
                    {title}
                </Typography>

                <RRTabs tabs={tabs} />

            </Toolbar>
        </AppBar>
    );
}

/**
 * A set of MUI Tabs, each acting as a React Router Link to a particular path within the webapp.
 * 
 * If one of those tabs' corresponding path is currently active, that tab will be highlighted.
 */
export function RRTabs({ tabs }) {

    let activeTab;
    /**
     * Normally, you shouldn't use hooks inside loops / conditionals.
     * In this case, I am confident that this loop will always execute the same number of times each render - therefore the useIsActive hook
     * will be called the same number of times each render. This is in line with the Rules of Hooks.
     * 
     * I'm using eslint-disable-next-line to prevent the linter from throwing an error on that hook call.
     */
    for (let tab of tabs) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const isActiveTab = useIsActive(tab.to);
        if (!activeTab && isActiveTab) {
            activeTab = tab.to;
        }
    }

    return (
        <Tabs
            indicatorColor="secondary"
            textColor="inherit"
            value={activeTab}>

            {tabs.map(({ title, to }) => (
                <Tab key={to} label={title} value={to} component={RouterLink} to={to} />
            ))}

        </Tabs>
    );
}

/**
 * A hook to determine whether a link with the given "to" prop corresponds to the current location.
 * 
 * The logic here is taken from React Router's NavLink component, which uses the same logic to determine if
 * it should be considered "active" or not.
 */
function useIsActive(to) {
    const location = useLocation();
    const resolvedPath = useResolvedPath(to);

    const currentPathname = location.pathname.toLowerCase();
    const resolvedPathname = resolvedPath.pathname.toLowerCase();

    const isActive =
        currentPathname === resolvedPathname ||
        (currentPathname.startsWith(resolvedPathname) &&
            currentPathname.charAt(resolvedPathname.length) === "/");

    return isActive;
}