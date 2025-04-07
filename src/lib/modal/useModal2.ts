import { ReactNode, useCallback, useEffect, useId, useMemo } from 'react';
import { useModalContext } from '@/lib/modal/ModalContext2';

export const useModal = () => {
  const {
    actions: { publish, isPublish, unpublishAll, unpublish },
  } = useModalContext();
  const modalId = useId();

  const isOpen = useMemo(() => isPublish(modalId), [isPublish, modalId]);

  const open = useCallback(
    (element: ReactNode) => {
      publish(modalId, element);
    },
    [publish, modalId],
  );

  const close = useCallback(() => {
    unpublish(modalId);
  }, [unpublish, modalId]);

  const closeAll = useCallback(() => {
    unpublishAll();
  }, [unpublishAll]);

  useEffect(() => {
    return () => close();
  }, [close]);

  return useMemo(
    () => ({
      modalId,
      isOpen,
      actions: {
        open,
        close,
        closeAll,
      },
    }),
    [modalId, isOpen, open, close, closeAll],
  );
};
