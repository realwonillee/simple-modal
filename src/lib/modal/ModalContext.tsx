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
import ModalPortal from './ModalPortal';
import type { IModalContent, IModalContext } from './types';
import { flushSync } from 'react-dom';
import useBodyScrollLock from '@/hooks/useScrollLock';
import { useEscapeFocusAway } from '@/hooks/useEscapeFocusAway';

const ANIMATION_DURATION = 80;

const ModalContext = createContext({});

function ModalProvider({ children }: PropsWithChildren) {
  const scrollLock = useBodyScrollLock();
  const [closeingModalId, setCloseingModalId] = useState<string | null>(null);
  const [modalMap, setModalMap] = useState<Map<string, IModalContent>>(
    new Map(),
  );
  const modalMapRef = useRef<Map<string, IModalContent>>(modalMap);

  const generateModalId = useCallback(() => `modal-${shortid.generate()}`, []);

  const getTopModalId = useCallback(
    () =>
      Array.from(modalMapRef.current)[modalMapRef.current.size - 1]?.[0] ??
      null,
    [modalMapRef],
  );

  const isOpen = useCallback((modalId: string) => {
    return modalMapRef.current.has(modalId);
  }, []);

  const isOpenAlert = useCallback(() => {
    return Array.from(modalMapRef.current).some(
      ([, { kind }]) => kind === 'alert',
    );
  }, []);

  const closeAll = useCallback(() => {
    setModalMap(new Map());
    setCloseingModalId(null);
  }, []);

  const closeBefore = useCallback(() => {
    flushSync(() => setCloseingModalId(getTopModalId() ?? null));
  }, [getTopModalId]);

  const close = useCallback(() => {
    closeBefore();
    setTimeout(() => {
      setModalMap((prev) => {
        const clone = new Map(prev);
        const id = Array.from(clone)[clone.size - 1]?.[0];
        clone.delete(id);
        return clone;
      });
    }, ANIMATION_DURATION);
  }, [closeBefore]);

  const replace = useCallback(
    ({
      kind = 'popup',
      element,
      isReplaceAll,
    }: {
      kind?: 'popup' | 'alert';
      element: ReactElement;
      isReplaceAll?: boolean;
    }) => {
      if (isReplaceAll) {
        const id = generateModalId();
        setModalMap(new Map([[id, { kind, element }]]));
      } else {
        setModalMap((prev) => {
          const clone = new Map(prev);
          const id =
            Array.from(clone)[clone.size - 1]?.[0] ?? generateModalId();
          clone.delete(id);
          const newId = generateModalId();
          clone.set(newId, { kind, element });
          return clone;
        });
      }
    },
    [generateModalId],
  );

  const open = useCallback(
    ({
      kind = 'popup',
      element,
    }: {
      kind?: 'popup' | 'alert';
      element: ReactElement;
    }) => {
      setModalMap((prev) => {
        const clone = new Map(prev);
        clone.set(generateModalId(), { kind, element });
        return clone;
      });
    },
    [generateModalId],
  );

  const store = useMemo(
    () => ({
      closeingModalId,
      modalActions: {
        isOpen,
        isOpenAlert,
        open,
        replace,
        close,
        closeAll,
      },
    }),
    [closeingModalId, isOpen, isOpenAlert, open, replace, close, closeAll],
  );
  useEscapeFocusAway({ callback: close });

  useEffect(() => {
    modalMapRef.current = modalMap;
    if (modalMap.size > 0) {
      scrollLock.lock();
    } else {
      scrollLock.unlock();
    }
  }, [modalMap, scrollLock]);

  return (
    <ModalContext.Provider value={store}>
      {children}
      {Array.from(modalMap.entries()).map(([modalId, { element }], index) => (
        <ModalPortal
          key={modalId}
          modalId={modalId}
          dimOpacity={index ? 10 : 40}
        >
          {element}
        </ModalPortal>
      ))}
    </ModalContext.Provider>
  );
}

function useModalContext() {
  return useContext(ModalContext) as IModalContext;
}

export { ModalProvider, useModalContext };
