'use client';

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@lua-case/ui-kit/ui';
import removeDeskAction from '../app/_actions/removeDeskAction';

type Props = {
  desk: { id: number; name: string };
  onRemoved: () => void;
};

export default function RemoveDeskCard({ desk, onRemoved }: Props) {
  async function handleRemove() {
    try {
      await removeDeskAction(desk.id);
      onRemoved();
      alert('Desk removed!');
    } catch (err) {
      console.error(err);
      alert('Removing failed');
    }
  }

  return (
    <div className="w-[500px]">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="mx-4 mb-2">
          <CardTitle className="font-semibold">Your booked desk</CardTitle>
        </CardHeader>
        <CardContent className="mx-4">
          <p>Desk {desk.name}</p>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleRemove}
            className="w-full bg-red-200 hover:bg-red-300 transition-colors"
          >
            Remove Desk
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
