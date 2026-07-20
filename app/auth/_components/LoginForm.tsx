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

interface LoginFormProps {
    switchupFn: () => void;
}

export default function LoginForm({ switchupFn }: LoginFormProps) {
    const formName = "loginForm";
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(data: z.infer<typeof loginSchema>) {
        toast("Trying to login with the following values:", {
            description: (
                <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
                    <code>{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
            position: "bottom-right",
            classNames: {
                content: "flex flex-col gap-2",
            },
            style: {
                "--border-radius": "calc(var(--radius)  + 4px)",
            } as React.CSSProperties,
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
                <Button type="submit" className="w-full" form="login-form">
                    Login
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
