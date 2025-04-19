'use client';
import {
  forwardRef,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { CreateOverlayElement, OverlayControlRef } from './useOverlay';
import { useOverlayContext } from './OverlayProvider';

interface Props {
  overlayContent: CreateOverlayElement;
  id: string;
  unmountDelay: number;
}

export const OverlayController = forwardRef(
  (
    { overlayContent: OverlayContent, id, unmountDelay }: Props,
    ref: Ref<OverlayControlRef>,
  ) => {
    const { unmount } = useOverlayContext();
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);

    const handleOverlayClose = useCallback(() => {
      setIsRemoving(true);
      setTimeout(() => {
        setIsOverlayOpen(false);
        unmount(id);
      }, unmountDelay);
    }, [id, unmount, unmountDelay]);

    useImperativeHandle(ref, () => {
      return { close: handleOverlayClose };
    });

    useEffect(() => {
      const animationFrame = requestAnimationFrame(() => {
        setIsOverlayOpen(true);
      });

      return () => cancelAnimationFrame(animationFrame);
    }, []);

    return (
      <OverlayContent
        isOpen={isOverlayOpen}
        isRemoving={isRemoving}
        close={handleOverlayClose}
      />
    );
  },
);
OverlayController.displayName = 'OverlayController';
