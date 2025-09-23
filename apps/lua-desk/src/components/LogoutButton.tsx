'use client';

import { Button } from '@lua-case/ui-kit/ui';
import signOutAction from '../app/_actions/signOutAction';

export default function LogoutButton() {
  return (
    <Button
      className=" hover:bg-[#e5d4c8] transition-colors"
      onClick={() => {
        signOutAction();
      }}
    >
      Logout
    </Button>
  );
}
