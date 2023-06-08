"use client";
import React from "react";
import { useState, useEffect } from "react";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { type } from "os";

type SelectProps = {
  dataSet: { label: string; value: string }[];
  defaultVal?: string | object | null;
  updateValue: Function;
  className?: string;
};

function Select({ dataSet, defaultVal, updateValue, className }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(defaultVal || "");

  useEffect(() => {
    updateValue(selectedData);
  }, [selectedData]);

  return (
    <div className={className}>
      <Popover
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-[200px] justify-between dark"
          >
            {selectedData ? dataSet.find((data) => data.value === selectedData)?.label : "Select app..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0 dark">
          <Command>
            <CommandInput
              placeholder="Search app..."
              className="dark my-1 px-2 bg-input rounded-md "
            />
            <CommandEmpty>No app found.</CommandEmpty>
            <CommandGroup>
              {dataSet.map((data) => (
                <CommandItem
                  key={data.value}
                  onSelect={(currentValue: string) => {
                    setSelectedData(currentValue === selectedData ? "" : currentValue);
                    setIsOpen(false);
                  }}
                >
                  <Check
                    className={cn("mr-2 h-4 w-4", selectedData === data.value ? "opacity-100" : "opacity-0")}
                  />
                  {data.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export { Select };
