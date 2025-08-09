import {
  createContext,
  isValidElement,
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
import type {
  IConfirmModalContent,
  IModalContent,
  IModalContext,
} from './types';
import useBodyScrollLock from '@/hooks/useScrollLock';
import { useEscapeFocusAway } from '@/hooks/useEscapeFocusAway';
import ConfirmModal from '@/components/modal/ConfirmModal';

const ANIMATION_DURATION = 100;

const ModalContext = createContext({});

function ModalProvider({ children }: PropsWithChildren) {
  const scrollLock = useBodyScrollLock();
  const [closeingModalId, setCloseingModalId] = useState<string | null>(null);
  const [modalMap, setModalMap] = useState<Map<string, IModalContent>>(
    new Map(),
  );
  const modalMapRef = useRef<Map<string, IModalContent>>(modalMap);

  const generateModalId = useCallback(() => `modal-${shortid.generate()}`, []);

  const isOpen = useCallback((modalId: string) => {
    return modalMapRef.current.has(modalId);
  }, []);

  const open = useCallback(
    (
      modalId: string,
      {
        kind = 'popup',
        element,
      }: {
        kind?: 'popup' | 'alert';
        element: ReactElement;
      },
    ) => {
      setModalMap((prev) => {
        const clone = new Map(prev);
        clone.set(modalId, { kind, element });
        return clone;
      });
    },
    [],
  );

  const update = useCallback(
    ({
      modalId,
      content,
    }: {
      modalId?: string;
      content: Partial<IConfirmModalContent>;
    }) => {
      setModalMap((prev) => {
        const clone = new Map(prev);
        const kind = content.level === 'loading' ? 'loading' : 'alert';
        const targetModalId = modalId ?? Array.from(clone)[clone.size - 1]?.[0];
        const prevContent = clone.get(targetModalId);
        if (prevContent && !isValidElement(prevContent.element)) {
          clone.set(targetModalId, {
            kind,
            element: { ...prevContent.element, ...content },
          });
          return clone;
        }
        return prev;
      });
    },
    [],
  );

  const replace = useCallback(
    ({
      kind = 'popup',
      element,
      isReplaceAll,
    }: {
      kind?: 'popup' | 'alert' | 'loading';
      element: ReactElement;
      isReplaceAll?: boolean;
    }) => {
      if (isReplaceAll) {
        const modalId = generateModalId();
        setModalMap(new Map([[modalId, { kind, element }]]));
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

  const close = useCallback((modalId?: string) => {
    const targetModalId =
      modalId ??
      Array.from(modalMapRef.current)[modalMapRef.current.size - 1]?.[0];
    if (targetModalId) {
      setCloseingModalId(targetModalId);
    }
  }, []);

  const removeModal = useCallback(() => {
    setTimeout(() => {
      setModalMap((prev) => {
        const clone = new Map(prev);
        const id = Array.from(clone)[clone.size - 1]?.[0];
        clone.delete(id);
        return clone;
      });
    }, ANIMATION_DURATION);
  }, []);

  const closeAll = useCallback((isForce?: boolean) => {
    if (isForce) {
      setModalMap(new Map());
    } else {
      setModalMap((prev) => {
        const clone = new Map(prev);
        Array.from(clone).forEach(([modalId, value]) => {
          if (value.kind !== 'alert') {
            clone.delete(modalId);
          } else {
            const content = value.element as IConfirmModalContent;
            if (!content.isInactiveCloseAll) {
              clone.delete(modalId);
            }
          }
        });
        return clone;
      });
    }
    setCloseingModalId(null);
  }, []);

  const store = useMemo(
    () => ({
      closeingModalId,
      modalActions: {
        generateModalId,
        isOpen,
        open,
        update,
        replace,
        close,
        closeAll,
      },
    }),
    [
      closeingModalId,
      generateModalId,
      isOpen,
      open,
      update,
      close,
      replace,
      closeAll,
    ],
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

  useEffect(() => {
    if (closeingModalId) {
      removeModal();
    }
  }, [closeingModalId, removeModal]);

  return (
    <ModalContext.Provider value={store}>
      {children}
      {Array.from(modalMap.entries()).map(([modalId, { element }], index) => (
        <ModalPortal
          key={modalId}
          modalId={modalId}
          dimOpacity={index ? 10 : 40}
        >
          {isValidElement(element) ? (
            element
          ) : (
            <ConfirmModal {...(element as IConfirmModalContent)} />
          )}
        </ModalPortal>
      ))}
    </ModalContext.Provider>
  );
}

function useModalContext() {
  return useContext(ModalContext) as IModalContext;
}

export { ModalProvider, useModalContext };
