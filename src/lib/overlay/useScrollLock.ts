'use client';
import { useEffect } from 'react';
import { ScrollManager } from '@/lib/overlay/ScrollManager';

export function useScrollLock(isLocked: boolean) {
  const scrollManager = ScrollManager.getInstance();

  useEffect(() => {
    if (isLocked) {
      scrollManager.lock();
    }

    return () => {
      if (isLocked) {
        scrollManager.unlock();
      }
    };
  }, [isLocked]);
}
