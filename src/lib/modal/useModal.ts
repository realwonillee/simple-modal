import { useCallback, useEffect, useId, useMemo, useState } from 'react';
import ModalService from '@/lib/modal/ModalService';

export const useModal = () => {
  const modalId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const modalService = ModalService.getInstance();

  const open = useCallback(() => {
    modalService.publish(modalId);
  }, [modalId, modalService]);

  const replace = useCallback(
    (isAllReplace?: boolean) => {
      modalService.replacePublish(modalId, isAllReplace);
    },
    [modalId, modalService],
  );

  const close = useCallback(
    (isAllClose?: boolean) => {
      if (isAllClose) modalService.unpublishAll();
      else modalService.unpublish(modalId);
    },
    [modalId, modalService],
  );

  useEffect(() => {
    return () => modalService.clean(modalId);
  }, [modalId, modalService]);

  useEffect(() => {
    modalService.subscribe(modalId, (isOpen: boolean) => {
      setIsOpen(isOpen);
    });
    return () => modalService.unsubscribe(modalId);
  }, [modalId, modalService]);

  return useMemo(
    () => ({
      modalId,
      isOpen,
      actions: {
        open,
        replace,
        close,
      },
    }),
    [modalId, isOpen, open, replace, close],
  );
};
