'use client';

import PrimaryButton from '@/components/ds-ui/button/atom/PrimaryButton';
import { useModalContext } from '@/lib/modal/ModalContext';
import { OverlappedModal } from './modal/OverlappedModal';

export default function Home() {
  const { modalAction } = useModalContext();

  const handleModalOpen = () => {
    modalAction.open(<OverlappedModal />);
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
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
