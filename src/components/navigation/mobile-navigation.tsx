import { Component, createSignal, For } from "solid-js";
import { Drawer, DrawerContent } from "../ui/drawer";
import { Button } from "../ui/button";
import { A } from "@solidjs/router";

import { NavigationLink } from "./types";
import { Motion } from "solid-motionone";

type MobileNavigationProps = { links: NavigationLink[] };

const MobileNavigation: Component<MobileNavigationProps> = ({ links }) => {
  const [isOpen, setIsOpen] = createSignal(false);
  return (
    <>
      <Motion
        class='fixed bottom-4 left-0 right-0 mx-auto w-fit'
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%", opacity: 0 }}
      >
        <Button
          ondblclick={() => setIsOpen(true)}
        >
          ⇑ x2
        </Button>
      </Motion>
      <Drawer open={isOpen()} onOpenChange={setIsOpen}>
        <DrawerContent>
          <div class="mx-auto w-full max-w-sm py-8">
            <div class="flex flex-col items-center justify-center gap-4">
              <For each={links}>
                {(item) => {
                  return (
                    <Button
                      as={A}
                      href={item.href}
                      variant={"outline"}
                      size={"lg"}
                    >
                      {item.title}
                    </Button>
                  );
                }}
              </For>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileNavigation;
