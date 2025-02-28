import { createFileRoute, useRouter } from "@tanstack/react-router";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FormFieldConfig, LoginCard } from "../components/ui/custom/LoginCard";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

const registerSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email").min(3, "Email is required"),
  password: z.string().min(3, "Password is required"),
});

type RegisterValues = z.infer<typeof registerSchema>;

function RouteComponent() {
  const { register } = useAuth();
  const navigate = useRouter().navigate;

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (values: RegisterValues) =>
      register(values.name, values.email, values.password),
  });

  const onSubmit = async (data: RegisterValues) => {
    try {
      mutation.mutate(data);
      // nach Login weiterleiten, ggf. zu ursprünglicher Seite:
      navigate({ to: "/" });
    } catch (err) {
      console.error(err);
    }
  };

  const formFieldValues: FormFieldConfig[] = [
    { name: "name", label: "Name", placeholder: "Name" },
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
      action="register"
      link="/login"
    />
  );
}
