import React from "react";
import styled from "styled-components";
import Logo from "./components/Logo";
import FindZapByWebhookId from "./containers/FindZapByWebhookUrl";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";

const AppHeader = styled.div`
  background-color: #282c34;
  min-height: 100vh;
`;

const AppContainer = styled.div`
  height: 320px;
  width: 320px;
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <AppHeader>
          <Logo />
          <FindZapByWebhookId />
        </AppHeader>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
