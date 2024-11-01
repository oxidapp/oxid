import { Component, createSignal, onCleanup } from "solid-js";
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
import { tinykeys } from "tinykeys";
import { useTaskContext } from "~/context/task-context";

const AddTaskDialog: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  const keyBindingUnsubscribe = tinykeys(window, {
    "$mod+n": () => {
      setIsOpen(true);
    },
  });

  console.log('render')

  onCleanup(() => {
    console.log("unsub");
    keyBindingUnsubscribe();
  });

  const { addTask } = useTaskContext();

  const newTaskZodSchema = z.object({
    title: z.string().min(1, "Required field"),
    dueDate: z.string().date().min(1, "Required field"),
  });

  type NewTaskFormFields = z.infer<typeof newTaskZodSchema>;

  const form = createForm(() => ({
    defaultValues: {
      title: "",
      dueDate: "",
    } as NewTaskFormFields,
    validatorAdapter: zodValidator(),
    validators: {
      onSubmit: newTaskZodSchema,
    },

    onSubmit: async ({ value, formApi }) => {
      const newTaskToAdd = {
        title: value.title,
        dueDate: new Date(value.dueDate),
        isCompleted: false,
        createdAt: new Date(),
      };

      addTask({ ...newTaskToAdd });

      formApi.reset();
      setIsOpen(false);
    },
  }));

  return (
    <Dialog open={isOpen()} onOpenChange={setIsOpen}>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div class="grid gap-4 py-4">
          <form.Field
            name="title"
            children={(field) => (
              <>
                <TextField class="grid grid-cols-4 items-center gap-4">
                  <TextFieldLabel class="text-right">title</TextFieldLabel>
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

          <form.Field
            name="dueDate"
            children={(field) => (
              <>
                <TextField class="grid grid-cols-4 items-center gap-4">
                  <TextFieldLabel class="text-right">due date</TextFieldLabel>
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

export default AddTaskDialog;
