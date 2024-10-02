import { ParentComponent } from "solid-js";


const RootLayout: ParentComponent = ({ children }) => {
  return (
    <div class="min-h-screen">
      <div class="flex ">
        <div class="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default RootLayout;
