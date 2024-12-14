import { ReactElement, useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface IProps {
  modalId: string;
  children: ReactElement;
}

export default function ModalPortal({ modalId, children }: IProps) {
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  if (!isMount) return false;

  const modalElement = document.getElementById(modalId)!;
  return ReactDOM.createPortal(children, modalElement);
}
