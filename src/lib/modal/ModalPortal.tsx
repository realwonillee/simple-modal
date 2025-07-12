import { ReactElement, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useModalContext } from './ModalContext';
import ModalContainer from '@/components/modal/ModalContainer';

interface IProps {
  modalId: string;
  children: ReactElement;
}

export default function ModalPortal({ modalId, children }: IProps) {
  const { closeingModalId } = useModalContext();
  const isClosing = useMemo(
    () => closeingModalId === modalId,
    [closeingModalId, modalId],
  );
  const modalElement = document.getElementById(modalId);
  return (
    modalElement !== null &&
    ReactDOM.createPortal(
      <ModalContainer isClosing={isClosing} modalId={modalId}>
        {children}
      </ModalContainer>,
      modalElement,
    )
  );
}
