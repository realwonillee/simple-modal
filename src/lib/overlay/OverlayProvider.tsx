'use client';
import React, {
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { createCompatContext } from './createCompatContext';

interface IOverlayContext {
  mount(id: string, element: ReactNode): void;
  unmount(id: string): void;
  getTopOverlayId(): string | null;
  closeAll(): void;
  getOverlayCount(): number;
}

const OverlayContext = createCompatContext<IOverlayContext | null>(null);

export const useOverlayContext = () => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error('useOverlay is only available within OverlayProvider.');
  }
  return context;
};

export function OverlayProvider({ children }: { children: React.ReactNode }) {
  const [overlay, setOverlay] = useState<Map<string, ReactNode>>(new Map());

  const mount = useCallback((id: string, element: ReactNode) => {
    setOverlay((prevOverlay) => {
      const clone = new Map(prevOverlay);
      clone.set(id, element);
      return clone;
    });
  }, []);

  const unmount = useCallback((id: string) => {
    setOverlay((prevOverlay) => {
      const clone = new Map(prevOverlay);
      clone.delete(id);
      return clone;
    });
  }, []);

  const getTopOverlayId = useCallback(() => {
    const keys = Array.from(overlay.keys());
    return keys[keys.length - 1] || null;
  }, [overlay]);

  const getOverlayCount = useCallback(() => {
    return overlay.size;
  }, [overlay]);

  const closeAll = useCallback(() => {
    Array.from(overlay.values()).forEach((elem) => {
      console.log(elem);
      // eslint-disable-next-line
      const element = elem as any;
      if (
        element.ref &&
        element.ref.current &&
        typeof element.ref.current.close === 'function'
      ) {
        element.ref.current.close();
      }
    });
  }, [overlay]);

  const context = useMemo(
    () => ({ mount, unmount, getTopOverlayId, closeAll, getOverlayCount }),
    [mount, unmount, getTopOverlayId, closeAll, getOverlayCount],
  );

  return (
    <OverlayContext.Provider value={context}>
      {children}
      {Array.from(overlay.entries()).map(([id, element]) => (
        <React.Fragment key={id}>{element}</React.Fragment>
      ))}
    </OverlayContext.Provider>
  );
}
