import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Button } from "../../../../components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { postExercises } from "../../../../lib/api/API";

export const Route = createFileRoute("/_authenticated/exercises/create/")({
  component: RouteComponent,
});

const exerciseSchema = z.object({
  name: z.string().min(3, "Name is required"),
  description: z.string().optional(),
  isPublic: z.boolean(),
  exerciseType: z.enum(["fingerboard"]),
  location: z.string().optional(),
  timer: z
    .object({
      name: z.string().min(3, "Name is required"),
      activeTime: z.number().int().positive(),
      restTime: z.number().int().positive(),
      pauseTime: z.number().int().positive(),
    })
    .optional(),
});

const fingerboardSchema = exerciseSchema.extend({
  exerciseType: z.literal("fingerboard"),
  boardName: z.string().min(3, "Board name is required"),
  edgeSize: z.number().int().positive(),
  fingers: z.enum(["four", "three", "two"]),
  gripType: z.enum(["half-crimp", "open-hand", "sloper"]),
});

type ExerciseFormValues = z.infer<typeof fingerboardSchema>;

function RouteComponent() {
  const form = useForm<ExerciseFormValues>({
    resolver: zodResolver(fingerboardSchema),
    defaultValues: {
      name: "",
      description: "",
      isPublic: false,
      exerciseType: "fingerboard",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ExerciseFormValues) => {
      return postExercises(data);
    },
  });

  const onSubmit = (data: ExerciseFormValues) => {
    mutation.mutate(data);
  };

  return (
    <>
      <h3>Create New Exercises</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-2 space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isPublic"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormLabel>Public</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="exerciseType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exercise Type</FormLabel>
                <FormControl>
                  <select {...field} className="w-full">
                    <option value="fingerboard">Fingerboard</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch("exerciseType") === "fingerboard" && (
            <>
              <FormField
                control={form.control}
                name="boardName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Board Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Board Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="edgeSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Edge Size</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Edge Size"
                        type="number"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => {
                          field.onChange(parseFloat(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fingers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fingers</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full">
                        <option value="four">Four Fingers</option>
                        <option value="three">Three Fingers</option>
                        <option value="two">Two Fingers</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gripType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grip Type</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full">
                        <option value="half-crimp">Half Crimp</option>
                        <option value="open-hand">Open Hand</option>
                        <option value="sloper">Sloper</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" className="">
              Create
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
