'use client'

import { ArrowLeftEndOnRectangleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';
import { Button } from './button';

const TOTEM_HOST = process.env.NEXT_PUBLIC_TOTEM_HOST ? process.env.NEXT_PUBLIC_TOTEM_HOST : ''

export function SignOutButton() {
  return (
    <Button onClickCallback={ () => { signOut({ callbackUrl: TOTEM_HOST + "login" }) } }
    className='w-14 h-14 rounded-xl bg-gray-200 bg-opacity-60 text-black'>
      <ArrowLeftEndOnRectangleIcon className="w-6" />
    </Button>
  );
}