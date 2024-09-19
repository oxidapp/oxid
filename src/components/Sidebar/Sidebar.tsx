import { createSignal } from "solid-js";
import SidebarItem from "./SidebarItem";

import AgendaIcon from "~/assets/agenda.svg";
import OxidIcon from "~/assets/oxid.svg";
export default function SideNavigationBasic() {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <>
      <button
        title="Side navigation"
        type="button"
        class={`visible fixed left-6 top-6 z-40 order-10 block h-10 w-10 self-center rounded bg-white opacity-100 lg:hidden ${isOpen() ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 " : ""}`}
        aria-haspopup="menu"
        aria-label="Side navigation"
        aria-expanded={isOpen() ? true : false}
        aria-controls="nav-menu-1"
        onClick={() => setIsOpen(!isOpen())}
      >
        <div class="absolute right-1/2 top-1/2 w-6 -translate-y-1/2 translate-x-1/2 transform">
          <span
            aria-hidden="true"
            class="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-700 transition-all duration-300"
          ></span>
          <span
            aria-hidden="true"
            class="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
          ></span>
          <span
            aria-hidden="true"
            class="absolute block h-0.5 w-1/2 origin-top-right translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
          ></span>
        </div>
      </button>

      <aside
        id="nav-menu-1"
        aria-label="Side navigation"
        class={`fixed bottom-0 right-0 top-0 z-40 flex w-72 flex-col bg-neutral-900 transition-transform lg:translate-x-0 ${isOpen() ? "translate-x-0" : "translate-x-full"}`}
      >
        <nav
          aria-label="side navigation"
          class="flex-1 divide-y divide-slate-100 overflow-auto"
        >
          <div>
            <ul class="flex flex-1 flex-col gap-1 py-3">
              <SidebarItem href="/" icon={<AgendaIcon />} end>
                agenda
              </SidebarItem>

              <SidebarItem href="oxids" icon={<OxidIcon />}>
                oxids
              </SidebarItem>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Backdrop */}
      <div
        class={`fixed bottom-0 left-0 right-0 top-0 z-30 bg-slate-900/20 transition-colors sm:hidden ${isOpen() ? "block" : "hidden"}`}
        onClick={() => setIsOpen(false)}
      ></div>
    </>
  );
}
