import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputPassword } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import { useAuthState } from "@/store/slices/authSlice";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().email().min(5, {
    message: "Email must be at least 5 characters.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

type UserFormValue = z.infer<typeof formSchema>;

export function UserSignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = async (data: UserFormValue) => {
    const { email, password } = data;

    login({ email: email, password: password });
  };

  const { login, authLoading, isLogged, authError } = useAuthState();

  useEffect(() => {
    if (authError) {
      toast({
        title: "Error",
        description: authError,
        variant: "destructive",
      });
    }
  }, [authError, toast]);

  useEffect(() => {
    if (isLogged && !authError) {
      navigate("/");
    }
  }, [authError, isLogged, navigate]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-start">
        <div className="space-y-2 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email address" {...field} />
                </FormControl>

                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <InputPassword type="password" {...field} />
                </FormControl>

                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        </div>

        <Button size="link" variant={"link"} asChild className="font-bold leading-4">
          <Link to="/auth/pass-restore">Forgot password or email?</Link>
        </Button>

        <Button type="submit" variant={"default"} className="w-full mt-8">
          {authLoading ? "Loading..." : "Sign In with Email"}
        </Button>
      </form>
    </Form>
  );
}
