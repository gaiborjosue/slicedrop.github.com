import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SliceType {
  value: string;
  label: string;
}

const sliceTypes: SliceType[] = [
  { value: "axial", label: "Axial" },
  { value: "coronal", label: "Coronal" },
  { value: "sagittal", label: "Sagittal" },
  { value: "multi", label: "Multi" },
  { value: "3d", label: "3D" },
];

interface ComboboxPopoverProps {
  onSliceTypeChange: (newSliceType: string) => void;
}

export function ComboboxPopover({ onSliceTypeChange }: ComboboxPopoverProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedSliceType, setSelectedSliceType] = React.useState<SliceType>(
    sliceTypes[3] // Default to "Multi"
  );

  return (
    <div className="flex items-center space-x-3">
      <p className="text-sm text-muted-foreground">Slice Mode</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="w-[80px] justify-start bg-black">
            {selectedSliceType.label}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right">
          <Command>
            <CommandList>
              <CommandGroup>
                {sliceTypes.map((type) => (
                  <CommandItem
                    key={type.value}
                    value={type.value}
                    onSelect={(value) => {
                      const selectedType = sliceTypes.find(
                        (type) => type.value === value
                      );
                      if (selectedType) {
                        setSelectedSliceType(selectedType);
                        onSliceTypeChange(selectedType.value);
                      }
                      setOpen(false);
                    }}
                  >
                    <span>{type.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
