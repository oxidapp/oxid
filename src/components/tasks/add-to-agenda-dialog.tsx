import { Component, Setter } from "solid-js";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "~/components/ui/text-field";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";

import { createForm } from "@tanstack/solid-form";
import { Task } from "./types";
import { updateTask } from "~/lib/tasks";
import { useTaskContext } from "~/context/task-context";

const UpdatedPlannedDoDate: Component<{
  task: Task;
  isOpen: boolean;
  setIsOpen: Setter<boolean>;
}> = (props) => {
  const { mutate } = useTaskContext();
  const updatedTaskSchema = z.object({
    plannedDoDate: z.string().date().min(1, "Required field"),
  });
  type FormFields = z.infer<typeof updatedTaskSchema>;

  const form = createForm(() => ({
    defaultValues: {
      plannedDoDate: "",
    } as FormFields,
    validatorAdapter: zodValidator(),
    validators: {
      onSubmit: updatedTaskSchema,
    },

    onSubmit: async ({ value, formApi }) => {
      mutate((tasks) =>
        tasks.map((t) =>
          t.id === props.task.id
            ? { ...t, plannedDoDate: new Date(value.plannedDoDate) }
            : t,
        ),
      );
      updateTask(props.task.id, {
        plannedDoDate: new Date(value.plannedDoDate),
      });

      formApi.reset();
      props.setIsOpen(false);
    },
  }));

  return (
    <Dialog open={props.isOpen} onOpenChange={props.setIsOpen}>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add {props.task.title} to Agenda</DialogTitle>
          <DialogDescription>
            Enter a valid date like 2024-12-31.
          </DialogDescription>
        </DialogHeader>

        <div class="grid gap-4 py-4">
          <form.Field
            name="plannedDoDate"
            children={(field) => (
              <>
                <TextField class="grid grid-cols-4 items-center gap-4">
                  <TextFieldLabel class="text-right">
                    Planned Do Date
                  </TextFieldLabel>
                  <TextFieldInput
                    class="col-span-3"
                    type="text"
                    name={field().name}
                    value={field().state.value}
                    onBlur={field().handleBlur}
                    onInput={(e) => field().handleChange(e.currentTarget.value)}
                  />
                </TextField>
                <span class="font-normal text-error-foreground">
                  {field().state.meta.errors.join(", ")}
                </span>
              </>
            )}
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={form.handleSubmit}>
            Add task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatedPlannedDoDate;
