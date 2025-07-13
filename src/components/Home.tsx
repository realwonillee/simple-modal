'use client';

import PrimaryButton from '@/components/ds-ui/button/atom/PrimaryButton';
import { useModalContext } from '@/lib/modal/ModalContext';
import { OverlappedModal } from './modal/OverlappedModal';

export default function Home() {
  const { modalActions } = useModalContext();

  const handleModalOpen = () => {
    modalActions.open({ element: <OverlappedModal /> });
  };

  return (
    <div className="flex justify-center items-center h-[1500px]">
      <div className="flex flex-col gap-5">
        <PrimaryButton
          type="button"
          label="첫번째 모달열기"
          onClick={handleModalOpen}
        />
      </div>
    </div>
  );
}
