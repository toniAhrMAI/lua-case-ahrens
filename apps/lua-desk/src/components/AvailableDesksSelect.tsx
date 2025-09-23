'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@lua-case/ui-kit/ui';
import { useEffect, useState } from 'react';
import getAvailableDesksAction from '../app/_actions/getAvailableDesksAction';

export default function AvailableDesksSelect({
  onSelect,
}: {
  onSelect: (deskId: number, deskName: string) => void;
}) {
  const [desks, setDesks] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    (async () => {
      const result = await getAvailableDesksAction();
      setDesks(result);
    })();
  }, []);

  return (
    <Select
      onValueChange={(val) => {
        const selectedDesk = desks.find((d) => d.id === Number(val));
        if (selectedDesk) {
          onSelect(selectedDesk.id, selectedDesk.name);
        }
      }}
      disabled={desks.length === 0} // deaktivieren, wenn keine Tische
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Desk" />
      </SelectTrigger>
      <SelectContent className="bg-white text-black">
        <SelectGroup>
          {desks.length === 0 ? (
            <SelectItem value="0" disabled>
              No desks available
            </SelectItem>
          ) : (
            desks.map((desk) => (
              <SelectItem
                key={desk.id}
                value={desk.id.toString()}
                className="cursor-pointer hover:bg-gray-100 transition-colors"
              >
                {desk.name}
              </SelectItem>
            ))
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
