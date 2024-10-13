import { Component, For, Show } from "solid-js";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "~/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { A } from "@solidjs/router";
import { NavigationLink } from "./types";

type NavProps = {
  isCollapsed: boolean;
  links: NavigationLink[];
};

const DesktopNavigation: Component<NavProps> = (props) => {
  return (
    <div
      data-collapsed={props.isCollapsed}
      class="group flex min-h-screen w-full flex-col gap-4 bg-background py-4 data-[collapsed=true]:py-2"
    >
      <nav class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        <For each={props.links}>
          {(item) => {
            // const Icon = item.icon
            return (
              <Show
                when={props.isCollapsed}
                fallback={
                  <Button
                    as={A}
                    href={item.href}
                    variant={"outline"}
                    size={"sm"}
                    class={cn("justify-start", "text-sm")}
                  >
                    <div class="mr-2">{/* <Icon /> */}</div>
                    {item.title}
                    {item.label && (
                      <span class={cn("ml-auto")}>{item.label}</span>
                    )}
                  </Button>
                }
              >
                <Tooltip openDelay={0} closeDelay={0} placement="right">
                  <TooltipTrigger
                    as={A}
                    href={item.href}
                    class={cn(
                      buttonVariants({ variant: "default", size: "icon" }),
                      "size-9",
                    )}
                  >
                    {item.title[0]}<span class="sr-only">{item.title}</span>
                  </TooltipTrigger>
                  <TooltipContent class="flex items-center gap-4">
                    {item.title}
                    <Show when={item.label}>
                      <span class="ml-auto text-muted-foreground">
                        {item.label}
                      </span>
                    </Show>
                  </TooltipContent>
                </Tooltip>
              </Show>
            );
          }}
        </For>
      </nav>
    </div>
  );
};

export default DesktopNavigation;
