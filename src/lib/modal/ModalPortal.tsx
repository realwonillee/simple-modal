import { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import ModalContainer from '@/components/modal/ModalContainer';

interface IProps {
  modalId: string;
  dimOpacity: number;
  children: ReactElement;
}

export default function ModalPortal({ children, ...rest }: IProps) {
  const modalElement = document.getElementById('my-modal');
  return (
    modalElement !== null &&
    ReactDOM.createPortal(
      <ModalContainer {...rest}>{children}</ModalContainer>,
      modalElement,
    )
  );
}
