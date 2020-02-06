import React from "react";
import Link from "react-router-dom/Link";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Box from "@material-ui/core/Box";
import { FiSearch as SearchIcon } from "react-icons/fi";
import Logo from "./Logo";

const ListItemLink = props => {
  const { to, ...other } = props;
  return <ListItem component={Link} to={to} button {...other} />;
};

const ZuDrawer = props => {
  const { onCloseDrawer, ...other } = props;
  return (
    <Drawer {...other}>
      <Box width={320}>
        <Box display="flex" justifyContent="center" paddingY={2}>
          <Link to="/" onClick={onCloseDrawer}>
            <Logo />
          </Link>
        </Box>
        <List subheader={<ListSubheader component="div">Utils</ListSubheader>}>
          <ListItemLink to={"/find-zap-by-webhook-url"} onClick={onCloseDrawer}>
            <ListItemIcon>
              <SearchIcon size={"1.2em"} />
            </ListItemIcon>
            <ListItemText primary={"Find Zap For Webhook URL"} />
          </ListItemLink>
        </List>
      </Box>
    </Drawer>
  );
};

export default ZuDrawer;
