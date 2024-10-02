import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { ColorModeProvider } from "@kobalte/core";

import "./styles.css";
import RootLayout from "./layout";

export default function App() {
  return (
    <ColorModeProvider initialColorMode="dark">
      <Router root={RootLayout}>
        <FileRoutes />
      </Router>
    </ColorModeProvider>
  );
}
