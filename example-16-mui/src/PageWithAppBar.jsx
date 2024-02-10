import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AppBarWithRRTabs } from "./RR6-Integration";

export default function PageWithAppBar({ title, tabs }) {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBarWithRRTabs title={title} tabs={tabs} />
      <Outlet />
    </Box>
  );
}
