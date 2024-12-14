import { useCallback, useEffect, useState } from "react";
import ModalController from "./ModalController";

export default function useModal(modalId: string) {
  const [isOpen, setIsOpen] = useState(false);
  const modalController = ModalController.getInstance();

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const callback = (isOpen: boolean) => {
      if (isOpen) open();
      else close();
    };
    modalController.subscribe(modalId, callback);
    return () => {
      modalController.unsubscribe(modalId);
    };
  }, [modalId, open, close, modalController]);

  return {
    isOpen,
  };
}
