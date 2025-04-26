import { useState } from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";

export default function selectLanguage({
  defaultValue,
  options,
  className,
  ...props
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between border border-foreground dark:border-dark-mode-highlight bg-brown dark:bg-dark-mode-bg text-background dark:text-primary hover:bg-light-brown dark:hover:bg-dark-inner-bg"
        >
          {value
            ? options.find((framework) => framework.value === value)?.name
            : "Select Language"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 z-[110] border border-foreground dark:border-dark-mode-highlight bg-brown dark:bg-dark-mode-bg text-background dark:text-primary">
        <Command>
          <CommandInput
            placeholder="Search framework..."
            className="h-9 text-background dark:text-primary"
          />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {options.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="hover:bg-light-brown dark:hover:bg-dark-mode-highlight"
                >
                  {framework.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
