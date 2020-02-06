import React from "react";
import RouterLink from "react-router-dom/Link";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core";
import { FiMenu as MenuIcon } from "react-icons/fi";
import { FiGithub as GithubIcon } from "react-icons/fi";
import Logo from "./Logo";

const useStyle = makeStyles(theme => ({
  appBar: {
    background: theme.palette.background.default
  },
  menuButton: {},
  title: {}
}));

export default function ZuAppBar(props) {
  const classes = useStyle();
  const { title, onMenuButtonClick } = props;

  return (
    <AppBar className={classes.appBar} position="fixed" elevation={0}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={onMenuButtonClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <Box flex={1} />
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Link
          href="https://github.com/ikbelkirasan/zapier-utils"
          target="_blank"
        >
          <IconButton>
            <GithubIcon size={"0.8em"} />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
