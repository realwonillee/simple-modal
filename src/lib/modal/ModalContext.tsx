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
  id: number;
  modalId: string;
  isOpen: boolean;
  actions: {
    open: () => void;
    replace: (isAllReplace?: boolean) => void;
    close: (isAllClose?: boolean) => void;
  };
}

let count = 1;
function ModalProvider<T>({
  isInitOpen = false,
  children,
  ...props
}: PropsWithChildren<{ isInitOpen?: boolean } & T>) {
  const modalId = useId();
  const [id] = useState(count++);
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const modalService = ModalService.getInstance();

  const open = useCallback(
    (isReplace?: boolean) => {
      if (isReplace) modalService.replacePublish(modalId);
      else modalService.publish(modalId);
    },
    [modalId, modalService],
  );

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
    setIsMounted(true);
    return () => modalService.unsubscribe(modalId);
  }, [close, modalId, modalService, open]);

  useEffect(() => {
    if (isMounted && isInitOpen) open();
  }, [isMounted, isInitOpen, open, close]);

  const actions = useMemo(
    () => ({
      open,
      replace,
      close,
    }),
    [open, replace, close],
  );

  const store = useMemo(
    () => ({ id, modalId, isOpen, actions, ...props }),
    [id, modalId, isOpen, actions, props],
  );

  return (
    <ModalContext.Provider value={store}>{children}</ModalContext.Provider>
  );
}

function useModalContext<T>() {
  return useContext(ModalContext) as IModalContext & T;
}

export { ModalProvider, useModalContext };
