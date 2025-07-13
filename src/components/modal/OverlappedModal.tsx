import PrimaryButton from '@/components/ds-ui/button/atom/PrimaryButton';
import { useModalContext } from '@/lib/modal/ModalContext';
import { OverlappedModal2 } from './OverlappedModal2';

export const OverlappedModal = () => {
  const { modalAction } = useModalContext();

  const handleModalOpen = () => {
    modalAction.open(<OverlappedModal2 close={modalAction.close} />);
  };

  return (
    <div className="w-[300px] h-[200px] bg-white">
      첫번째 모달
      <PrimaryButton
        type="button"
        label="두번째 모달열기"
        onClick={handleModalOpen}
      />
      <PrimaryButton type="button" label="닫기" onClick={modalAction.close} />
    </div>
  );
};
