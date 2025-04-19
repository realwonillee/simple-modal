type ClassValue = string | undefined | null | boolean;

export function clsx(...args: ClassValue[]): string {
  let i = 0,
    tmp,
    str = '',
    len = args.length;
  for (; i < len; i++) {
    if ((tmp = args[i])) {
      if (typeof tmp === 'string') {
        str += (str && ' ') + tmp;
      }
    }
  }
  return str;
}

export function then(predi: boolean) {
  const elseFunc = (callback: () => void) => {
    if (!predi) callback();
  };
  return {
    do: (callback: () => void) => {
      if (predi) callback();
      return { else: elseFunc };
    },
  };
}

export function on<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args: Parameters<T['addEventListener']> | [string, Function | null, ...any]
): void {
  if (obj && obj.addEventListener) {
    obj.addEventListener(
      ...(args as Parameters<HTMLElement['addEventListener']>),
    );
  }
}

export function off<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args:
    | Parameters<T['removeEventListener']>
    | [string, Function | null, ...any]
): void {
  if (obj && obj.removeEventListener) {
    obj.removeEventListener(
      ...(args as Parameters<HTMLElement['removeEventListener']>),
    );
  }
}
