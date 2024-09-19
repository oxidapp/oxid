import { A, AnchorProps } from "@solidjs/router";
import { JSX, ParentComponent } from "solid-js";

type SidebarItemProps = {
  href: string;
  icon: JSX.Element;
  end?: AnchorProps["end"];
};

const SidebarItem: ParentComponent<SidebarItemProps> = ({
  href,
  end,
  children,
  icon,
}) => {
  return (
    <li class="px-3">
      <A
        href={href}
        class="flex items-center gap-3 rounded p-3 transition-colors hover:bg-slate-200 hover:text-slate-800 focus:bg-slate-200"
        inactiveClass="text-slate-50"
        activeClass="text-orange-400"
        end={end}
      >
        <div class="flex items-center self-center ">{icon}</div>
        <div class="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
          {children}
        </div>
      </A>
    </li>
  );
};

export default SidebarItem;
