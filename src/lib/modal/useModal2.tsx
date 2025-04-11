import { ReactNode, useCallback, useEffect, useId, useMemo } from 'react';
import { useModalContext } from '@/lib/modal/ModalContext2';
import ModalService2 from '@/lib/modal/ModalService2';
import ModalPortal from './ModalPortal';

export const useModal = () => {
  const {
    actions: { publish, isPublish, unpublishAll, unpublish },
  } = useModalContext();
  const modalId = useId();
  const isOpen = useMemo(() => isPublish(modalId), [isPublish, modalId]);

  const open = useCallback(
    (element: ReactNode) => {
      ModalService2.getInstance().publish(modalId);
      publish(modalId, <ModalPortal modalId={modalId}>{element}</ModalPortal>);
    },
    [publish, modalId],
  );

  const close = useCallback(() => {
    ModalService2.getInstance().unpublish(modalId);
    unpublish(modalId);
  }, [unpublish, modalId]);

  const closeAll = useCallback(() => {
    unpublishAll();
  }, [unpublishAll]);

  useEffect(() => {
    ModalService2.getInstance().subscribe(modalId, (isOpen: boolean) => {
      if (!isOpen) close();
    });
    return () => {
      ModalService2.getInstance().unsubscribe(modalId);
      ModalService2.getInstance().clean(modalId);
      close();
    };
  }, [close, modalId]);

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
