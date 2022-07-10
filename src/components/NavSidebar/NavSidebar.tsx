import { Drawer, ListItem, List, SxProps } from "@mui/material";
import { menu } from './NavBarData';
import { Container, Box, ListItemText } from "@mui/material";
import earth from '../../assets/earth.png';
import { NavLink } from "react-router-dom";

const ListMenuStyle: SxProps = { height: "80%" };
const menuItemStyle: SxProps = { height: "80%" };
const menuItemTextStyle: SxProps = { fontWeight: "bold", textAlign: "center" };
const drawerPapperStyle: SxProps = { width: "20%" }

export const NavSidebar = () =>
    <Drawer variant="permanent" PaperProps={{ sx: drawerPapperStyle }}>
        <Box textAlign="center" marginTop={"10%"}>
            <h1>Purple Calendar</h1>
            <Container>
                <img src={earth} height="80%" width="50%" alt="Manage Your Life" />
            </Container>
        </Box>
        <Box marginTop={"35%"}>
            <List sx={ListMenuStyle}>
                {menu.map((menuItem) =>
                    <ListItem button key={menuItem.title} component={NavLink} to={menuItem.path} sx={menuItemStyle}>
                        <ListItemText primary={<Box sx={menuItemTextStyle}>{menuItem.title}</Box>} />
                    </ListItem>
                )}
            </List>
        </Box>
    </Drawer>

