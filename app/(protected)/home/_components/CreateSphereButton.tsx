import { cn } from "@/lib/utils";

type CreateSphereButtonProps = React.ComponentProps<"button">;

export default function CreateSphereButton({
    children,
    className,
    disabled = false,
    ...props
}: CreateSphereButtonProps) {
    return (
        <button
            {...props}
            disabled={disabled}
            className={
                disabled
                    ? cn(
                          "relative",
                          "border-2 border-[#525252] rounded-xl px-17 py-20",
                          "text-2xl text-[#525252]",
                          "cursor-pointer",
                          className
                      )
                    : cn(
                          "relative",
                          "border-4 border-accent rounded-xl px-17 py-20",
                          "text-2xl",
                          "cursor-pointer",
                          "hover:bg-primary hover:text-3xl hover:scale-110",
                          "transition-all duration-200",
                          className
                      )
            }
        >
            {children}
        </button>
    );
}
