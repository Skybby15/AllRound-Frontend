import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { ChangeEventHandler, useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { LucideEye, LucideEyeClosed } from "lucide-react";

type RHFPasswordFieldProps<T extends FieldValues> = {
    formName: string;
    inputName: Path<T>;
    control: Control<T>;

    label?: string;
    placeholder?: string;
    onChange?: ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
};

export default function RHFPasswordField<T extends FieldValues>({
    formName,
    inputName,
    control,

    label,
    placeholder,
    onChange,
}: RHFPasswordFieldProps<T>) {
    const [shown, setShown] = useState(false);

    return (
        <Controller
            name={inputName}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`${formName}-${inputName}`}>{label}</FieldLabel>

                    <InputGroup>
                        <InputGroupInput
                            {...field}
                            id={`${formName}-${inputName}`}
                            placeholder={placeholder}
                            aria-invalid={fieldState.invalid}
                            autoComplete="off"

                            type={shown ? "text" : "password"}
                            onChange={(e) => {
                                field.onChange(e);
                                onChange?.(e);
                            }}
                        />
                        <InputGroupAddon align="inline-end">
                            {shown && (
                                <LucideEye
                                    onClick={() => setShown(!shown)}
                                    className="cursor-pointer"
                                />
                            )}
                            {!shown && (
                                <LucideEyeClosed
                                    onClick={() => setShown(!shown)}
                                    className="cursor-pointer"
                                />
                            )}
                        </InputGroupAddon>
                    </InputGroup>

                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    );
}
