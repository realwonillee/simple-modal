'use client';

import ModalPortal from '@/lib/modal/ModalPortal';
import { ModalProvider, useModal } from '@/lib/modal/ModalContext';
import PrimaryButton from '@/components/ds-ui/button/atom/PrimaryButton';

export default function FirstModalButton() {
  return (
    <ModalProvider isInitOpen>
      <ModalButton />
      <ModalLayerPopup />
    </ModalProvider>
  );
}

const ModalButton = () => {
  const { actions } = useModal();
  return (
    <PrimaryButton
      type="button"
      label="첫번째 모달열기"
      onClick={() => actions.open()}
    />
  );
};

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
