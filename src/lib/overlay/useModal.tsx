import React, { ReactNode } from 'react';
import useKeyPress from '@/lib/overlay/useKeyPress';
import { useOverlay } from '@/lib/overlay/useOverlay';
import { useOverlayContext } from '@/lib/overlay/OverlayProvider';
import { then } from '@/lib/overlay/common';
import { Modal } from '@/lib/overlay/Modal';

const MODAL_ANIMATION_DELAY = 80;
export const useModal = () => {
  const overlay = useOverlay();
  const { getTopOverlayId, unmount } = useOverlayContext();

  useKeyPress('Escape', () => {
    const lastOverlayId = getTopOverlayId();
    if (lastOverlayId !== null) {
      console.log(
        `getTopOverlayId: ${getTopOverlayId()}`,
        `overlayId: ${overlay.id}`,
      );
    }
    return then(lastOverlayId !== null).do(() => unmount(lastOverlayId!));
  });

  return {
    open: (
      content: ({
        isOpen,
        close,
        isRemoving,
      }: {
        isOpen: boolean;
        close: () => void;
        isRemoving: boolean;
        modalId: string;
      }) => ReactNode,
    ) => {
      console.log(overlay.id);
      overlay.open(({ isOpen, close, isRemoving }) => {
        const renderedContent = content({
          close,
          isOpen,
          isRemoving,
          modalId: overlay.id,
        });
        if (
          React.isValidElement(renderedContent) &&
          renderedContent.type === Modal
        ) {
          return renderedContent;
        } else {
          return (
            <Modal isOpen={isOpen} close={close} isRemoving={isRemoving}>
              {content({ close, isOpen, isRemoving, modalId: overlay.id })}
            </Modal>
          );
        }
      }, MODAL_ANIMATION_DELAY);
    },
    close: overlay.close,
    closeAll: overlay.closeAll,
  };
};
