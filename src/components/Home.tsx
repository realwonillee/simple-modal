'use client';

import { useModal } from '@/lib/modal/useModal2';
import PrimaryButton from '@/components/ds-ui/button/atom/PrimaryButton';
import { OverlappedModal } from '@/components/modal/OverlappedModal';

export default function Home() {
  const { modalId, actions } = useModal();

  const handleModalOpen = () => {
    actions.open(
      <OverlappedModal modalId={modalId} close={actions.closeAll} />,
    );
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="flex flex-col gap-5">
        <PrimaryButton
          type="button"
          label="첫번째 모달열기"
          onClick={handleModalOpen}
        />
        {/*<FirstModalButton />*/}
        {/*<SecondModalButton />*/}
      </div>
    </div>
  );
}
