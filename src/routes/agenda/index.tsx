import { Component, createSignal } from "solid-js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import DayView from "./day-view";
import Backlog from "./backlog";
import WeekView from "./week-view";
import MonthView from "./month-view";

const AgendaPage: Component = () => {
  const [selectedTab, setSelectedTab] = createSignal("day");

  return (
    <div class="container py-4">
      <div class="grid grid-cols-2 gap-2">
        <Tabs defaultValue="day" class="row-span-3 grid grid-rows-subgrid">
          <h1 class="text-5xl font-bold">
            Agenda{" "}
            <span class="text-sm text-muted-foreground">
              current day, week and month
            </span>
          </h1>

          <TabsList class="justify-around">
            <TabsTrigger
              class="w-full"
              onClick={() => setSelectedTab("day")}
              value="day"
            >
              day
            </TabsTrigger>
            <TabsTrigger
              class="w-full"
              onClick={() => setSelectedTab("week")}
              value="week"
            >
              week
            </TabsTrigger>
            <TabsTrigger
              class="w-full"
              onClick={() => setSelectedTab("month")}
              value="month"
            >
              month
            </TabsTrigger>
          </TabsList>
          <TabsContent value="day">
            <DayView />
          </TabsContent>
          <TabsContent value="week">
            <WeekView />
          </TabsContent>
          <TabsContent value="month">
            <MonthView />
          </TabsContent>
        </Tabs>

        <Backlog selectedTab={selectedTab()} />
      </div>
    </div>
  );
};

export default AgendaPage;
