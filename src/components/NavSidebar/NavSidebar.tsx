import { Drawer, ListItem, List } from "@mui/material";
import { menu } from './NavBarData';
import { Container, Box, ListItemText } from "@mui/material";
import earth from '../../assets/earth.png';
import { NavLink } from "react-router-dom";

export const NavSidebar = () =>
    <Drawer variant="permanent" PaperProps={{ sx: { width: "20%" } }}>
        <Box sx={{ textAlign: 'center', marginTop: "10%" }}>
            <h1>Purple Calendar</h1>
            <Container>
                <img src={earth} height="80%" width="50%" alt="Manage Your Life" />
            </Container>
        </Box>
        <Box sx={{ marginTop: "35%" }}>
            <List sx={{ height: "80%" }}>
                {menu.map((menuItem) => {
                    return (
                        <ListItem button key={menuItem.title} component={NavLink} to={menuItem.path} sx={{ height: "80%" }}>
                            <ListItemText primary={<Box sx={{ fontWeight: "bold", textAlign: "center" }}>{menuItem.title}</Box>} />
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    </Drawer>

