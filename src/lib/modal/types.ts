import { ReactElement } from 'react';

interface IConfirmButton {
  label: string;
  disabled?: boolean;
  isLoading?: boolean;
  callback: () => void;
}

export interface IConfirmModalContent {
  confirmKind: 'warn' | 'error' | 'info' | 'success' | 'loading';
  title: string | string[];
  description: string | string[];
  confirm?: IConfirmButton;
  cancel?: IConfirmButton;
}

export interface IModalContent {
  kind?: 'popup' | 'alert' | 'loading';
  element: ReactElement;
}

export interface IModalContext {
  closeingModalId: string | null;
  modalActions: {
    isOpen: (modalId: string) => boolean;
    isOpenAlert: () => boolean;
    open: (content: IModalContent) => void;
    replace: (content: IModalContent, isReplaceAll?: boolean) => void;
    close: () => void;
    closeAll: () => void;
  };
}
