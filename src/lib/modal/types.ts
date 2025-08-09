import { ReactElement } from 'react';

interface IConfirmButton {
  label: string;
  disabled: boolean;
  isLoading: boolean;
  callback: () => void;
}

export interface IConfirmModalContent {
  level: 'warn' | 'error' | 'info' | 'success' | 'loading';
  title?: string | string[];
  description?: string | string[];
  cancelButton?: Partial<IConfirmButton>;
  confirmButton?: Partial<IConfirmButton>;
  targetKey?: string;
  isInactiveCloseAll?: boolean;
}

export interface IModalContent {
  kind?: 'popup' | 'alert' | 'loading';
  element: ReactElement | IConfirmModalContent;
}

export interface IModalContext {
  closeingModalId: string | null;
  modalActions: {
    generateModalId: () => string;
    isOpen: (modalId: string) => boolean;
    isOpenAlert: () => boolean;
    open: (modalId: string, content: IModalContent) => void;
    update: ({
      modalId,
      content,
    }: {
      modalId?: string;
      content: Partial<IConfirmModalContent>;
    }) => void;
    closeBefore: (modalId: string) => void;
    replace: (content: IModalContent, isReplaceAll?: boolean) => void;
    close: (targetModalId?: string) => void;
    closeAll: (isForce?: boolean) => void;
  };
}
