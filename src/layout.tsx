import { ParentComponent } from "solid-js";
import Sidebar from "./components/Sidebar/Sidebar";

const RootLayout: ParentComponent = ({ children }) => {
  return (
    <div class="min-h-screen  bg-neutral-800 text-neutral-200">
      <div class="flex ">
        <div class="flex-1">{children}</div>
        <Sidebar />
      </div>
    </div>
  );
};

export default RootLayout;
