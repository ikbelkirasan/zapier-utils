import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { css, createGlobalStyle } from "styled-components";
import { ThemeProvider, StylesProvider } from "@material-ui/core/styles";
import theme from "./theme";
import ZuAppBar from "./components/AppBar";
import ZuDrawer from "./components/Drawer";

import Welcome from "./containers/Welcome";
import FindZapByWebhookUrl from "./containers/FindZapByWebhookUrl";

import Box from "@material-ui/core/Box";

const GlobalStyle = createGlobalStyle(css`
  body {
    background-color: #282c34;
    min-height: 480px;
    max-height: 100vh;
    min-width: 480px;
  }
`);

const App = () => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);

  return (
    <StylesProvider injectFirst>
      <Router>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <ZuDrawer
            open={isMenuOpen}
            onClose={e => {
              setMenuOpen(false);
            }}
            onCloseDrawer={e => {
              setMenuOpen(false);
            }}
          />
          <ZuAppBar
            title="Zapier Utils"
            onMenuButtonClick={() => {
              setMenuOpen(!isMenuOpen);
            }}
          />
          <Box height={64}></Box>
          <Switch>
            <Route path="/find-zap-by-webhook-url">
              <FindZapByWebhookUrl />
            </Route>
            <Route path="/">
              <Welcome />
            </Route>
          </Switch>
        </ThemeProvider>
      </Router>
    </StylesProvider>
  );
};

export default App;
