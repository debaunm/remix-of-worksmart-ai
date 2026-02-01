import * as React from "react";
import { cn } from "@/lib/utils";

interface CurrencyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value: string;
  onChange: (value: string) => void;
  showDollarSign?: boolean;
  showPercentSign?: boolean;
}

const formatWithCommas = (value: string): string => {
  // Remove all non-numeric characters except decimal point
  const numericValue = value.replace(/[^0-9.]/g, "");
  
  // Split by decimal point
  const parts = numericValue.split(".");
  
  // Format the integer part with commas
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
  // Rejoin with decimal if exists
  return parts.length > 1 ? `${parts[0]}.${parts[1]}` : parts[0];
};

const removeCommas = (value: string): string => {
  return value.replace(/,/g, "");
};

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, value, onChange, showDollarSign = false, showPercentSign = false, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState(() => formatWithCommas(value));

    // Sync display value when external value changes
    React.useEffect(() => {
      setDisplayValue(formatWithCommas(value));
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const rawValue = removeCommas(inputValue);
      
      // Allow empty input
      if (inputValue === "") {
        setDisplayValue("");
        onChange("");
        return;
      }
      
      // Validate that it's a valid number format
      if (!/^[0-9]*\.?[0-9]*$/.test(rawValue)) {
        return;
      }
      
      setDisplayValue(formatWithCommas(rawValue));
      onChange(rawValue);
    };

    return (
      <div className="relative">
        {showDollarSign && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
        )}
        <input
          type="text"
          inputMode="decimal"
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            showDollarSign && "pl-7",
            showPercentSign && "pr-7",
            className
          )}
          ref={ref}
          value={displayValue}
          onChange={handleChange}
          {...props}
        />
        {showPercentSign && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
        )}
      </div>
    );
  }
);
CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };
