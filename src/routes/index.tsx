import { createSignal, onMount } from "solid-js";
import { commands, events } from "~/bindings";
import { Button } from "~/components/ui/button";

export default function Page() {
  const [greetMsg, setGreetMsg] = createSignal("");
  const [name, setName] = createSignal("");
  const [demoEventMessage, setDemoEvent] = createSignal("listening..");

  async function greet() {
    setGreetMsg(await commands.greet(name()));
  }

  onMount(() => {
    events.demoEvent.listen((msg) => {
      setDemoEvent(msg.payload);
      return console.log("event received", msg);
    });
  });

  return (
    <div class="flex min-h-screen flex-col justify-center gap-6 text-center">
      <h1 class="text-center text-4xl font-semibold">Oxid</h1>

      <div class="flex justify-center">
        <a
          href="https://tauri.app"
          target="_blank"
          class="drop-shadow-sm hover:drop-shadow-[0_0_32px_#24c8db]"
        >
          <img
            src="/tauri.svg"
            class="h-36 p-6 transition-all duration-700 will-change-[filter] hover:drop-shadow-[0_0_32px_#24c8db]"
            alt="Tauri logo"
          />
        </a>
        <a
          href="https://solidjs.com"
          target="_blank"
          class="hover:text-indigo-600 focus:text-indigo-600"
        >
          <img
            src="/solid.svg"
            class="h-36 p-6 transition-all duration-700 will-change-[filter] hover:drop-shadow-[0_0_32px_#2f5d90]"
            alt="Solid logo"
          />
        </a>
      </div>

      <p class="terxt-3xl p-6 text-neutral-300">
        Tauri running Solid even on mobile 🤯
      </p>

      <form
        class="flex items-center justify-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          class="text-md mr-1 rounded-md p-4 placeholder:text-neutral-400 focus:outline focus:outline-1 focus:outline-cyan-400"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <Button type="submit">Greet</Button>
      </form>

      <p>{greetMsg()}</p>
      <p>{demoEventMessage()}</p>
    </div>
  );
}
