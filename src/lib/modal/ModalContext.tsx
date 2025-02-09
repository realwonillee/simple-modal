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
  };
}

const ModalProvider = ({ children }: PropsWithChildren) => {
  const modalId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const modalService = ModalService.getInstance();
  const open = useCallback(() => {
    setIsOpen(true);
    modalService.publish(modalId);
  }, [modalId, modalService]);
  const close = useCallback(() => {
    setIsOpen(false);
    modalService.unpublish(modalId);
  }, [modalId, modalService]);
  useEffect(() => {
    return () => modalService.clean(modalId);
  }, [modalId, modalService]);
  useEffect(() => {
    modalService.subscribe(modalId, (isOpen: boolean) => {
      if (isOpen) open();
      else close();
    });
    return () => modalService.unsubscribe(modalId);
  }, [close, modalId, modalService, open]);
  const actions = useMemo(
    () => ({
      open,
      close,
    }),
    [open, close],
  );
  return (
    <ModalContext.Provider value={{ modalId, isOpen, actions }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext) as IModalHook;

export { ModalProvider, useModal };
