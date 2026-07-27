import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

type RHFInputFieldProps<T extends FieldValues> = {
    formName: string;
    inputName: Path<T>;
    control: Control<T>;

    type?: HTMLInputTypeAttribute;
    label?: string;
    placeholder?: string;
    onChange?: ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
};

export default function RHFInputField<T extends FieldValues>({
    formName,
    inputName,
    control,

    type,
    label,
    placeholder,
    onChange,
}: RHFInputFieldProps<T>) {
    return (
        <Controller
            name={inputName}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`${formName}-${inputName}`}>{label}</FieldLabel>

                    <Input
                        {...field}
                        id={`${formName}-${inputName}`}
                        placeholder={placeholder}
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"

                        type={type}
                        onChange={(e) => {
                            field.onChange(e);
                            onChange?.(e);
                        }}
                    />

                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    );
}
