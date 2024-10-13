import { createSignal, ParentComponent, Show } from "solid-js";
import Navigation from "./components/navigation";
import {
  Resizable,
  ResizableHandle,
  ResizablePanel,
} from "./components/ui/resizable";
import { createMediaQuery } from "@solid-primitives/media";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config";
import { Presence, Motion } from "solid-motionone";
import { cn } from "./lib/utils";

const fullTailwindConfig = resolveConfig(tailwindConfig);

const RootLayout: ParentComponent = ({ children }) => {
  const isDesktop = createMediaQuery(
    `(min-width: ${fullTailwindConfig.theme.screens.md})`,
    true,
  );

  const [isCollapsed, setIsCollapsed] = createSignal(false);

  return (
    <Presence exitBeforeEnter>
      <Show
        when={isDesktop()}
        children={
          <Resizable>
            <ResizablePanel initialSize={0.8}>{children}</ResizablePanel>
            <ResizableHandle />
            <ResizablePanel
              initialSize={0.2}
              maxSize={0.33}
              collapsible
              onCollapse={(e) => {
                setIsCollapsed(e === 0), console.log("collapse", e);
              }}
              onExpand={() => {
                setIsCollapsed(false), console.log("expand");
              }}
              class={cn(
                isCollapsed() &&
                  "min-w-[50px] transition-all duration-300 ease-in-out",
              )}
            >
              <Motion
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "100%" }}
              >
                <Navigation
                  isDesktop={isDesktop()}
                  isCollapsed={isCollapsed()}
                />
              </Motion>
            </ResizablePanel>
          </Resizable>
        }
        fallback={
          <div class="min-h-screen">
            <div>{children}</div>
            <Navigation isDesktop={isDesktop()} isCollapsed={isCollapsed()} />
          </div>
        }
      />
    </Presence>
  );

  return (
    <div class="min-h-screen">
      <div class="flex ">
        <div class="flex-1">{children}</div>
        {/* <Navigation /> */}
      </div>
    </div>
  );
};

export default RootLayout;
