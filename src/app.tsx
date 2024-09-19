import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";

import "./styles.css";
import RootLayout from './layout';

export default function App() {
  return (
    <Router root={RootLayout}>
      <FileRoutes />
    </Router>
  );
}
