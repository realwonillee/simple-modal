import { PropsWithChildren } from 'react';
import ModalDialog from './ModalDialog';
import ModalDim from './ModalDim';

const ModalContainer = ({
  children,
  modalId,
  isClosing,
}: PropsWithChildren<{ modalId: string; isClosing: boolean }>) => {
  console.log('modalId', modalId);
  return (
    <div className="fixed z-[1000] top-0 left-0 w-full h-full flex justify-center items-center">
      <ModalDim isClosing={isClosing} />
      <ModalDialog isClosing={isClosing}>{children}</ModalDialog>
    </div>
  );
};

export default ModalContainer;
