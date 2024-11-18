import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { ColorModeProvider } from "@kobalte/core";

import "./styles.css";
import RootLayout from "./layout";
import { TaskProvider } from "./context/task-context";

export default function App() {
  return (
    <ColorModeProvider initialColorMode="dark">
      <TaskProvider>
        <Router root={RootLayout}>
          <FileRoutes />
        </Router>
      </TaskProvider>
    </ColorModeProvider>
  );
}
