'use client';

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@lua-case/ui-kit/ui';
import { useState } from 'react';
import bookDeskAction from '../app/_actions/bookDeskAction';
import AvailableDesksSelect from './AvailableDesksSelect';
import DateSelect from './DateSelect';

type Props = {
  onBooked: (desk: { id: number; name: string }) => void;
};

export default function BookDeskCard({ onBooked }: Props) {
  const [deskId, setDeskId] = useState<number | null>(null);
  const [deskName, setDeskName] = useState<string>('');
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!deskId || !expiresAt) return;

    try {
      await bookDeskAction(deskId, expiresAt);

      // Hier direkt Desk zurückmelden
      onBooked({ id: deskId, name: deskName });

      alert('Desk booked!');
    } catch (err) {
      console.error(err);
      alert('Booking failed. Are you logged in?');
    }
  }

  return (
    <div className="w-[500px]">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="mx-4 mb-3">
          <CardTitle className="font-semibold">
            Book your desk for the upcoming days!
          </CardTitle>
        </CardHeader>
        <CardContent className="mx-4">
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <AvailableDesksSelect
              onSelect={(id, name) => {
                setDeskId(id);
                setDeskName(name);
              }}
            />
            <DateSelect onChange={setExpiresAt} />
            <Button
              type="submit"
              className="mt-3 w-full bg-[#f6ebe3] hover:bg-[#e5d4c8] transition-colors"
            >
              Book Desk
            </Button>
          </form>
        </CardContent>
        <CardFooter />
      </Card>
    </div>
  );
}
