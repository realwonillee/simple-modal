import PrimaryButton from '@/components/ds-ui/button/atom/PrimaryButton';
import { useModalContext } from '@/lib/modal/ModalContext';

export const OverlappedModal = () => {
  const { modalActions } = useModalContext();

  const handleModalOpen = () => {
    modalActions.warn({
      title: 'test',
      description: 'test',
    });
  };

  return (
    <div className="w-[300px] h-[200px] bg-white">
      첫번째 모달
      <PrimaryButton
        type="button"
        label="두번째 모달열기"
        onClick={handleModalOpen}
      />
      <PrimaryButton type="button" label="닫기" onClick={modalActions.close} />
    </div>
  );
};
