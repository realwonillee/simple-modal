import { PropsWithChildren } from 'react';

const ModalDialog = ({
  children,
  isClosing,
}: PropsWithChildren<{ isClosing: boolean }>) => {
  return (
    <div
      role="dialog"
      className={`fixed z-10 ${
        !isClosing ? 'animate-scaleFadeIn' : 'animate-scaleFadeOut'
      }`}
    >
      {children}
    </div>
  );
};

export default ModalDialog;
