'use client';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useOverlayContext } from './OverlayProvider';
import { OverlayController } from './OverlayController';

export interface OverlayControlRef {
  close: () => void;
}

export type CreateOverlayElement = (props: {
  isOpen: boolean;
  close: () => void;
  isRemoving: boolean;
}) => ReactNode;

let elementId = 1;
export function useOverlay() {
  const { mount, unmount, closeAll } = useOverlayContext();
  const [id] = useState(() => String(elementId++));
  const overlayRef = useRef<OverlayControlRef | null>(null);

  useEffect(() => {
    return () => unmount(id);
  }, [id, unmount]);

  return {
    id,
    open: (overlayContent: CreateOverlayElement, unmountDelay: number) => {
      mount(
        id,
        <OverlayController
          id={id}
          overlayContent={overlayContent}
          ref={overlayRef}
          unmountDelay={unmountDelay}
        />,
      );
    },
    close: () => {
      overlayRef.current?.close();
    },
    closeAll,
  };
}
