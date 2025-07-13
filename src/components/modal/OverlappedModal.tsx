import PrimaryButton from '@/components/ds-ui/button/atom/PrimaryButton';
import { useModalContext } from '@/lib/modal/ModalContext';
import useConfirmModal from '@/lib/modal/useAlertModal';

export const OverlappedModal = () => {
  const alertActions = useConfirmModal();
  const { modalActions } = useModalContext();

  const handleModalOpen = () => {
    alertActions.warn({
      title: 'test',
      description: 'test',
      cancel: {
        label: '취소',
        callback: () => {},
      },
      confirm: {
        label: '확인',
        callback: () => {},
      },
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
