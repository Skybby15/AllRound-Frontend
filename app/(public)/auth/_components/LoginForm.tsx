"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { loginSchema } from "../_schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { FieldGroup } from "@/components/ui/field";
import RHFInputField from "@/components/custom-ui/RHFInputField";
import RHFPasswordField from "@/components/custom-ui/RHFPasswordField";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import useLogin from "../_hooks/useLogin";
import { LoginRequest } from "@/api";
import { Loader2 } from "lucide-react";
import { ApiError } from "@/reactquery/ApiError";
import { useRouter } from "next/navigation";

interface LoginFormProps {
    switchupFn: () => void;
}

type LoginFormData = z.infer<typeof loginSchema>;
const formFields: (keyof LoginFormData)[] = ["email", "password"];

export default function LoginForm({ switchupFn }: LoginFormProps) {
    const { mutate: loginMutate, status: loginStatus } = useLogin();
    const router = useRouter();

    const formName = "loginForm";
    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(data: z.infer<typeof loginSchema>) {
        const request: LoginRequest = {
            email: data.email,
            password: data.password,
        };

        loginMutate(request, {
            onSuccess: () => {
                toast.success("Login was succesful", {
                    position: "top-center",
                });

                router.push("/home");
            },
            onError: (err) => {
                if (err instanceof ApiError) {
                    form.resetField("password");

                    formFields.forEach((field) => {
                        form.setError(field, {
                            type: "server",
                        });
                    });
                }

                toast.error(err.message, {
                    position: "top-center",
                });
            },
        });
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>Enter your email below to login to your account</CardDescription>
                <CardAction>
                    <Button variant="link" onClick={switchupFn}>
                        Sign Up
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form noValidate id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <RHFInputField
                            formName={formName}
                            inputName="email"
                            control={form.control}
                            placeholder="Enter your email"
                            label="Email"
                            type="email"
                        />
                        <RHFPasswordField
                            formName={formName}
                            inputName="password"
                            label="Password"
                            placeholder="Enter your password"
                            control={form.control}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button
                    type="submit"
                    className="w-full"
                    form="login-form"
                    disabled={loginStatus == "pending"}
                >
                    Login
                    {loginStatus == "pending" && <Loader2 className="h-5 w-5 animate-spin" />}
                </Button>
                <Tooltip>
                    <TooltipTrigger
                        render={
                            <span className="w-full">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    className="w-full"
                                    disabled
                                >
                                    Login with Google
                                </Button>
                            </span>
                        }
                    />
                    <TooltipContent side="bottom">
                        <p>This feature is currently under development.</p>
                    </TooltipContent>
                </Tooltip>
            </CardFooter>
        </Card>
    );
}
