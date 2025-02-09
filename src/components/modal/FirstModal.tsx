'use client';

import ModalPortal from '@/lib/modal/ModalPortal';
import { ModalProvider, useModal } from '@/lib/modal/ModalContext';
import PrimaryButton from '@/components/ds-ui/button/atom/PrimaryButton';
import { useEffect, forwardRef, useImperativeHandle } from 'react';

export default forwardRef(function FirstModalButton(_, ref) {
  return (
    <ModalProvider initIsOpen>
      <ModalButton ref={ref} />
      <ModalLayerPopup />
    </ModalProvider>
  );
});

const ModalButton = forwardRef((_, ref) => {
  const { actions } = useModal();
  useEffect(() => {
    setTimeout(() => {
      actions.open();
    }, 1000);
  }, [actions]);

  useImperativeHandle(ref, () => ({
    open: () => {
      actions.open();
    },
  }));
  return (
    <PrimaryButton
      type="button"
      label="첫번째 모달열기"
      onClick={() => actions.open()}
    />
  );
});

ModalButton.displayName = 'ModalButton';

const ModalLayerPopup = () => {
  const { modalId, isOpen, actions } = useModal();
  return (
    isOpen && (
      <ModalPortal modalId={modalId}>
        <div
          className="fixed top-0 left-0 z-[1px] bg-[#dddddd70] flex justify-center items-center w-full h-full"
          onClick={() => actions.closeAll()}
        >
          <div
            className="w-[300px] h-[200px] bg-white"
            onClick={() => actions.closeAll()}
          >
            첫번째 모달
          </div>
        </div>
      </ModalPortal>
    )
  );
};
