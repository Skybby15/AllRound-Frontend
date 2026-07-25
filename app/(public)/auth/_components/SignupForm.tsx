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
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { FieldGroup } from "@/components/ui/field";
import RHFInputField from "@/components/custom-ui/RHFInputField";
import RHFPasswordField from "@/components/custom-ui/RHFPasswordField";
import { signupSchema } from "../_schemas/SignupSchema";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import useSignup from "../_hooks/useSignup";
import { SignupRequest } from "@/api";
import { Loader2 } from "lucide-react";
import { ApiError } from "@/reactquery/ApiError";

interface SignupFormProps {
    switchupFn: () => void;
}

export default function SignupForm({ switchupFn }: SignupFormProps) {
    const { mutate: signup, status: signupStatus } = useSignup();

    const formName = "signupForm";
    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        reValidateMode: "onSubmit",
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    function onSubmit(data: z.infer<typeof signupSchema>) {
        const request: SignupRequest = {
            email: data.email,
            username: data.username,
            password: data.password,
        };

        signup(request, {
            onSuccess: () => {
                toast.success("You signed up succesfully!", {
                    position: "top-center",
                });
                switchupFn();
                form.reset();
            },
            onError: (err) => {
                if (err instanceof ApiError) {
                    if (err.code == "USERNAME_ALREADY_EXISTS")
                        form.setError("username", {
                            type: "server",
                        });
                    else if (err.code == "EMAIL_ALREADY_EXISTS")
                        form.setError("email", {
                            type: "server",
                        });
                }

                toast.error(err.message);
            },
        });
    }

    return (
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle>Sign up</CardTitle>
                <CardDescription>Enter your details below to create an account</CardDescription>
                <CardAction>
                    <Button variant="link" onClick={switchupFn}>
                        Log in
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form noValidate id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <div className="flex flex-row gap-2">
                            <RHFInputField
                                formName={formName}
                                inputName="username"
                                control={form.control}
                                placeholder="John"
                                label="Username"
                                type="text"
                                onChange={() => {
                                    form.clearErrors("username");
                                }}
                            />
                            <RHFInputField
                                formName={formName}
                                inputName="email"
                                control={form.control}
                                placeholder="johnny@email.com"
                                label="Email"
                                type="text"
                                onChange={() => {
                                    form.clearErrors("email");
                                }}
                            />
                        </div>
                        <div className="flex flex-row gap-2">
                            <RHFPasswordField
                                formName={formName}
                                inputName="password"
                                label="Password"
                                placeholder="Enter your password"
                                control={form.control}
                                onChange={() => {
                                    form.clearErrors("password");
                                }}
                            />
                            <RHFPasswordField
                                formName={formName}
                                inputName="confirmPassword"
                                label="Confirm password"
                                placeholder="Enter your password"
                                control={form.control}
                                onChange={() => {
                                    form.clearErrors("confirmPassword");
                                }}
                            />
                        </div>
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button
                    type="submit"
                    className="w-full"
                    form="signup-form"
                    disabled={signupStatus == "pending"}
                >
                    Sign Up
                    {signupStatus == "pending" && <Loader2 className="h-5 w-5 animate-spin" />}
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
                                    Sign Up with Google
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
