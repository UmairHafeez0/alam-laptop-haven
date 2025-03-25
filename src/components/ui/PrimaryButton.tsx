
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
}

const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, variant = "default", size = "default", children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          
          // Variants
          variant === "default" && "bg-alam-600 text-white hover:bg-alam-700 active:bg-alam-800 shadow-md hover:shadow-lg",
          variant === "outline" && "border border-alam-600 text-alam-600 hover:bg-alam-50 active:bg-alam-100",
          variant === "ghost" && "text-alam-600 hover:bg-alam-50 active:bg-alam-100",
          variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          
          // Sizes
          size === "default" && "h-11 px-5 py-2 text-base",
          size === "sm" && "h-9 px-3 text-sm",
          size === "lg" && "h-14 px-8 text-lg",
          size === "icon" && "h-11 w-11",
          
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PrimaryButton.displayName = "PrimaryButton";

export { PrimaryButton };
