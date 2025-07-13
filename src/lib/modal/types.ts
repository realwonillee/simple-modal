import { ReactElement } from 'react';

interface IConfirmButton {
  label: string;
  disabled?: boolean;
  isLoading?: boolean;
  callback: () => void;
}

export interface IConfirmModalContent {
  confirmKind: 'warning' | 'error' | 'info' | 'success' | 'loading';
  title: string | string[];
  description: string | string[];
  confirm?: IConfirmButton;
  cancel?: IConfirmButton;
}

export interface IModalContext {
  closeingModalId: string | null;
  modalActions: {
    isOpen: (modalId: string) => boolean;
    open: (element: ReactElement) => void;
    replace: (element: ReactElement, isReplaceAll?: boolean) => void;
    close: () => void;
    closeAll: () => void;
    warn: (params: Omit<IConfirmModalContent, 'confirmKind'>) => void;
    error: (params: Omit<IConfirmModalContent, 'confirmKind'>) => void;
    info: (params: Omit<IConfirmModalContent, 'confirmKind'>) => void;
    success: (params: Omit<IConfirmModalContent, 'confirmKind'>) => void;
  };
}
