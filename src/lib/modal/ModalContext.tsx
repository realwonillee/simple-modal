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
import type { PropsWithChildren } from 'react';
import shortid from 'shortid';
import ModalService from './ModalService';
import ModalPortal from './ModalPortal';
import type { IModalContext } from './types';

const ModalContext = createContext({});

function ModalProvider({ children }: PropsWithChildren) {
  const [closeingModalId, setCloseingModalId] = useState<string | null>(null);
  const [modalMap, setModalMap] = useState<Map<string, ReactElement>>(
    new Map(),
  );
  const modalMapRef = useRef<Map<string, ReactElement>>(modalMap);

  const getModalId = useCallback(() => `modal-${shortid.generate()}`, []);

  const getTopModalId = useCallback(
    () =>
      Array.from(modalMapRef.current)[modalMapRef.current.size - 1]?.[0] ??
      null,
    [modalMapRef],
  );

  const isOpen = useCallback((modalId: string) => {
    return modalMapRef.current.has(modalId);
  }, []);

  const closeAll = useCallback(() => {
    ModalService.getInstance().unsubscribeAll();
    setModalMap(new Map());
    setCloseingModalId(null);
  }, []);

  const closeBefore = useCallback(() => {
    setCloseingModalId(getTopModalId() ?? null);
  }, [getTopModalId]);

  const close = useCallback(() => {
    setModalMap((prev) => {
      const clone = new Map(prev);
      const id = Array.from(clone)[clone.size - 1]?.[0];
      ModalService.getInstance().unsubscribe(id);
      clone.delete(id);
      return clone;
    });
    setCloseingModalId(null);
  }, []);

  const subscribeCallback = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) close();
    },
    [close],
  );

  const replace = useCallback(
    (element: ReactElement, isReplaceAll?: boolean) => {
      if (isReplaceAll) {
        const id = getModalId();
        ModalService.getInstance().unsubscribeAll();
        ModalService.getInstance().subscribe(id, subscribeCallback);
        setModalMap(new Map([[id, element]]));
      } else {
        setModalMap((prev) => {
          const clone = new Map(prev);
          const id = Array.from(clone)[clone.size - 1]?.[0] ?? getModalId();
          ModalService.getInstance().subscribe(id, subscribeCallback);
          clone.set(id, element);
          return clone;
        });
      }
    },
    [subscribeCallback, getModalId],
  );

  const open = useCallback(
    (element: ReactElement) => {
      requestAnimationFrame(() => {
        setModalMap((prev) => {
          const clone = new Map(prev);
          const id = getModalId();
          ModalService.getInstance().subscribe(id, subscribeCallback);
          clone.set(id, element);
          return clone;
        });
      });
    },
    [subscribeCallback, getModalId],
  );

  useEffect(() => {
    modalMapRef.current = modalMap;
  }, [modalMap]);

  useEffect(() => {
    if (closeingModalId) {
      setTimeout(() => {
        close();
      }, 100);
    }
  }, [closeingModalId, close]);

  const store = useMemo(
    () => ({
      closeingModalId,
      modalAction: {
        isOpen,
        open,
        replace,
        close: closeBefore,
        closeAll,
      },
    }),
    [closeingModalId, isOpen, open, replace, closeBefore, closeAll],
  );

  return (
    <ModalContext.Provider value={store}>
      {children}
      {Array.from(modalMap.entries()).map(([modalId, element]) => {
        return (
          <ModalPortal key={modalId} modalId={modalId}>
            {element}
          </ModalPortal>
        );
      })}
    </ModalContext.Provider>
  );
}

function useModalContext<T>() {
  return useContext(ModalContext) as IModalContext & T;
}

export { ModalProvider, useModalContext };
