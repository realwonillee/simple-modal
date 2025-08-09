import { PropsWithChildren, useMemo } from 'react';
import ModalDialog from './ModalDialog';
import ModalDim from './ModalDim';
import { useModalContext } from '@/lib/modal/ModalContext';
import { useFocusTrap } from '@/hooks/useFocusTrap';

const ModalContainer = ({
  children,
  dimOpacity,
  modalId,
}: PropsWithChildren<{ dimOpacity: number; modalId: string }>) => {
  const ref = useFocusTrap(true);
  const { closeingModalIdList } = useModalContext();
  const isClosing = useMemo(
    () => closeingModalIdList.includes(modalId),
    [closeingModalIdList, modalId],
  );
  return (
    <div
      ref={ref}
      className="fixed z-[1000] top-0 left-0 w-full h-full flex justify-center items-center"
    >
      <ModalDim isClosing={isClosing} dimOpacity={dimOpacity} />
      <ModalDialog isClosing={isClosing}>{children}</ModalDialog>
    </div>
  );
};

export default ModalContainer;
