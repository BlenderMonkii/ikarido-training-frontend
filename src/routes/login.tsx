import { createFileRoute, useRouter } from "@tanstack/react-router";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FormFieldConfig, LoginCard } from "../components/ui/custom/LoginCard";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

const loginSchema = z.object({
  email: z.string().email("Invalid email").min(3, "Email is required"),
  password: z.string().min(3, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

function RouteComponent() {
  const { login } = useAuth();
  const navigate = useRouter().navigate;

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (values: LoginValues) => login(values.email, values.password),
  });

  const onSubmit = async (data: LoginValues) => {
    try {
      await mutation.mutate(data);
      // nach Login weiterleiten, ggf. zu ursprünglicher Seite:
      navigate({ to: "/" });
    } catch (err) {
      console.error(err);
    }
  };

  const formFieldValues: FormFieldConfig[] = [
    { name: "email", label: "Email", placeholder: "Email" },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Password",
    },
  ];

  return (
    <LoginCard
      onSubmit={onSubmit}
      form={form}
      fields={formFieldValues}
      action="login"
      link="/register"
    />
  );
}
