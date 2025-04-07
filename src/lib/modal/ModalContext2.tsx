import {
  createContext,
  Fragment,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { PropsWithChildren } from 'react';

export const ModalContext = createContext({});

interface IModalContext {
  modalMap: Map<string, ReactNode>;
  actions: {
    isPublish: (modalId: string) => boolean;
    publish: (modalId: string, element: ReactNode) => void;
    unpublish: (modalId: string) => void;
    unpublishAll: () => void;
  };
}

function ModalProvider({ children }: PropsWithChildren) {
  const [modalMap, setModalMap] = useState<Map<string, ReactNode>>(new Map());
  const isPublish = useCallback(
    (modalId: string) => {
      return modalMap.has(modalId);
    },
    [modalMap],
  );
  const publish = useCallback((modalId: string, element: ReactNode) => {
    setModalMap((prev) => {
      const clone = new Map(prev);
      clone.set(modalId, element);
      return clone;
    });
  }, []);
  const unpublish = useCallback((modalId: string) => {
    setModalMap((prev) => {
      const clone = new Map(prev);
      clone.delete(modalId);
      return clone;
    });
  }, []);
  const unpublishAll = useCallback(() => {
    setModalMap(new Map());
  }, []);
  const store = useMemo(
    () => ({
      modalMap,
      actions: {
        isPublish,
        publish,
        unpublish,
        unpublishAll,
      },
    }),
    [isPublish, publish, unpublish, unpublishAll],
  );
  return (
    <ModalContext.Provider value={store}>
      {children}
      {Array.from(modalMap.entries()).map(([key, element]) => (
        <Fragment key={key}>{element}</Fragment>
      ))}
    </ModalContext.Provider>
  );
}

function useModalContext<T>() {
  return useContext(ModalContext) as IModalContext & T;
}

export { ModalProvider, useModalContext };
