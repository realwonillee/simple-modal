'use client';
import type { PropsWithChildren } from 'react';
import { ModalProvider } from '@/lib/modal/ModalContext2';

export const Provider = ({ children }: PropsWithChildren) => {
  return <ModalProvider>{children}</ModalProvider>;
};
