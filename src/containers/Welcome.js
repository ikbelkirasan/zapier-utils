import React from "react";
import Link from "react-router-dom/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { FiSearch as SearchIcon } from "react-icons/fi";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";

const Title = styled(Typography)`
  text-align: center;
  text-transform: none;
  text-decoration: none;
  color: ${props => props.theme.palette.primary.main};
`;

const ZuButton = styled(Button)`
  border-radius: 8px;
`;

const LinkButton = withTheme(props => {
  const { title, icon: Icon, theme, ...other } = props;
  const color = props.theme.palette.primary.main;

  return (
    <ZuButton color="primary" variant="outlined" component={Link} {...other}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        alignContent="center"
        paddingY={2}
      >
        <Icon size={"4em"} color={color} />
        <Box paddingY={1} />
        <Title theme={props.theme}>{title}</Title>
      </Box>
    </ZuButton>
  );
});

const Welcome = props => {
  return (
    <Box paddingX={4} paddingY={2}>
      <Grid container wrap="wrap" spaing={1}>
        <Grid item md={2}>
          <LinkButton
            to="/find-zap-by-webhook-url"
            title="Find Zap by Webhook URL"
            icon={SearchIcon}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Welcome;
