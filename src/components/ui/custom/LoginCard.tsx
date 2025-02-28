import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "@tanstack/react-router";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "../../../context/AuthContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Input } from "../input";
import { Button } from "../button";

export type FormFieldConfig = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
};

type LoginCardProps = {
  onSubmit: (data: any) => void;
  form: UseFormReturn<any, any, undefined>;
  fields: FormFieldConfig[];
  action: "register" | "login";
  link: string;
};

export function LoginCard({
  onSubmit,
  form,
  fields,
  action,
  link,
}: LoginCardProps) {
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 p-4 items-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {fields.map((fieldConfig) => (
          <FormField
            key={fieldConfig.name}
            control={form.control}
            name={fieldConfig.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldConfig.label}</FormLabel>
                <FormControl>
                  <Input
                    type={fieldConfig.type || "text"}
                    placeholder={fieldConfig.placeholder || ""}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Link to={link} className="text-blue-500">
          {action === "register"
            ? "Do you have already an Account?"
            : "New here? Register now!"}
        </Link>
        <Button type="submit">{action}</Button>
      </form>
    </Form>
  );
}
