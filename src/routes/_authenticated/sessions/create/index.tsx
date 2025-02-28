import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../../../components/ui/carousel";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Session } from "../../../../lib/types/Session";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { Checkbox } from "../../../../components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { postSession } from "../../../../lib/api/API";
import { Textarea } from "../../../../components/ui/textarea";

export const Route = createFileRoute("/_authenticated/sessions/create/")({
  component: RouteComponent,
});
const sessionSchema = z.object({
  name: z.string().min(3, "Name is required"),
  description: z.string().optional(),
  isPublic: z.boolean(),
  type: z.string(),
  sessionExercises: z.array(z.any()),
});

type SessionFormValues = z.infer<typeof sessionSchema>;

function RouteComponent() {
  const form = useForm<SessionFormValues>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      name: "",
      description: "",
      isPublic: false,
      type: "fingerboard",
      sessionExercises: [],
    },
  });

  const mutation = useMutation({
    mutationFn: (data: SessionFormValues) => {
      return postSession(data);
    },
  });

  const onSubmit = (data: SessionFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <h2>Create Session</h2>

      <div className="flex flex-col justify-between items-center p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-2 space-y-4"
          >
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
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent>
                        {["fingerboard", "board", "ropeclimbing"].map(
                          (item, index) => (
                            <SelectItem key={index} value={item}>
                              {item}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
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
                    <Textarea placeholder="Description" {...field} />
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
            <Button type="submit">Create</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
