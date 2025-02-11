import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react';
import { PropsWithChildren } from 'react';
import ModalService from '@/lib/modal/ModalService';

const ModalContext = createContext({});

interface IModalHook {
  modalId: string;
  isOpen: boolean;
  actions: {
    open: () => void;
    close: () => void;
    closeAll: () => void;
  };
}

function ModalProvider<T>({
  isInitOpen = false,
  children,
  ...props
}: PropsWithChildren<{ isInitOpen?: boolean } & T>) {
  const modalId = useId();
  const [isMounted, setIsMounted] = useState(isInitOpen);
  const [isOpen, setIsOpen] = useState(false);
  const modalService = ModalService.getInstance();

  const open = useCallback(() => {
    modalService.publish(modalId);
  }, [modalId, modalService]);

  const close = useCallback(() => {
    modalService.unpublish(modalId);
  }, [modalId, modalService]);

  const closeAll = useCallback(() => {
    modalService.unpublishAll();
  }, [modalService]);

  useEffect(() => {
    return () => modalService.clean(modalId);
  }, [modalId, modalService]);

  useEffect(() => {
    modalService.subscribe(modalId, (isOpen: boolean) => {
      setIsOpen(isOpen);
    });
    setIsMounted(true);
    return () => modalService.unsubscribe(modalId);
  }, [close, modalId, modalService, open]);

  useEffect(() => {
    if (isMounted) {
      if (isInitOpen) open();
      else close();
    }
  }, [isMounted, isInitOpen, open, close]);

  const actions = useMemo(
    () => ({
      open,
      close,
      closeAll,
    }),
    [open, close, closeAll],
  );

  return (
    <ModalContext.Provider value={{ modalId, isOpen, actions, ...props }}>
      {children}
    </ModalContext.Provider>
  );
}

function useModal<T>() {
  return useContext(ModalContext) as IModalHook & T;
}

export { ModalProvider, useModal };
