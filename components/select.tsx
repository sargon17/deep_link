"use client";
import React from "react";
import { useState } from "react";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const selectAppList = [
  {
    value: "instagram",
    label: "Instagram",
  },
  {
    value: "facebook",
    label: "Facebook",
  },
  {
    value: "twitter",
    label: "Twitter",
  },
];

function Select() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(selectAppList[0].value);

  return (
    <>
      <Popover
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            // aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selectedApp ? selectAppList.find((app) => app.value === selectedApp)?.label : "Select app..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search app..." />
            <CommandEmpty>No app found.</CommandEmpty>
            <CommandGroup>
              {selectAppList.map((app) => (
                <CommandItem
                  key={app.value}
                  onSelect={(currentValue: string) => {
                    setSelectedApp(currentValue === selectedApp ? "" : currentValue);
                    setIsOpen(false);
                  }}
                >
                  <Check
                    className={cn("mr-2 h-4 w-4", selectedApp === app.value ? "opacity-100" : "opacity-0")}
                  />
                  {app.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}

export { Select };
