import { useCallback, useEffect, useMemo, useRef } from 'react';
import type { RefObject } from 'react';

type ModifierKey = 'Alt' | 'AltGraph' | 'Control' | 'Shift' | 'Meta';
type NavigationKey =
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'ArrowUp'
  | 'End'
  | 'Home'
  | 'PageDown'
  | 'PageUp';
type ActionKey = 'Enter' | 'Tab' | 'Escape' | 'Backspace' | 'Delete' | 'Space';

type KeyboardKey = ModifierKey | NavigationKey | ActionKey;
type KeyboardEventType = 'keydown' | 'keyup';

const useKeyPress = (
  targetKey: KeyboardKey | KeyboardKey[],
  keydownCallback: (e: KeyboardEvent) => void,
  keyupCallback?: (e: KeyboardEvent) => void,
  elementRef?: RefObject<HTMLElement>,
) => {
  const savedCallbacks = useRef({
    keydown: keydownCallback,
    keyup: keyupCallback || (() => {}),
  });

  const targetKeys = useMemo(
    () => (Array.isArray(targetKey) ? targetKey : [targetKey]),
    [targetKey],
  );

  useEffect(() => {
    savedCallbacks.current.keydown = keydownCallback;
    savedCallbacks.current.keyup = keyupCallback || (() => {});
  }, [keydownCallback, keyupCallback]);

  const createHandler = useCallback(
    (eventType: KeyboardEventType) => (e: Event) => {
      if (
        e instanceof KeyboardEvent &&
        targetKeys.includes(e.key as KeyboardKey)
      ) {
        savedCallbacks.current[eventType](e);
      }
    },
    [targetKeys],
  );

  // 이벤트 리스너 설정
  useEffect(() => {
    const element = (elementRef?.current as HTMLElement) || document;
    if (!element) return;

    const keydownHandler = createHandler('keydown');
    const keyupHandler = keyupCallback ? createHandler('keyup') : null;

    element.addEventListener('keydown', keydownHandler);
    if (keyupHandler) {
      element.addEventListener('keyup', keyupHandler);
    }

    return () => {
      element.removeEventListener('keydown', keydownHandler);
      if (keyupHandler) {
        element.removeEventListener('keyup', keyupHandler);
      }
    };
  }, [createHandler, elementRef, keyupCallback]);
};

export default useKeyPress;
