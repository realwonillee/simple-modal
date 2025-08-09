import { ReactElement, useCallback, useRef } from 'react';
import { useModalContext } from './ModalContext';
import { IConfirmModalContent } from './types';

const useModal = () => {
  const modalIdList = useRef<string[]>([]);
  const { modalActions } = useModalContext();

  const popup = useCallback(
    (element: ReactElement) => {
      const modalId = modalActions.generateModalId();
      if (!modalIdList.current.includes(modalId)) {
        modalIdList.current.push(modalId);
      }
      modalActions.open(modalId, { element });
      return modalId;
    },
    [modalActions],
  );

  const openAlert = useCallback(
    (content: IConfirmModalContent) => {
      const modalId = modalActions.generateModalId();
      if (!modalIdList.current.includes(modalId)) {
        modalIdList.current.push(modalId);
      }
      modalActions.open(modalId, {
        kind: 'alert',
        element: content,
      });
      return modalId;
    },
    [modalActions],
  );

  const update = useCallback(
    (content: Partial<IConfirmModalContent>) => {
      const lastModalId = modalIdList.current.pop();
      if (lastModalId) {
        modalActions.update({ modalId: lastModalId, content });
      }
    },
    [modalActions],
  );

  const loading = useCallback(
    (params: Omit<IConfirmModalContent, 'level'>) => {
      return openAlert({
        ...params,
        level: 'loading',
      });
    },
    [openAlert],
  );

  const warn = useCallback(
    (params: Omit<IConfirmModalContent, 'level'>) => {
      return openAlert({
        ...params,
        level: 'warn',
      });
    },
    [openAlert],
  );

  const error = useCallback(
    (params: Omit<IConfirmModalContent, 'level'>) => {
      return openAlert({
        ...params,
        level: 'error',
      });
    },
    [openAlert],
  );

  const info = useCallback(
    (params: Omit<IConfirmModalContent, 'level'>) => {
      return openAlert({
        ...params,
        level: 'info',
      });
    },
    [openAlert],
  );

  const success = useCallback(
    (params: Omit<IConfirmModalContent, 'level'>) => {
      return openAlert({
        ...params,
        level: 'success',
      });
    },
    [openAlert],
  );

  return {
    popup,
    update,
    loading,
    warn,
    error,
    info,
    success,
    close: modalActions.close,
    closeAll: modalActions.closeAll,
  };
};

export default useModal;
