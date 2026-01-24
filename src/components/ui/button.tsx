import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary via-accent to-secondary text-primary-foreground hover:shadow-[0_0_30px_hsl(45_85%_55%/0.5),0_0_60px_hsl(45_85%_55%/0.3)] hover:scale-[1.02] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",
        destructive: "bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground hover:shadow-lg hover:shadow-destructive/30 hover:scale-[1.02]",
        outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary/10 hover:shadow-[0_0_20px_hsl(45_85%_55%/0.3)] hover:border-accent",
        secondary: "bg-gradient-to-r from-secondary via-primary to-accent text-primary-foreground hover:shadow-[0_0_30px_hsl(35_75%_45%/0.5)] hover:scale-[1.02] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",
        ghost: "hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_15px_hsl(45_85%_55%/0.2)]",
        link: "text-primary underline-offset-4 hover:underline hover:text-accent",
        premium: "bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground border border-primary/30 hover:shadow-[0_0_40px_hsl(45_85%_55%/0.6),0_0_80px_hsl(45_85%_55%/0.3)] hover:scale-[1.03] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-500",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4",
        lg: "h-12 rounded-xl px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
