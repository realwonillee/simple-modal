'use client';

import ModalPortal from '@/lib/modal/ModalPortal';
import { ModalProvider, useModal } from '@/lib/modal/ModalContext';
import PrimaryButton from '@/components/ds-ui/button/atom/PrimaryButton';
import { useEffect } from 'react';

export default function FirstModalButton() {
  return (
    <ModalProvider>
      <ModalButton />
    </ModalProvider>
  );
}

const ModalButton = () => {
  const { modalId, isOpen, actions } = useModal();
  useEffect(() => {
    setTimeout(() => {
      actions.open();
    }, 3000);
  }, [actions]);
  return (
    <>
      <PrimaryButton
        type="button"
        label="첫번째 모달열기"
        onClick={() => actions.open()}
      />
      {isOpen && (
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
      )}
    </>
  );
};
