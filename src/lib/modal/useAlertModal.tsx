import { useCallback } from 'react';
import { useModalContext } from './ModalContext';
import { IConfirmModalContent } from './types';
import ConfirmModal from '@/components/modal/ConfirmModal';

const useAlertModal = () => {
  const {
    modalActions: { open, replace, isOpenAlert },
  } = useModalContext();

  const openAlert = useCallback(
    (content: IConfirmModalContent) => {
      const action = isOpenAlert() ? replace : open;
      action({ kind: 'alert', element: <ConfirmModal {...content} /> });
    },
    [open, replace, isOpenAlert],
  );

  const warn = useCallback(
    (params: Omit<IConfirmModalContent, 'confirmKind'>) => {
      openAlert({
        ...params,
        confirmKind: 'warn',
      });
    },
    [openAlert],
  );

  const error = useCallback(
    (params: Omit<IConfirmModalContent, 'confirmKind'>) => {
      openAlert({
        ...params,
        confirmKind: 'error',
      });
    },
    [openAlert],
  );

  const info = useCallback(
    (params: Omit<IConfirmModalContent, 'confirmKind'>) => {
      openAlert({
        ...params,
        confirmKind: 'info',
      });
    },
    [openAlert],
  );

  const success = useCallback(
    (params: Omit<IConfirmModalContent, 'confirmKind'>) => {
      openAlert({
        ...params,
        confirmKind: 'success',
      });
    },
    [openAlert],
  );

  return {
    warn,
    error,
    info,
    success,
  };
};

export default useAlertModal;
