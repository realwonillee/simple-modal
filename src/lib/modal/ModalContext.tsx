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

interface IModalContext {
  modalId: string;
  isOpen: boolean;
  actions: {
    open: () => void;
    close: () => void;
    selfClose: () => void;
  };
}

function ModalProvider<T>({
  isInitOpen = false,
  children,
  ...props
}: PropsWithChildren<{ isInitOpen?: boolean } & T>) {
  const modalId = useId();
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const modalService = ModalService.getInstance();

  const open = useCallback(() => {
    modalService.publish(modalId);
  }, [modalId, modalService]);

  const selfClose = useCallback(() => {
    modalService.unpublish(modalId);
  }, [modalId, modalService]);

  const close = useCallback(() => {
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
    if (isMounted && isInitOpen) open();
  }, [isMounted, isInitOpen, open, close]);

  const actions = useMemo(
    () => ({
      open,
      close,
      selfClose,
    }),
    [open, close, selfClose],
  );

  const store = useMemo(
    () => ({ modalId, isOpen, actions, ...props }),
    [modalId, isOpen, actions, props],
  );

  return (
    <ModalContext.Provider value={store}>{children}</ModalContext.Provider>
  );
}

function useModal<T>() {
  return useContext(ModalContext) as IModalContext & T;
}

export { ModalProvider, useModal };
