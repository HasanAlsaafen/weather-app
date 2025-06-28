import "./App.css";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import Card from "./components/Card";
import moment from "moment";
const theme = createTheme({
  typography: {
    fontFamily: `'myFonts', 'Roboto', 'Arial', sans-serif`,
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Card />
    </ThemeProvider>
  );
}
