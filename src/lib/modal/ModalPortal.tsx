import type { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface IProps {
  modalId: string;
  children: ReactNode;
}

export default function ModalPortal({ modalId, children }: IProps) {
  const modalElement = document.getElementById(modalId)!;
  return ReactDOM.createPortal(children, modalElement);
}
