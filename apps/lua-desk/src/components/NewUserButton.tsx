'use client';

import { Button } from '@lua-case/ui-kit/ui';

import { useState } from 'react';
import RegisterUserForm from './RegisterUserForm';

export default function NewUserButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        className="hover:bg-[#e5d4c8] transition-colors"
        onClick={() => setOpen(true)}
      >
        Create New User
      </Button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg relative">
            <button
              className="px-2 mb-2 rounded absolute top-2 right-2 text-gray-500 bg-[#f6ebe3] hover:text-black hover:bg-[#e5d4c8] transition-colors"
              onClick={() => setOpen(false)}
              aria-label="Schließen"
            >
              ×
            </button>
            <RegisterUserForm />
          </div>
        </div>
      )}
    </>
  );
}
