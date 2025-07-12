import { ReactElement } from 'react';

export interface IModalContext {
  closeingModalId: string | null;
  modalAction: {
    isOpen: (modalId: string) => boolean;
    open: (element: ReactElement) => void;
    replace: (element: ReactElement, isReplaceAll?: boolean) => void;
    close: () => void;
    closeAll: () => void;
  };
}
