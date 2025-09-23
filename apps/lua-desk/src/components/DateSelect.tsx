/* eslint-disable @next/next/no-img-element */
'use client';

import {
  Button,
  Calendar,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@lua-case/ui-kit/ui';
import { addDays, format } from 'date-fns';
import { useEffect, useState } from 'react';

export default function DateSelect({
  onChange,
}: {
  onChange: (date: Date) => void;
}) {
  const today = new Date();
  const maxDate = addDays(today, 30);

  // Default auf heute + 30 Tage
  const [date, setDate] = useState<Date>(maxDate);

  useEffect(() => {
    onChange(date);
  }, [date, onChange]);

  function handleSelect(newDate: Date | undefined) {
    if (!newDate) return;

    // Nur innerhalb des erlaubten Bereichs
    if (newDate < today || newDate > maxDate) return;

    setDate(newDate);
    onChange(newDate);
  }

  return (
    <div className="flex flex-col gap-2">
      <Label>Booking until</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
            <img
              src="/calendar.svg"
              alt="Calendar icon"
              className="ml-auto h-4 w-4 opacity-50"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-white text-black shadow-md"
          align="start"
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            disabled={(d) => d < today || d > maxDate}
            captionLayout="dropdown"
            className=" [&_button]:cursor-pointer [&_button:hover]:bg-gray-100 [&_button:hover]:transition-colors"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
