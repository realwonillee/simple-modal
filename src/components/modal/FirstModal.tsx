'use client';

import ModalPortal from '@/lib/modal/ModalPortal';
import PrimaryButton from '@/components/ds-ui/button/atom/PrimaryButton';
import { useEffect } from 'react';
import { useModal } from '@/lib/modal/useModal2';

export default function FirstModalButton() {
  const modal = useModal();
  return (
    <>
      <ModalButton open={modal.actions.open} />
      <ModalLayerPopup {...modal} />
    </>
  );
}

const ModalButton = ({ open }: { open: () => void }) => {
  return (
    <PrimaryButton
      type="button"
      label="첫번째 모달열기"
      onClick={() => open()}
    />
  );
};

ModalButton.displayName = 'ModalButton';

const ModalLayerPopup = ({
  modalId,
  isOpen,
  actions,
}: {
  modalId: string;
  isOpen: boolean;
  actions: { open: () => void; close: () => void };
}) => {
  const { open } = actions;

  useEffect(() => {
    setTimeout(() => {
      open();
    }, 3000);
  }, [open]);

  return (
    isOpen && (
      <ModalPortal modalId={modalId}>
        <div
          className="fixed top-0 left-0 z-[1px] bg-[#dddddd70] flex justify-center items-center w-full h-full"
          onClick={() => actions.close()}
        >
          <div
            className="w-[300px] h-[200px] bg-white"
            onClick={() => actions.close()}
          >
            첫번째 모달
          </div>
        </div>
      </ModalPortal>
    )
  );
};
