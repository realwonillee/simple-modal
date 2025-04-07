export interface IModal {
  isOpen: boolean;
  modalId: string;
  actions: {
    open: () => void;
    replace: (isReplaceAll?: boolean) => void;
    close: (isCloseAll?: boolean) => void;
  };
}
