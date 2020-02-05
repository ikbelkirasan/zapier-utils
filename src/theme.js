import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#f94e40"
    },
    secondary: {
      main: "#134074"
    },
    background: {
      default: "#282c34",
      paper: "#3a3f4b"
    }
  }
});

export default theme;
