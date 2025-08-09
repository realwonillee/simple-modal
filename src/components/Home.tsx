'use client';

import PrimaryButton from '@/components/ds-ui/button/atom/PrimaryButton';
// import { OverlappedModal } from './modal/OverlappedModal';
import useModal from '@/lib/modal/useModal';

export default function Home() {
  const modal = useModal();

  const handleModalOpen = () => {
    modal.warn({
      title: 'first modal',
      description: 'first modal description',
      cancelButton: {
        isLoading: true,
      },
      isInactiveCloseAll: true,
    });
    setTimeout(() => {
      modal.update({
        title: 'first modal updated',
        cancelButton: {
          isLoading: false,
          label: '확인',
          callback: () => {
            modal.close();
          },
        },
      });
    }, 1000);
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
