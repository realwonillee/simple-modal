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

const ModalProvider = ({
  initIsOpen = false,
  children,
}: PropsWithChildren<{ initIsOpen?: boolean }>) => {
  const modalId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const modalService = useMemo(() => ModalService.getInstance(), []);
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
    if (initIsOpen) open();
  }, [initIsOpen, open]);
  useEffect(() => {
    return () => modalService.clean(modalId);
  }, [modalId, modalService]);
  useEffect(() => {
    modalService.subscribe(modalId, (isOpen: boolean) => {
      setIsOpen(isOpen);
    });
    return () => modalService.unsubscribe(modalId);
  }, [close, modalId, modalService, open]);
  const actions = useMemo(
    () => ({
      open,
      close,
      closeAll,
    }),
    [open, close, closeAll],
  );
  return (
    <ModalContext.Provider value={{ modalId, isOpen, actions }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext) as IModalHook;

export { ModalProvider, useModal };
