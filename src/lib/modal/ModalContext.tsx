import {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { PropsWithChildren } from 'react';
import shortid from 'shortid';
import ModalService2 from './ModalService';
import ModalPortal from './ModalPortal';
export const ModalContext = createContext({});

interface IModalContext {
  modalAction: {
    isOpen: (modalId: string) => boolean;
    open: (element: ReactElement) => void;
    replace: (element: ReactElement, isReplaceAll?: boolean) => void;
    close: () => void;
    closeAll: () => void;
  };
}

function ModalProvider({ children }: PropsWithChildren) {
  const [modalMap, setModalMap] = useState<Map<string, ReactElement>>(
    new Map(),
  );
  const modalMapRef = useRef<Map<string, ReactElement>>(modalMap);

  const getModalId = useCallback((modalStackIndex: number = -1) => {
    return (
      Array.from(modalMapRef.current)[modalStackIndex]?.[0] ??
      `modal-${shortid.generate()}`
    );
  }, []);

  const isOpen = useCallback((modalId: string) => {
    return modalMapRef.current.has(modalId);
  }, []);

  const closeAll = useCallback(() => {
    ModalService2.getInstance().unsubscribeAll();
    setModalMap(new Map());
  }, []);

  const close = useCallback(() => {
    setModalMap((prev) => {
      const clone = new Map(prev);
      const id = Array.from(clone)[clone.size - 1]?.[0];
      ModalService2.getInstance().unsubscribe(id);
      clone.delete(id);
      return clone;
    });
  }, []);

  const replace = useCallback(
    (element: ReactElement, isReplaceAll?: boolean) => {
      if (isReplaceAll) {
        const id = getModalId();
        ModalService2.getInstance().unsubscribeAll();
        ModalService2.getInstance().subscribe(id, (isOpen: boolean) => {
          if (!isOpen) close();
        });
        setModalMap(new Map([[id, element]]));
      } else {
        setModalMap((prev) => {
          const clone = new Map(prev);
          const id = Array.from(clone)[clone.size - 1]?.[0] ?? getModalId();
          ModalService2.getInstance().subscribe(id, (isOpen: boolean) => {
            if (!isOpen) close();
          });
          clone.set(id, element);
          return clone;
        });
      }
    },
    [close, getModalId],
  );

  const open = useCallback(
    (element: ReactElement) => {
      setModalMap((prev) => {
        const clone = new Map(prev);
        const id = getModalId();
        ModalService2.getInstance().subscribe(id, (isOpen: boolean) => {
          if (!isOpen) close();
        });
        clone.set(id, element);
        return clone;
      });
    },
    [close, getModalId],
  );

  useEffect(() => {
    modalMapRef.current = modalMap;
  }, [modalMap]);

  const store = useMemo(
    () => ({
      modalAction: {
        isOpen,
        open,
        replace,
        close,
        closeAll,
      },
    }),
    [isOpen, open, replace, close, closeAll],
  );

  return (
    <ModalContext.Provider value={store}>
      {children}
      {Array.from(modalMap.entries()).map(([key, element]) => (
        <ModalPortal key={key} modalId={key}>
          {element}
        </ModalPortal>
      ))}
    </ModalContext.Provider>
  );
}

function useModalContext<T>() {
  return useContext(ModalContext) as IModalContext & T;
}

export { ModalProvider, useModalContext };
